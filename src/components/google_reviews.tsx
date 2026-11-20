
import  "./google_reviews.css"
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface GoogleReview {
  name: string;
  rating: number;
  text?: {
    text: string;
  };
  relativePublishTimeDescription: string;
  authorAttribution: {
    displayName: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime:string;
}

interface GooglePlace {
  displayName: {
    text: string;
  };
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}

interface GoogleReviewsResponse {
  places: GooglePlace[];
}

interface GoogleReviewsProps {
  data: GoogleReviewsResponse;
}

export default function GoogleReviews({ data }: GoogleReviewsProps) {
  const place = data.places?.[0];

  if (!place) {
    return null;
  }

  const reviews = (place.reviews ?? []).slice(0, 5);

  const renderStars = (rating: number) => {
    return (
      <span className="google-stars" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= Math.round(rating) ? "star-filled" : "star-empty"}
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
        <div className="google-rating-number">{place.rating.toFixed(1)}</div>

        <div className="google-rating-details">
          {renderStars(place.rating)}
          <p>{place.userRatingCount.toLocaleString()} Google reviews</p>
        </div>

        <span className="google-logo-text">
          Google
        </span>
      </div>

      <Slider {...settings} className="google-reviews-list">
        {reviews.map((review) => (
          <article className="google-review" key={review.publishTime}>
            <div className="google-review-header">

                <div className="google-review-avatar google-review-avatar-fallback">
                  {review.authorAttribution.displayName.charAt(0)}
                </div>

              <div className="google-review-author">
                <div className="google-review-name">
                  {review.authorAttribution.uri ? (
                    <a
                      href={review.authorAttribution.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {review.authorAttribution.displayName}
                    </a>
                  ) : (
                    review.authorAttribution.displayName
                  )}
                </div>

                <div className="google-review-date">
                  {review.relativePublishTimeDescription}
                </div>
              </div>
            </div>

            <div className="google-review-rating">
              {renderStars(review.rating)}
            </div>

            <p className="google-review-text">
              {review.text?.text || "No written review provided."}
            </p>
          </article>
        ))}
      </Slider>
    </section>
  );
}
