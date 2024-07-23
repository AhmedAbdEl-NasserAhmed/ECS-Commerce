import { useAppSelector } from "@/lib/hooks";
import ReviewForm from "./ReviewForm";
import ReviewItem, { IReview } from "./ReviewItem";
import { useEffect, useState } from "react";

interface ReviewsProps {
  reviews: IReview[];
  productId: string;
}

const Reviews = ({ reviews, productId }: ReviewsProps) => {
  const [isReviewed, setIsReviewed] = useState<boolean>();

  const isAuthenticated = useAppSelector(
    (state) => state.usersSlice.isAuthenticated
  );
  const user = useAppSelector((state) => state.usersSlice.user);

  useEffect(() => {
    if (user && reviews && Array.isArray(reviews)) {
      const hasReviews = reviews?.some(
        (review) => review.user["_id"] === user["_id"]
      );

      setIsReviewed(hasReviews);
    }
  }, [reviews, user]);

  return (
    <div>
      {isAuthenticated && !isReviewed && <ReviewForm productId={productId} />}
      <div className="max-h-[500px] overflow-y-auto">
        {reviews?.map((review) => {
          return <ReviewItem key={review["_id"]} review={review} />;
        })}
      </div>
    </div>
  );
};

export default Reviews;
