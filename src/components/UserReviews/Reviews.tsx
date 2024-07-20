import ReviewForm from "./ReviewForm";
import ReviewItem, { IReview } from "./ReviewItem";

interface ReviewsProps {
  reviews: IReview[];
  productId: string;
}

const Reviews = ({ reviews, productId }: ReviewsProps) => {
  return (
    <div>
      <ReviewForm productId={productId} />
      <div className="max-h-[500px] overflow-y-auto">
        {reviews?.map((review) => {
          return <ReviewItem key={review["_id"]} review={review} />;
        })}
      </div>
    </div>
  );
};

export default Reviews;
