
"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [previousResponseId, setPreviousResponseId] =
    useState<string | undefined>();

  async function sendMessage() {
    if (!question.trim() || loading) return;

    const userQuestion = question.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userQuestion },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuestion,

        }),
      });

      const data = await res.json();

      if (!res.ok) {

        
        throw new Error(data.error || "Request failed");
      }

      setPreviousResponseId(data.conversationId);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);

  } catch (error) {
  console.error("Chat frontend error:", error);

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content:
        error instanceof Error
          ? error.message
          : "Unknown error occurred.",
    },
  ]);
} finally {
  setLoading(false);
}
  }

  return (
    <div className="max-w-xl mx-auto border rounded-xl p-4">
      <h2 className="text-xl font-bold mb-4">
        Customer Support
      </h2>

      <div className="h-96 overflow-y-auto space-y-3 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === "user"
                ? "bg-blue-100 ml-10"
                : "bg-gray-100 mr-10"
            }`}
          >
            <strong>
              {message.role === "user" ? "You" : "Assistant"}
            </strong>
            <p>{message.content}</p>
          </div>
        ))}

        {loading && <p>Assistant is thinking...</p>}
      </div>

      <div className="flex gap-2">
        <input
          className="border rounded-lg p-3 flex-1"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask me anything..."
        />

        <button
          onClick={sendMessage}
          disabled={loading || !question.trim()}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
