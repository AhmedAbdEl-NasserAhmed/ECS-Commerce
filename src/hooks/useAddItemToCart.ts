import { useAppDispatch } from "@/lib/hooks";
import toast from "react-hot-toast";

function useAddItemToCookie(cookieId, action) {
  const dispatchRedux = useAppDispatch();

  function addItemHandler({ data, message }) {
    toast.success(message);

    dispatchRedux(action(cookieId, data));
  }

  return { addItemHandler };
}

export default useAddItemToCookie;
