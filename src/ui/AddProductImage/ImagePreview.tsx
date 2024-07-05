import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import MiniSpinner from "../MiniSpinner/MiniSpinner";

function ImagePreview(props) {
  const [imageUrl, setImageUrl] = useState(props.imageUrl);

  useEffect(() => {
    if (props.imageUrl && props.imageUrl instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      if (props.imageUrl) {
        reader.readAsDataURL(props.imageUrl);
      }
    } else {
      setImageUrl(props.imageUrl.url);
    }
  }, [props.imageUrl]);

  console.log("imageUrl", imageUrl);

  return (
    <div className="relative w-full h-full ">
      {props.imageUrl && (
        <Image src={imageUrl} alt="img" fill objectFit="contain" />
      )}
      {props.disabled ? null : (
        <div
          onClick={() => props.onRemove(props.imageInputName)}
          className="absolute bg-white flex justify-center items-center cursor-pointer rounded-md border-2 border-black"
          style={{
            top: "5px",
            right: "5px",
            width: "25px",
            height: "25px",
            fontSize: "1.8rem",
          }}
        >
          <HiOutlineTrash />
        </div>
      )}
    </div>
  );
}

export default ImagePreview;
