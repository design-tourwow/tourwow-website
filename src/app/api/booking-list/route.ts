import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Direct database connection for tw_order table
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 Fetching all booking orders...');
    
    const query = `
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
        is_edited,
        created_at,
        updated_at
      FROM tw_order 
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query);
    
    console.log('✅ Successfully fetched', result.rows.length, 'booking orders');
    
    return NextResponse.json({ 
      success: true,
      orders: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.log('💥 GET Booking List API error:', error);
    return NextResponse.json({ 
      success: false,
      error: (error as any).message,
      orders: [],
      total: 0
    }, { status: 500 });
  }
}