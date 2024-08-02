import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { HiLocationMarker, HiOutlineMail } from "react-icons/hi";
import { HiPhone } from "react-icons/hi2";

function contactusIcons() {
  return [
    {
      id: 1,
      label: "phone",
      value: "01019491146",
      icon: <HiPhone />,
    },
    {
      id: 2,
      label: "email",
      value: "Help@Orca.com",
      icon: <HiOutlineMail />,
    },
    {
      id: 3,
      label: "address",
      value: "Online",
      icon: <HiLocationMarker />,
    },
    {
      id: 4,
      label: "facebook",
      value: "orca Page",
      icon: <FaFacebook />,
    },
    {
      id: 5,
      label: "Instagram",
      value: "orca Page Instagram",
      icon: <FaSquareInstagram />,
    },
  ];
}

export default contactusIcons;
