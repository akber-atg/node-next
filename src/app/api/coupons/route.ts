import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    // Replace 'users' with your actual table name in your Neon DB
    const rows = email ? await sql`
      SELECT * 
      FROM coupon
      WHERE email = ${email}
    ` :
      await sql`
      SELECT * 
      FROM coupon
    `
      ;
    if (rows.length > 0) {
      return NextResponse.json({
        success: true,
        exists: true,
        message: 'You have already claimed a coupon using this email.',
        data: rows,
      });
    }

    return NextResponse.json({
      success: true,
      exists: false,
      message: 'No existing coupon found. You can proceed.',
      data: [],
    });
  } catch (error: any) {
    console.error('Database Query Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log("POST endpoint reached");
  try {
    // Read JSON from request body
    const body = await request.json();

    const { fullName, email, phone } = body;
    const couponCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate a random coupon code
    const availedDate = new Date().toISOString(); // Current date and time
    const isActive = false
    const redeemDate = null

    // Insert into Neon database
    const result = await sql`
      INSERT INTO coupon (full_name, email, phone, couponcode, availed_date, is_active, redeem_date)
      VALUES (${fullName}, ${email}, ${phone}, ${couponCode}, ${availedDate}, ${isActive}, ${redeemDate})
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      data: result[0],
    }, { status: 201 });

  } catch (error: any) {
    console.error('Database Insert Error:', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "POST endpoint is working"
  });

}