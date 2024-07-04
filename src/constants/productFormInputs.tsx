// import {
//   AdminProductProps,
//   ColourOption,
//   CustomizedTextFieldProps,
// } from "@/types/types";

// // : CustomizedTextFieldProps[] =

// export const productFormInputs = (): // formData: AdminProductProps,
// // colorsOptions
// CustomizedTextFieldProps[] => {
//   return [
//     {
//       id: "1",
//       name: "productName",
//       inputType: "input",
//       textlabel: "Product Name",
//       textLabelClass: "font-semibold text-xl",
//       defaultValue: "",
//       placeholder: "Product Name",

//       rules: {
//         required: "This field is required",
//       },
//       formerHelperStyles: { style: { fontSize: "1rem" } },
//       type: "text",
//       variant: "outlined",
//       size: "small",
//       sx: {
//         helperText: {
//           fontSize: "4rem",
//         },
//         input: {
//           fontSize: "1.4rem",
//         },

//         "& .MuiOutlinedInput-root": {
//           "& fieldset": {
//             borderRadius: "10px",
//             borderColor: "#dcdbdb",
//             backgroundColor: "#ffffff52",
//           },

//           "& .MuiInputBase-input": {
//             backgroundColor: "none",
//             paddingBlock: "1rem",
//             paddingInline: "1.8rem",
//             color: "#383737",

//             "&::placeholder": {
//               color: "#939393",
//               fontSize: "1.2rem",
//               opacity: 1,
//             },
//           },

//           "&.Mui-error .MuiOutlinedInput-notchedOutline": {
//             borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
//           },

//           "&:hover fieldset": {
//             borderColor: "#dcdbdb",
//           },

//           "&.Mui-focused fieldset": {
//             borderColor: "#dcdbdb",
//           },
//         },
//       },
//     },
//     {
//       id: "2",
//       name: "productColors",
//       textLabel: "Product Colors",
//       isMulti: true,
//       textLabelClass: "font-semibold text-xl",
//       rules: {
//         required: "This field is required",
//       },
//       inputType: "list",
//       placeholder: "Product Colors",
//       // options: colorsOptions,
//     },
//     {
//       id: "3",
//       name: "productSizes",
//       textLabel: "Product Sizes",
//       isMulti: false,
//       textLabelClass: "font-semibold text-xl",
//       rules: {
//         required: "This field is required",
//       },
//       inputType: "list",
//       placeholder: "Product Sizes",
//       options: [
//         { value: "XS", label: "XS", color: "#666666" },
//         { value: "SM", label: "SM", color: "#666666" },
//         { value: "L", label: "L", color: "#666666" },
//         { value: "Xl", label: "Xl", color: "#666666" },
//         { value: "XXl", label: "XXl", color: "#666666" },
//         { value: "XXXl", label: "XXXl", color: "#666666" },
//       ],
//     },
//     {
//       id: "4",
//       name: "productQuantity",
//       textLabelClass: "font-semibold text-xl",
//       inputType: "input",
//       textlabel: "Product Quantity",
//       defaultValue: "",
//       placeholder: "Product Quantity",

//       rules: {
//         required: "This field is required",
//       },
//       formerHelperStyles: { style: { fontSize: "1rem" } },
//       type: "number",
//       variant: "outlined",
//       size: "small",
//       sx: {
//         helperText: {
//           fontSize: "4rem",
//         },
//         input: {
//           fontSize: "1.4rem",
//         },

//         "& .MuiOutlinedInput-root": {
//           "& fieldset": {
//             borderRadius: "10px",
//             borderColor: "#dcdbdb",
//             backgroundColor: "#ffffff52",
//           },

//           "& .MuiInputBase-input": {
//             backgroundColor: "none",
//             paddingBlock: "1rem",
//             paddingInline: "1.8rem",
//             color: "#383737",

//             "&::placeholder": {
//               color: "#939393",
//               fontSize: "1.2rem",
//               opacity: 1,
//             },
//           },

//           "&.Mui-error .MuiOutlinedInput-notchedOutline": {
//             borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
//           },

//           "&:hover fieldset": {
//             borderColor: "#dcdbdb",
//           },

//           "&.Mui-focused fieldset": {
//             borderColor: "#dcdbdb",
//           },
//         },
//       },
//     },
//     {
//       id: "5",
//       name: "productPrice",
//       textLabelClass: "font-semibold text-xl",
//       inputType: "input",
//       textlabel: "Product Price",
//       defaultValue: "",
//       placeholder: "Product Price",

