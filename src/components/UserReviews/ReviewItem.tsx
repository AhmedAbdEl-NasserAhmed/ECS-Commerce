import ReactStars from "react-stars";

export interface IReview {
  _id: string;
  username: string;
  stars: number;
  review: string;
}

interface IReviewItem {
  review: IReview;
}

const ReviewItem = ({ review }: IReviewItem) => {
  return (
    <div className="bg-[#F5F5F5] p-7 rounded-md flex flex-col gap-2 mb-8 text-lg">
      <div className="mb-3 font-bold text-3xl">{review.username}</div>
      <div>
        {
          <ReactStars
            edit={false}
            count={5}
            value={review.stars}
            size={18}
            color2={"#ffd700"}
          />
        }
      </div>
      <div className="text-2xl text-[#666] mt-2 leading-8">{review.review}</div>
    </div>
  );
};

export default ReviewItem;
