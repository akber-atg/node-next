
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { personRatings } = await request.json();

        if (!personRatings || personRatings.length === 0) {
            return NextResponse.json(
                { error: "No ratings provided" },
                { status: 400 }
            );
        }

        for (const item of personRatings) {
            await sql`
                INSERT INTO person_ratings
                (evaluator_id, person_id, question_id, rating)
                VALUES (
                    ${item.evaluatorId},
                    ${item.personId},
                    ${item.questionId},
                    ${item.rating}
                )
            `;
        }

        return NextResponse.json({
            success: true,
            message: "Ratings saved successfully"
        });

    } catch (error) {
        console.error("Error saving ratings:", error);

        return NextResponse.json(
            { error: "Failed to save ratings" },
            { status: 500 }
        );
    }
}