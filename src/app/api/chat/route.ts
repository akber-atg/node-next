
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (
      typeof question !== "string" ||
      !question.trim() ||
      question.length > 2000
    ) {
      return Response.json(
        { error: "Please enter a valid question." },
        { status: 400 }
      );
    }

    const searchTerm = `%${question.trim()}%`;

    const rows = await sql`
      SELECT title, content
      FROM help_articles
      WHERE is_published = TRUE
        AND (
          title ILIKE ${searchTerm}
          OR content ILIKE ${searchTerm}
        )
      ORDER BY updated_at DESC
      LIMIT 5
    `;

    if (rows.length === 0) {
      return Response.json({
        answer: "Sorry, I couldn't find an answer in our knowledge base.",
        results: [],
      });
    }

    return Response.json({
      answer: rows
        .map((row) => `${row.title}\n${row.content}`)
        .join("\n\n"),
      results: rows,
    });

  } catch (error) {
    console.error("Database chatbot error:", error);

    return Response.json(
      { error: "Unable to retrieve information." },
      { status: 500 }
    );
  }
}
