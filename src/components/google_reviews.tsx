import "./google_reviews.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface GoogleReview {
  reviewId: string;
  reviewer: {
    profilePhotoUrl: string;
    displayName: string;
  };
  starRating: string;
  comment: string;
  createTime: string;
  updateTime: string;
  name: string;
  reviewReplyUrl: string;
}

interface GoogleReviewprops {
  reviews: GoogleReview[];
}

export default function GoogleReviews({ reviews }: GoogleReviewprops) {
  const renderStars = (rating: string) => {
    const ratingMap: Record<string, number> = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
    };

    const numericRating = ratingMap[rating] ?? 0;

    return (
      <span
        className="google-stars"
        aria-label={`${numericRating} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= numericRating ? "star-filled" : "star-empty"}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <section className="google-reviews">
      <div className="google-reviews-summary">
        <span className="google-logo-text">Google</span>
      </div>

      <Slider {...settings} className="google-reviews-list">
        {reviews.map((review) => {
          // console.log("Name:", review.reviewer.displayName);
          // console.log("Image URL:", review.reviewer.profilePhotoUrl);

          return (
            <article className="google-review" key={review.reviewId}>
              <div className="google-review-header">
                <div className="google-review-author">
                  {review.reviewer.displayName}
                  <span className="google-review-date">
                    {new Date(review.createTime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="google-review-rating">
                {renderStars(review.starRating)}
              </div>

              <p className="google-review-text">{review.comment}</p>
            </article>
          );
        })}
      </Slider>
    </section>
  );
}
