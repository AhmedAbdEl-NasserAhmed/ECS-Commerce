// components/FloatingWhatsApp.tsx
import React from "react";
import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
import "./FloatingWhatsAppIcon.scss";

const FloatingWhatsAppComponent: React.FC = () => {
  return (
    <WhatsAppWidget
      phoneNumber="+0201019658353" // Replace with your WhatsApp number
      companyName="ORCA"
      message="Hello! How can we help you?"
      sendButton="Send"
    />
  );
};

export default FloatingWhatsAppComponent;
