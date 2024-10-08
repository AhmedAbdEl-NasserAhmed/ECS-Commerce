import { HiOutlinePlusCircle } from "react-icons/hi2";

function ImageInput(props) {
  return (
    <div>
      <HiOutlinePlusCircle />
      <input
        disabled={props.disabled}
        onChange={(e) => {
          props.onChange(e.target.files[0]);
        }}
        name={props.name}
        className="absolute w-full left-0 top-0 h-full opacity-0 cursor-pointer"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
        type="file"
      />
    </div>
  );
}

export default ImageInput;
