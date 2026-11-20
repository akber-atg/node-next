
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import "./star_rating.css";

interface StarRatingProps {
    value?: number;
    onChange?: (rating: number) => void;
    readOnly?: boolean;
    size?: number;
}

export interface Person {

    person_id: number;
    name: string;
    category_id: number;
}

export interface Question {
    id: number;
    description: string;
}

export interface Category {
    id: number;
    name: string;
    questions: Question[];
}

// export interface PersonRating {
//     evaluatorEmail: string;
//     personId: number;
//     questionId: number;
//     rating: number;
// }

export interface EvaluationUser {
    name: string;
    email: string;
    id:number;
}

const StarRating = ({
    value = 0,
    onChange,
    readOnly = false,
    size = 28
}: StarRatingProps) => {

    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const currentValue = hoverValue ?? value;

    const calculateRating = (
        e: React.MouseEvent<HTMLSpanElement>,
        index: number
    ) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const isHalf = e.clientX - rect.left < rect.width / 2;

        return index + (isHalf ? 0.5 : 1);
    };

    const handleClick = (
        e: React.MouseEvent<HTMLSpanElement>,
        index: number
    ) => {
        if (readOnly) return;

        const rating = calculateRating(e, index);

        onChange?.(rating);
        setHoverValue(null);
    };

    return (
        <div className="star-rating">

            {[1, 2, 3, 4, 5].map((star) => {

                const fill = Math.max(
                    0,
                    Math.min(1, currentValue - star + 1)
                );

                return (
                    <span
                        key={star}
                        className="star-wrapper"
                        style={{ width: size, height: size }}
                        onMouseMove={(e) => {
                            if (!readOnly) {
                                setHoverValue(
                                    calculateRating(e, star - 1)
                                );
                            }
                        }}
                        onMouseLeave={() => setHoverValue(null)}
                        onClick={(e) => handleClick(e, star - 1)}
                    >
                        <Star
                            size={size}
                            className="star-empty"
                        />

                        <span
                            className="star-fill"
                            style={{ width: `${fill * 100}%` }}
                        >
                            <Star
                                size={size}
                                fill="#F5B301"
                                color="#F5B301"
                            />
                        </span>
                    </span>
                );
            })}

        </div>
    );
};

export default StarRating;
