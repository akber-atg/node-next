import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    // Replace 'users' with your actual table name in your Neon DB
    const rows = await sql`
      SELECT * 
      FROM site_contents 
       where is_active = true and page_id = 1 order by ord asc
    `;

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    console.error('Database Query Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}