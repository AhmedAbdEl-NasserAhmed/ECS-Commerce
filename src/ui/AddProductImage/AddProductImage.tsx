"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProductImageItem from "./ProductImageItem";

function AddProductImage({
  setValue,
  formData,
  control,
  imagesNumber = 3,
  disabled,
}) {
  const [inputNumbers, setInputNumbers] = useState([]);

  useEffect(() => {
    const newInputNumbers = [];
    for (let i = 0; i < imagesNumber; i++) {
      newInputNumbers.push(`image-${i + 1}`);
    }
    setInputNumbers(newInputNumbers);
  }, [imagesNumber]);

  function handleDeleteImage(key: string) {
    setValue(key, null);
  }

  console.log("inputNumbers", inputNumbers);

  return (
    <div>
      <ProductImageItem
        disabled={disabled}
        control={control}
        imageUrl={formData?.["images"]?.[inputNumbers[0]]}
        imageInputName={inputNumbers[0]}
        onRemoveImage={handleDeleteImage}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 2,
          flexWrap: "wrap",
          marginTop: 2,
        }}
      >
        {inputNumbers.slice(1)?.map((inputName) => {
          return (
            <ProductImageItem
              imageInputName={inputName}
              imageUrl={formData?.["images"]?.[inputName]}
              disabled={!formData?.["images"]?.[inputNumbers[0]] || disabled}
              key={inputName}
              control={control}
              onRemoveImage={handleDeleteImage}
              sx={{
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: "120px",
                height: "150px",
                opacity: !formData?.["images"]?.[inputNumbers[0]] ? 0.2 : 1,
              }}
            />
          );
        })}
      </Box>
    </div>
  );
}

export default AddProductImage;
