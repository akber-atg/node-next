import { NextResponse } from "next/server";
import { sql } from '@/lib/db';

export async function GET() {
  try {

const userquery = await sql`
    SELECT * FROM persons
`;
   return NextResponse.json(userquery);
  
  } catch (error) {
      console.error("Error validating evaluator:", error);

        return NextResponse.json(
            { error: "Could not validate evaluator" },
            { status: 500 }
        );
  }
}