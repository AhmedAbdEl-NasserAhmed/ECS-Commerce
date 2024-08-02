"use client";

import { FaWhatsapp } from "react-icons/fa";

import "./FloatingWhatsAppIcon.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

const FloatingWhatsAppComponent: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function hanldeOpenWhtasApp() {
    window.open("https://wa.me/+201019658353", "_blank", "noopener,noreferrer");
  }

  if (!isClient) return;

  return (
    <button className="icon" onClick={hanldeOpenWhtasApp}>
      <FaWhatsapp />
      <span className="icon__effect"></span>
    </button>
  );
};

export default FloatingWhatsAppComponent;
