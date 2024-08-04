import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { HiLocationMarker, HiOutlineMail } from "react-icons/hi";
import { HiPhone } from "react-icons/hi2";

function contactusIcons(t) {
  return [
    {
      id: 1,
      label: t("Phone"),
      value: "01010101010",
      icon: <HiPhone />,
    },
    {
      id: 2,
      label: t("Email Address"),
      value: "Help@Orca.com",
      icon: <HiOutlineMail />,
    },
    {
      id: 3,
      label: t("Address"),

      value: "Online",
      icon: <HiLocationMarker />,
    },
    {
      id: 4,
      label: t("Facebook"),
      value: "orca Page",
      icon: <FaFacebook />,
    },
    {
      id: 5,
      label: t("Instagram"),
      value: "orca Page Instagram",
      icon: <FaSquareInstagram />,
    },
  ];
}

export default contactusIcons;
