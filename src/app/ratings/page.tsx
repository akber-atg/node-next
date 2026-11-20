"use client";

import { useEffect, useState } from "react";
import StarRating from "@/components/star_ratings";

import type {
  Person,
  Category,
  //   PersonRating,
  EvaluationUser,
} from "@/components/star_ratings";

// const persons: Person[] = [
//   { id: 101, name: "John Smith", categoryId: 1 },
//   { id: 102, name: "David Jones", categoryId: 2 },
//   { id: 103, name: "Michael Brown", categoryId: 1 },
// ];

interface PersonRating {
  evaluatorId: number;
  personId: number;
  questionId: number;
  rating: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Soccer",
    questions: [
      { id: 1, description: "Ball control" },
      { id: 2, description: "Teamwork" },
      { id: 3, description: "Communication" },
      { id: 4, description: "Leadership" },
      { id: 5, description: "Discipline" },
    ],
  },
  {
    id: 2,
    name: "Cricket",
    questions: [
      { id: 6, description: "Batting skills" },
      { id: 7, description: "Bowling skills" },
      { id: 8, description: "Fielding skills" },
      { id: 9, description: "Teamwork" },
    ],
  },
];

const RatingForm = () => {
  const [selectedPersonId, setSelectedPersonId] = useState<number>(101);
  const [loading, setLoading] = useState(true);
  const [personRatings, setPersonRatings] = useState<PersonRating[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);

  const [evaluator, setEvaluator] = useState<EvaluationUser>({
    name: "",
    email: "",
    id: 0,
  });
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    const loadPersons = async () => {
      try {
        const response = await fetch("/api/person");
        if (!response.ok) {
          throw new Error("Failed to load persons");
        }

        const data: Person[] = await response.json();

        setPersons(data);

        // Select first person by default
        if (data.length > 0) {
          setSelectedPersonId(data[0].person_id);
        }
      } catch (error) {
        console.error("Error loading persons:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPersons();
  }, []);

  // Find selected person
  const selectedPerson = persons.find((p) => p.person_id === selectedPersonId);

  // Find person's category
  const selectedCategory = categories.find(
    (c) => c.id === selectedPerson?.category_id,
  );

  // Get existing rating for a question
  const getRating = (questionId: number) => {
    return (
      personRatings.find(
        (r) => r.personId === selectedPersonId && r.questionId === questionId,
      )?.rating ?? 0
    );
  };

  console.log("Selected Person:", selectedPerson);
  console.log("Selected Category:", selectedCategory);
  console.log("Selected Person ID:", selectedPersonId);

  const addRatingsToDatabase = async () => {
    try {
      const response = await fetch("/api/addratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personRatings,
        }),
      });

     const data = await response.json();

    if (!response.ok) {
        alert(data.error);
        return;
    }

    alert("Ratings saved successfully");
    } catch (error) {
      console.error("Error saving ratings:", error);
      alert("Failed to save ratings. Please try again.");
    }
  };

  const validateEvaluator = async () => {
    const name = evaluator.name.trim();
    const email = evaluator.email.trim().toLowerCase();

    const validName = name.length > 0;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validName || !validEmail) {
      alert("Please enter a valid name and email address.");
      return;
    }

    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          personId: selectedPersonId,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to validate evaluator.");
      }
      const data = await response.json();

      // const data = await response.json();

      setEvaluator({
        id: data.evaluator.evaluator_id,
        name: data.evaluator.name,
        email: data.evaluator.email,
      });
      setIsValidated(true);

      // console.log("Evaluator information:", data);
    } catch (error) {
      console.error(error);
      alert("Unable to validate evaluator. Please try again.");
    }
  };

  // Add or update rating
  const updateRating = (questionId: number, rating: number) => {
    setPersonRatings((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.personId === selectedPersonId && r.questionId === questionId,
      );

      // Update existing rating
      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex ? { ...item, rating } : item,
        );
      }

      // Add new rating
      return [
        ...prev,
        {
          evaluatorId: evaluator.id,
          personId: selectedPersonId,
          questionId,
          rating,
        },
      ];
    });
  };

  return (
    <div className="rating-form">
      <h2>Person Evaluation</h2>

      {!isValidated ? (
        <div className="evaluator-details">
          <h3>Evaluator Information</h3>

          <div>
            <label>Your Name</label>
            <input
              type="text"
              value={evaluator.name}
              onChange={(e) =>
                setEvaluator({
                  ...evaluator,
                  name: e.target.value,
                })
              }
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              value={evaluator.email}
              onChange={(e) =>
                setEvaluator({
                  ...evaluator,
                  email: e.target.value,
                })
              }
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label>Select Person</label>

            <select
              value={selectedPersonId}
              onChange={(e) => setSelectedPersonId(Number(e.target.value))}
            >
              {persons.map((person) => (
                <option key={person.person_id} value={person.person_id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={validateEvaluator}>
            Continue
          </button>
        </div>
      ) : (
        <>
          <h3>Evaluator: {evaluator.name}</h3>

          {selectedPerson && selectedCategory && (
            <>
              <h3>{selectedPerson.name}</h3>

              <h4>Category: {selectedCategory.name}</h4>

              {selectedCategory.questions.map((question) => (
                <div key={question.id} className="rating-question">
                  <label>{question.description}</label>

                  <StarRating
                    value={getRating(question.id)}
                    onChange={(rating) => updateRating(question.id, rating)}
                  />
                </div>
              ))}
            </>
          )}
        </>
      )}

      <h3>Current Ratings Array</h3>

      <pre>{JSON.stringify(personRatings, null, 2)}</pre>
      <button type="button" onClick={addRatingsToDatabase}>
        done
      </button>
    </div>
  );
};

export default RatingForm;
