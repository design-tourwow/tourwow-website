import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import fs from 'fs/promises'
import path from 'path'

// Database connection configuration - using PostgreSQL to match main route
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Load Thailand location data from JSON files
async function loadLocationData() {
  const publicPath = path.join(process.cwd(), 'public', 'data', 'thailand')
  
  const [provincesData, districtsData, subDistrictsData] = await Promise.all([
    fs.readFile(path.join(publicPath, 'provinces.json'), 'utf-8'),
    fs.readFile(path.join(publicPath, 'districts.json'), 'utf-8'),
    fs.readFile(path.join(publicPath, 'sub-districts.json'), 'utf-8'),
  ])
  
  return {
    provinces: JSON.parse(provincesData),
    districts: JSON.parse(districtsData),
    subDistricts: JSON.parse(subDistrictsData),
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = await pool.connect()

  try {
    console.log('🔄 PUT /api/tw-order/[id] - Starting update process')
    
    const { id: orderId } = await params
    const updateData = await request.json()
    
    console.log('📋 Update data received:', updateData)
    console.log('🎯 Order ID to update:', orderId)

    // Validate required fields
    const { name, phone, email, address, provinceId, districtId, subDistrictId, zipCode } = updateData
    
    if (!name || !phone || !address || !zipCode) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    console.log('✅ Database connected successfully')
    
    // Load location data if provinceId is provided
    let provinceName = ''
    let districtName = ''
    let subDistrictName = ''
    
    if (provinceId && districtId && subDistrictId) {
      try {
        const locationData = await loadLocationData()
        
        const province = locationData.provinces.find((p: any) => p.id === provinceId)
        const district = locationData.districts.find((d: any) => d.id === districtId)
        const subDistrict = locationData.subDistricts.find((s: any) => s.id === subDistrictId)
        
        provinceName = province?.name_th || ''
        districtName = district?.name_th || ''
        subDistrictName = subDistrict?.name_th || ''
        
        console.log('🗺️ Location names resolved:', { provinceName, districtName, subDistrictName })
      } catch (error) {
        console.error('⚠️ Could not load location data:', error)
      }
    }

    // First, get the current order data for history
    const currentOrderResult = await client.query(
      'SELECT * FROM tw_order WHERE id = $1',
      [orderId]
    )

    if (currentOrderResult.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Order not found'
      }, { status: 404 })
    }

    const currentOrder = currentOrderResult.rows[0]
    console.log('📄 Current order data retrieved for history')

    // Start transaction
    await client.query('BEGIN')
    console.log('🔄 Transaction started')

    try {
      // 1. Update tw_order table
      const updateQuery = `
        UPDATE tw_order 
        SET 
          customer_name = $1,
          customer_phone = $2,
          customer_email = $3,
          address = $4,
          sub_district = $5,
          district = $6,
          province = $7,
          postal_code = $8,
          is_edited = TRUE,
          updated_at = NOW()
        WHERE id = $9
      `

      console.log('🔄 About to update tw_order with query:', updateQuery)
      console.log('🔄 Update parameters:', [
        name,
        phone,
        email || null,
        address,
        subDistrictName || currentOrder.sub_district,
        districtName || currentOrder.district,
        provinceName || currentOrder.province,
        zipCode,
        orderId
      ])

      const updateResult = await client.query(updateQuery, [
        name,
        phone,
        email || null,
        address,
        subDistrictName || currentOrder.sub_district,  // Use new if available, else keep existing
        districtName || currentOrder.district,          // Use new if available, else keep existing
        provinceName || currentOrder.province,          // Use new if available, else keep existing
        zipCode,
        orderId
      ])

      console.log('🔄 Update result:', updateResult)
      console.log('🔄 Rows affected:', updateResult.rowCount)

      console.log('✅ tw_order updated successfully')
      console.log('🔍 is_edited should now be TRUE for order:', orderId)

      // 2. Insert into tw_order_edit_history (with fallback if table doesn't exist)
      try {
        // First check if table exists
        const tableExistsQuery = `
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'tw_order_edit_history'
          );
        `
        const tableExistsResult = await client.query(tableExistsQuery)
        const tableExists = tableExistsResult.rows[0].exists

        console.log('🔍 tw_order_edit_history table exists:', tableExists)
        
        // Also show all tables for debugging
        const allTablesQuery = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%tw_%';`
        const allTablesResult = await client.query(allTablesQuery)
        console.log('🔍 All tw_* tables in database:', allTablesResult.rows.map(r => r.table_name))

        if (tableExists) {
          const historyQuery = `
            INSERT INTO tw_order_edit_history (
              order_id,
              tour_program_id,
              tour_name,
              departure_date,
              return_date,
              price_per_person,
              total_amount,
              deposit_amount,
              status,
              period_id,
              base_price,
              extra_rooms,
              selected_package,
              created_at,
              updated_at,
              traveler_count,
              
              old_customer_name,
              old_customer_phone,
              old_customer_email,
              old_address,
              old_sub_district,
              old_district,
              old_province,
              old_postal_code,
              old_traveler_count,
              
              new_customer_name,
              new_customer_phone,
              new_customer_email,
              new_address,
              new_sub_district,
              new_district,
              new_province,
              new_postal_code,
              new_traveler_count
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34)
          `

          const historyParams = [
            parseInt(orderId),                             // $1
            
            // Clone ข้อมูล order เดิมทั้งหมด
            currentOrder.tour_program_id,                  // $2
            currentOrder.tour_name,                        // $3
            currentOrder.departure_date,                   // $4
            currentOrder.return_date,                      // $5
            currentOrder.price_per_person,                 // $6
            currentOrder.total_amount,                     // $7
            currentOrder.deposit_amount,                   // $8
            currentOrder.status,                           // $9
            currentOrder.period_id,                        // $10
            currentOrder.base_price,                       // $11
            currentOrder.extra_rooms,                      // $12
            currentOrder.selected_package,                 // $13
            currentOrder.created_at,                       // $14
            currentOrder.updated_at,                       // $15
            currentOrder.traveler_count,                   // $16
            
            // Old values - ข้อมูลลูกค้าเดิมก่อนแก้ไข
            currentOrder.customer_name,                    // $17
            currentOrder.customer_phone,                   // $18
            currentOrder.customer_email,                   // $19
            currentOrder.address,                          // $20
            currentOrder.sub_district,                     // $21
            currentOrder.district,                         // $22
            currentOrder.province,                         // $23
            currentOrder.postal_code,                      // $24
            currentOrder.traveler_count,                   // $25
            
            // New values - ข้อมูลลูกค้าใหม่ที่แก้ไข
            name,                                          // $26
            phone,                                         // $27
            email || null,                                 // $28
            address,                                       // $29
            subDistrictName || currentOrder.sub_district,  // $30
            districtName || currentOrder.district,         // $31
            provinceName || currentOrder.province,         // $32
            zipCode,                                       // $33
            currentOrder.traveler_count,                   // $34
          ]

          console.log('🔍 History params count:', historyParams.length)
          console.log('🔍 orderId type:', typeof orderId, 'parsed:', parseInt(orderId))
          await client.query(historyQuery, historyParams)
          console.log('✅ tw_order_edit_history record created')
        } else {
          console.log('⚠️ tw_order_edit_history table does not exist, skipping history recording')
        }
      } catch (historyError) {
        console.error('❌ Error with tw_order_edit_history:', historyError)
        console.log('⚠️ Continuing without history recording...')
        // Continue without history recording instead of failing
        // TODO: Fix data types in tw_order_edit_history table
      }

      // Verify the update before committing
      const verifyQuery = 'SELECT is_edited FROM tw_order WHERE id = $1'
      const verifyResult = await client.query(verifyQuery, [orderId])
      console.log('🔍 Before commit - is_edited value:', verifyResult.rows[0]?.is_edited)

      // Commit transaction
      await client.query('COMMIT')
      console.log('✅ Transaction committed successfully')

      // Verify after commit
      const afterCommitQuery = 'SELECT is_edited FROM tw_order WHERE id = $1'
      const afterCommitResult = await client.query(afterCommitQuery, [orderId])
      console.log('🔍 After commit - is_edited value:', afterCommitResult.rows[0]?.is_edited)

      return NextResponse.json({
        success: true,
        message: 'Order updated successfully',
        data: {
          orderId,
          updated: {
            customer_name: name,
            customer_phone: phone,
            customer_email: email || null,
            address,
            sub_district: subDistrictName || currentOrder.sub_district,
            district: districtName || currentOrder.district,
            province: provinceName || currentOrder.province,
            postal_code: zipCode,
            is_edited: true
          }
        }
      })

    } catch (transactionError) {
      // Rollback transaction on error
      await client.query('ROLLBACK')
      console.error('❌ Transaction rolled back due to error:', transactionError)
      throw transactionError
    }

  } catch (error) {
    console.error('❌ Error updating order:', error)
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    const { id: errorOrderId } = await params
    const errorUpdateData = await request.json().catch(() => null)
    console.error('❌ Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      orderId: errorOrderId,
      updateData: errorUpdateData
    })
    return NextResponse.json({
      success: false,
      error: 'Failed to update order',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })

  } finally {
    // Release database connection
    client.release()
    console.log('🔌 Database connection released')
  }
}