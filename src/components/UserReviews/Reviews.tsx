import { useAppSelector } from "@/lib/hooks";
import ReviewForm from "./ReviewForm";
import ReviewItem, { IReview } from "./ReviewItem";
import { useEffect, useState } from "react";
import { UserType } from "@/types/enums";

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
    const hasReview = reviews?.some((review) => {
      return review.user?.["_id"] === user?.["_id"];
    });
    setIsReviewed(hasReview);
  }, [reviews, user]);

  const noReviewsAvailable = reviews?.length === 0;

  return (
    <div>
      {isAuthenticated && !isReviewed && user.role !== UserType.ADMIN && (
        <ReviewForm productId={productId} />
      )}
      <div className="max-h-[500px] overflow-y-auto">
        {noReviewsAvailable ? (
          <p className="text-xl font-medium">No reviews yet</p>
        ) : (
          reviews?.map((review) => {
            return <ReviewItem key={review["_id"]} review={review} />;
          })
        )}
      </div>
    </div>
  );
};

export default Reviews;
