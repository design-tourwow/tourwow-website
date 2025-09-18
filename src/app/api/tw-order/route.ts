import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

// Direct database connection for tw_order table
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Generate order code in TWP format
function generateOrderCode(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  // Simple sequence number - in production should be from database sequence
  const sequence = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
  return `TWP${year}${month}${sequence}`
}

// Generate booking ID
function generateBookingId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `BK${timestamp}${random}`.toUpperCase()
}

function getUserIdFromRequest(req: NextRequest): number | null {
  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    return payload.userId;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    let query = `
      SELECT 
        id,
        period_id,
        tour_program_id,
        tour_name,
        departure_date,
        return_date,
        price_per_person,
        traveler_count,
        total_amount,
        deposit_amount,
        customer_name,
        customer_phone,
        customer_email,
        address,
        sub_district,
        district,
        province,
        postal_code,
        status,
        created_at,
        updated_at,
        user_id
      FROM tw_order 
    `;
    const values: any[] = [];
    if (userId) {
      query += 'WHERE user_id = $1 ORDER BY created_at DESC';
      values.push(userId);
    } else {
      query += 'ORDER BY created_at DESC';
    }
    const result = await pool.query(query, values);
    // แปลง created_at, updated_at เป็น ISO string (UTC)
    const orders = result.rows.map(row => ({
      ...row,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
      created_at_ts: row.created_at ? new Date(row.created_at).getTime() : null,
      updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
      updated_at_ts: row.updated_at ? new Date(row.updated_at).getTime() : null,
    }));
    return NextResponse.json({ 
      success: true,
      orders,
      total: orders.length
    });
  } catch (error) {
    console.log('💥 GET API error:', error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('🔍 API received body:', JSON.stringify(body, null, 2));
    const userId = getUserIdFromRequest(req);

    // Validation เบื้องต้น
    if (!body.customer_name || !body.customer_phone || !body.tour_program_id || !body.tour_name || !body.departure_date || !body.return_date || !body.price_per_person || !body.traveler_count || !body.total_amount) {
      console.log('❌ Validation failed - missing required fields');
      return NextResponse.json({ error: 'ข้อมูลไม่ครบถ้วน' }, { status: 400 });
    }

    // Generate unique identifiers
    const orderCode = generateOrderCode();
    const bookingId = generateBookingId();

    // ค้นหาข้อมูลจาก ProductPool เพื่อเก็บ snapshot
    let productSnapshot = null;
    let periodSnapshot = null;
    let commissionCompany = 0;
    let commissionSeller = 0;

    try {
      const productQuery = await pool.query(
        'SELECT * FROM product_pools WHERE product_tourwow_code = $1 LIMIT 1',
        [body.tour_program_id]
      );

      if (productQuery.rows.length > 0) {
        const product = productQuery.rows[0];
        
        // Create product snapshot
        productSnapshot = {
          id: product.product_id,
          name: product.product_name,
          code: product.product_tour_code,
          tourwow_code: product.product_tourwow_code,
          countries: product.product_countries,
          duration_days: product.product_duration_day,
          duration_nights: product.product_duration_night,
          banner_url: product.product_banner_url,
          tags: product.product_tags_json
        };

        // Create period snapshot
        periodSnapshot = {
          id: product.period_id,
          start_at: product.period_start_at,
          end_at: product.period_end_at,
          price_adult_double: product.period_price_adult_double,
          price_adult_single: product.period_price_adult_single,
          transportation: {
            go: {
              name: product.period_go_transportation_name_en,
              code: product.period_go_transportation_code,
              flight_number_departure: product.period_go_flight_number_departure,
              flight_time_departure: product.period_go_flight_time_departure
            },
            back: {
              name: product.period_back_transportation_name_en,
              code: product.period_back_transportation_code,
              flight_number_arrival: product.period_back_flight_number_arrival,
              flight_time_arrival: product.period_back_flight_time_arrival
            }
          }
        };

        commissionCompany = Number(product.period_commission_company) || 0;
        commissionSeller = Number(product.period_commission_seller) || 0;
      }
    } catch (error) {
      console.log('⚠️ Could not find ProductPool data, using fallback values:', error);
    }

    // Calculate duration
    const startDate = new Date(body.departure_date);
    const endDate = new Date(body.return_date);
    const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const durationNights = durationDays - 1;

    // Use updated tw_order table structure with period_id and address columns
    const insertQuery = `
      INSERT INTO tw_order (
        period_id,
        tour_program_id,
        tour_name,
        departure_date,
        return_date,
        price_per_person,
        traveler_count,
        total_amount,
        deposit_amount,
        customer_name,
        customer_phone,
        customer_email,
        address,
        sub_district,
        district,
        province,
        postal_code,
        status,
        base_price,
        extra_rooms,
        selected_package,
        created_at,
        updated_at,
        user_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
      ) RETURNING *
    `;

    const values = [
      body.period_id, // ✅ ใช้ค่าที่ user ส่งมา
      body.tour_program_id,
      body.tour_name,
      startDate.toISOString(),
      endDate.toISOString(),
      body.price_per_person,
      body.traveler_count,
      body.total_amount,
      body.deposit_amount || Math.round(body.total_amount * 0.3),
      body.customer_name,
      body.customer_phone,
      body.customer_email || '',
      body.customer_address || '',
      body.customer_sub_district || '',
      body.customer_district || '',
      body.customer_province || '',
      body.customer_postal_code || '',
      'pending',
      body.price_per_person,
      body.extra_rooms || 0,
      body.selected_package || 'standard',
      new Date().toISOString(),
      new Date().toISOString(),
      userId
    ];

    console.log('💾 Inserting to tw_order table...');
    console.log('📋 Tour Program ID:', body.tour_program_id);
    
    const result = await pool.query(insertQuery, values);
    const order = result.rows[0];

    console.log('✅ Successfully inserted order:', order.id, 'for program:', order.tour_program_id);
    return NextResponse.json({ 
      success: true, 
      order: {
        id: order.id,
        tour_program_id: order.tour_program_id,
        total_amount: order.total_amount,
        deposit_amount: order.deposit_amount,
        status: order.status
      }
    });
  } catch (error) {
    console.log('💥 API catch error:', error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
} 