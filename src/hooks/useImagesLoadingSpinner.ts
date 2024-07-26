import { useState } from "react";

function useImagesLoadingSpinner() {
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(true);

  return { isLoadingImages, setIsLoadingImages };
}

export default useImagesLoadingSpinner;
