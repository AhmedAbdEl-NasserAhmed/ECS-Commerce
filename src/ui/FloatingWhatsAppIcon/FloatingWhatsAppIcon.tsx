import { FaWhatsapp } from "react-icons/fa";

import "./FloatingWhatsAppIcon.scss";

const FloatingWhatsAppComponent: React.FC = () => {
  return (
    <a className="icon" href="https://wa.me/+201019658353" target="_blank">
      <FaWhatsapp />
      <span className="icon__effect"></span>
    </a>
  );
};

export default FloatingWhatsAppComponent;
