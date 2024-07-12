import ReviewItem, { IReview } from "./ReviewItem";

interface ReviewsProps {
  reviews: IReview[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div>
      {reviews.map((review) => {
        return <ReviewItem key={review["_id"]} review={review} />;
      })}
    </div>
  );
};

export default Reviews;
