"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill Snow theme CSS
import { FaNewspaper } from "react-icons/fa";

import { Box, Button } from "@mui/material";

import { useState } from "react";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["image", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

function BlogPage() {
  const [value, setValue] = useState<string>("");

  console.log(value);

  return (
    <Box component="div" className=" p-[1.8rem] md:p-[4rem] ">
      <Box className="flex flex-col gap-12 ">
        <h2 className="text-cyan-500 font-bold text-3xl  ">ADD BLOG</h2>
        <ReactQuill
          style={{
            width: "68vw",
            paddingBottom: "20vh",
            margin: "0 auto",
            height: "400px",
            display: "block",
          }}
          modules={{ toolbar: toolbarOptions }}
          value={value}
          onChange={setValue}
        />

        <Box component="div" className="w-2/5 self-center">
          <Button
            className="w-full  "
            sx={{
              fontSize: "1.2rem",
              backgroundColor: "#3dbadd",
              "&:hover": {
                backgroundColor: "#28abcf",
              },
            }}
            type="submit"
            variant="contained"
            size="large"
            endIcon={<FaNewspaper />}
          >
            Add Blog
          </Button>
        </Box>
        {/* <div
          dangerouslySetInnerHTML={{ __html: value }}
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        /> */}
      </Box>
    </Box>
  );
}

export default BlogPage;
