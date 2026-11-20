import { NextResponse } from "next/server";
import { sql } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { name, email, personId } = await request.json();

        if (!name?.trim() || !email?.trim() || !personId) {
            return NextResponse.json(
                { error: "Name, email and personId are required" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.trim().toLowerCase();
        const selectedPersonId = Number(personId);

        if (!Number.isInteger(selectedPersonId) || selectedPersonId <= 0) {
            return NextResponse.json(
                { error: "Invalid person selected" },
                { status: 400 }
            );
        }

        // STEP 1: Check whether evaluator already exists
        const existingEvaluator = await sql`
            SELECT evaluator_id, name, email
            FROM evaluation_users
            WHERE email = ${normalizedEmail};
        `;

        let evaluator;

        if (existingEvaluator.length > 0) {

            // STEP 2: Existing evaluator - check previous rating
            evaluator = existingEvaluator[0];

            const existingRating = await sql`
                SELECT 1
                FROM person_ratings
                WHERE evaluator_id = ${evaluator.evaluator_id}
                  AND person_id = ${selectedPersonId}
                LIMIT 1;
            `;

            if (existingRating.length > 0) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "You have already rated this person."
                    },
                    { status: 409 }
                );
            }

        } else {

            // STEP 3: New evaluator - insert and return the new record
            const newEvaluator = await sql`
                INSERT INTO evaluation_users (name, email)
                VALUES (${name.trim()}, ${normalizedEmail})
                ON CONFLICT (email) DO NOTHING
                RETURNING evaluator_id, name, email;
            `;

            if (newEvaluator.length > 0) {
                evaluator = newEvaluator[0];
            } else {
                // Another request may have inserted this email concurrently.
                const retryEvaluator = await sql`
                    SELECT evaluator_id, name, email
                    FROM evaluation_users
                    WHERE email = ${normalizedEmail};
                `;

                if (retryEvaluator.length === 0) {
                    return NextResponse.json(
                        { error: "Unable to create or find evaluator" },
                        { status: 500 }
                    );
                }

                evaluator = retryEvaluator[0];

                const existingRating = await sql`
                    SELECT 1
                    FROM person_ratings
                    WHERE evaluator_id = ${evaluator.evaluator_id}
                      AND person_id = ${selectedPersonId}
                    LIMIT 1;
                `;

                if (existingRating.length > 0) {
                    return NextResponse.json(
                        {
                            success: false,
                            error: "You have already rated this person."
                        },
                        { status: 409 }
                    );
                }
            }
        }

        // STEP 4: Allow evaluator to proceed
        return NextResponse.json({
            success: true,
            evaluator: evaluator
        });

    } catch (error) {
        console.error("Error validating evaluator:", error);

        return NextResponse.json(
            { error: "Could not validate evaluator" },
            { status: 500 }
        );
    }
}
