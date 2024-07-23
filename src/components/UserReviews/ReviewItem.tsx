import ReactStars from "react-stars";
import UserReviewsMenuOptions from "./userReviewsMenuOptions";
import { useAppSelector } from "@/lib/hooks";

export interface IReview {
  _id: string;
  user: {
    name: string;
  };
  ratings: number;
  title: string;
}

interface IReviewItem {
  review: IReview;
}

const ReviewItem = ({ review }: IReviewItem) => {
  const isAuthenticated = useAppSelector(
    (state) => state.usersSlice.isAuthenticated
  );

  const user = useAppSelector((state) => state.usersSlice.user);

  return (
    <div className="bg-[#F5F5F5] p-7 rounded-md flex flex-col gap-2 mb-8 text-lg">
      <div className="flex justify-between items-center">
        <div className="mb-3 font-bold text-3xl">{review?.user?.name}</div>
        {isAuthenticated && review?.user?.["_id"] === user["_id"] && (
          <UserReviewsMenuOptions review={review} />
        )}
      </div>
      <div>
        {
          <ReactStars
            edit={false}
            count={5}
            value={review.ratings}
            size={18}
            color2={"#ffd700"}
          />
        }
      </div>
      <div className="text-2xl text-[#666] mt-2 leading-8">{review.title}</div>
    </div>
  );
};

export default ReviewItem;
