import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Register the image uploader module
// Quill.register("modules/imageUploader", ImageUploader);

interface IProps {
  name: string;
  value: string;
  onChange: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  customError?: string;
  defaultValue?: string;
}

const TextEditor = (props: IProps) => {
  const [content, setContent] = useState("");

  // React Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"], // Include the image toolbar option
      ["clean"],
    ],
    // imageUploader: {
    //   upload: (file) => {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         resolve(reader.result); // Resolve with base64 image
    //       };
    //       reader.onerror = (error) => reject(error);
    //       reader.readAsDataURL(file); // Convert to base64
    //     });
    //   },
    // },
  };
  // console.log("props.errors[props.name]", props.errors[props.name]);
  // const inputHasError = props.customError
  //   ? props.customError
  //   : props.errors
  //   ? props.errors[props.name]?.message
  //   : false;

  // console.log("inputHasError", inputHasError);

  console.log(props.customError);

  return (
    <div>
      <p className="font-semibold text-xl mb-5">{props.label}</p>
      <ReactQuill
        readOnly={props.disabled}
        style={
          {
            // height: "100%",
          }
        }
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        theme="snow"
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        modules={modules}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "link",
          //   "image",
        ]}
      />
      {/* <p>{inputHasError}</p> */}
      <p className="text-red-500 mt-20">{props.customError}</p>
    </div>
  );
};

export default TextEditor;
