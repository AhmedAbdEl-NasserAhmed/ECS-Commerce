import ReviewForm from "./ReviewForm";
import ReviewItem, { IReview } from "./ReviewItem";

interface ReviewsProps {
  reviews: IReview[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div>
      <ReviewForm />
      <div className="max-h-[500px] overflow-y-auto">
        {reviews.map((review) => {
          return <ReviewItem key={review["_id"]} review={review} />;
        })}
      </div>
    </div>
  );
};

export default Reviews;
