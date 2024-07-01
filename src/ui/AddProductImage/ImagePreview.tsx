import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

function ImagePreview(props) {
  const [imageUrl, setImageUrl] = useState(props.imageUrl);

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    if (props.imageUrl) {
      reader.readAsDataURL(props.imageUrl);
    }
  }, [props.imageUrl]);

  return (
    <div className="relative w-full h-full ">
      {props.imageUrl && (
        <Image src={imageUrl} alt="img" fill objectFit="cover" />
      )}
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
    </div>
  );
}

export default ImagePreview;
