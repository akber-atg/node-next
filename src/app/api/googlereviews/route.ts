
import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';


async function getAccessToken() {
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
            grant_type: 'refresh_token',
        }),
    });

    if (!response.ok) {
        throw new Error(`Token error: ${await response.text()}`);
    }

    const data = await response.json();
    return data.access_token as string;
}

export async function GET() {
    try {

        const existing = await sql`
                SELECT comments, create_date
                FROM customer_reviews
                WHERE create_date::date = CURRENT_DATE
                ORDER BY create_date DESC
                LIMIT 1
            `;

    if (existing.length > 0) {
        return NextResponse.json({
            source: 'database',
            createDate: existing[0].create_date,
            data: JSON.parse(existing[0].comments)
        });
        }


        const accountId = process.env.GOOGLE_ACCOUNT_ID!;
        const locationId = process.env.GOOGLE_LOCATION_ID!;
        const accessToken = await getAccessToken();

        const response = await fetch(
            `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?pageSize=50&orderBy=updateTime desc`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Google API error: ${response.status} ${await response.text()}`);
        }

        const locationData = await response.json();

        const comments = JSON.stringify(locationData);

        await sql`
        INSERT INTO customer_reviews
            (email_address, full_name, comments)
        VALUES (
            ${'abc@123.com'},
            ${'akber ali'},
            ${comments}
        )
        `;

        return NextResponse.json(locationData);
    } catch (error) {
        console.error('Google Business API error:', error);

        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
