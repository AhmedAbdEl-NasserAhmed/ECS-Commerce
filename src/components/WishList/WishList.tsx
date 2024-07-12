import WishListItem from "./WishListItem";

function WishList() {
  return (
    <ul className=" p-8 bg-white shadow-[0px_0px_7px_5px_#0000000a] w-full ">
      <h2 className="text-3xl font-bold flex justify-center">WISH LIST</h2>
      <WishListItem />
    </ul>
  );
}

export default WishList;