//       rules: {
//         required: "This field is required",
//         min: {
//           value: 1,
//           message: "This field should be more than 1 ",
//         },
//       },
//       formerHelperStyles: { style: { fontSize: "1rem" } },
//       type: "number",
//       variant: "outlined",
//       size: "small",
//       sx: {
//         helperText: {
//           fontSize: "4rem",
//         },
//         input: {
//           fontSize: "1.4rem",
//         },

//         "& .MuiOutlinedInput-root": {
//           "& fieldset": {
//             borderRadius: "10px",
//             borderColor: "#dcdbdb",
//             backgroundColor: "#ffffff52",
//           },

//           "& .MuiInputBase-input": {
//             backgroundColor: "none",
//             paddingBlock: "1rem",
//             paddingInline: "1.8rem",
//             color: "#383737",

//             "&::placeholder": {
//               color: "#939393",
//               fontSize: "1.2rem",
//               opacity: 1,
//             },
//           },

//           "&.Mui-error .MuiOutlinedInput-notchedOutline": {
//             borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
//           },

//           "&:hover fieldset": {
//             borderColor: "#dcdbdb",
//           },

//           "&.Mui-focused fieldset": {
//             borderColor: "#dcdbdb",
//           },
//         },
//       },
//     },
//     {
//       id: "6",
//       name: "productDiscount",
//       textLabelClass: "font-semibold text-xl",
//       inputType: "input",
//       textlabel: "Product Discount",
//       defaultValue: "",
//       placeholder: "Product Discount",
//       rules: {
//         required: "This field is required",
//         min: {
//           value: 0,
//           message: "This field should be more than 0 ",
//         },
//         max: {
//           // value: +formData.productPrice,
//           value: 1,
//           message: "This field should  be less than Product Price ",
//         },
//       },
//       formerHelperStyles: { style: { fontSize: "1rem" } },
//       type: "number",
//       variant: "outlined",
//       size: "small",
//       sx: {
//         helperText: {
//           fontSize: "4rem",
//         },
//         input: {
//           fontSize: "1.4rem",
//         },

//         "& .MuiOutlinedInput-root": {
//           "& fieldset": {
//             borderRadius: "10px",
//             borderColor: "#dcdbdb",
//             backgroundColor: "#ffffff52",
//           },

//           "& .MuiInputBase-input": {
//             backgroundColor: "none",
//             paddingBlock: "1rem",
//             paddingInline: "1.8rem",
//             color: "#383737",

//             "&::placeholder": {
//               color: "#939393",
//               fontSize: "1.2rem",
//               opacity: 1,
//             },
//           },

//           "&.Mui-error .MuiOutlinedInput-notchedOutline": {
//             borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
//           },

//           "&:hover fieldset": {
//             borderColor: "#dcdbdb",
//           },

//           "&.Mui-focused fieldset": {
//             borderColor: "#dcdbdb",
//           },
//         },
//       },
//     },
//     {
//       id: "7",
//       name: "productDescription",
//       textLabelClass: "font-semibold text-xl",
//       inputType: "input",
//       textlabel: "Product Description",
//       defaultValue: "",
//       placeholder: "Product Description",
//       className: "col-span-full",
//       rules: {
//         required: "This field is required",
//       },
//       formerHelperStyles: { style: { fontSize: "1rem" } },
//       type: "text",

//       size: "small",
//       multiline: true,
//       row: 4,
//       sx: {
//         helperText: {
//           fontSize: "4rem",
//         },
//         input: {
//           fontSize: "1.4rem",
//         },

//         "& .MuiOutlinedInput-root": {
//           "& fieldset": {
//             borderRadius: "10px",
//             borderColor: "#dcdbdb",
//             backgroundColor: "#ffffff52",
//           },

//           "& .MuiInputBase-input": {
//             backgroundColor: "none",
//             paddingBlock: "1rem",
//             paddingInline: "0.8rem",
//             color: "#383737",

//             "&::placeholder": {
//               color: "#939393",
//               fontSize: "1.2rem",
//               opacity: 1,
//             },
//           },

//           "&.Mui-error .MuiOutlinedInput-notchedOutline": {
//             borderColor: "rgb(186, 9, 9)", // Customize the border color on error here
//           },

//           "&:hover fieldset": {
//             borderColor: "#dcdbdb",
//           },

//           "&.Mui-focused fieldset": {
//             borderColor: "#dcdbdb",
//           },
//         },
//       },
//     },
//   ];
// };

// export default productFormInputs;
