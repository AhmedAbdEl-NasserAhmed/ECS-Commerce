import { useEffect, useState } from "react";
import { FaLink, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

const SocialLink = (props) => {
  let icon = props.icon;
  // <FontAwesomeIcon
  //   icon={props.icon}
  //   size={props.size}
  //   className={props.className}
  // />

  let content = (
    <div
      className="cursor-pointer w-5 h-8 flex items-center justify-center"
      onClick={props?.onClick?.bind(null, props.copyContent)}
    >
      {icon}
    </div>
  );

  if (props.href) {
    content = (
      <a
        href={props.href || "#"}
        // action={props.action || ""}
        target={"_blank"}
        rel="noreferrer"
      >
        {icon}
      </a>
    );
  }

  return (
    <div className="group flex items-center justify-center border rounded p-2 relative w-20">
      <div className="absolute top-[-3rem] w-max h-8 px-2 text-center text-white rounded bg-neutral-700 text-[12px] opacity-0 group-hover:opacity-100">
        {props.tooltip}
      </div>
      {content}
    </div>
  );
};

const SharableSocialLinks = ({ data, dynamicHref }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [clipboardContent, setClipboardContent] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSmallScreen(window.innerWidth < 500);
    }
  }, [typeof window]);

  const whatsappHref = isSmallScreen
    ? "whatsapp://send"
    : "https://web.whatsapp.com/send";

  const socialLinks = [
    {
      href: `https://www.linkedin.com/shareArticle?url=${dynamicHref}&title=${data.title}`,
      className: "text-linkedin",
      icon: <FaLinkedin color="#0077B5" fontSize={"2rem"} />,
      size: "xs",
      tooltip: "Share on Linkedin",
    },
    {
      href: `https://twitter.com/intent/tweet?url=${dynamicHref}&text=${data.title}`,

      className: "text-twitter",
      icon: <FaTwitter color="#1DA1F2" fontSize={"2rem"} />,
      size: "xs",
      tooltip: "Share on Twitter",
    },
    {
      href: whatsappHref + "?text=" + data.title + ` ${dynamicHref}`,
      action: `share/whatsapp/share`,
      className: "text-whatsapp",
      icon: <FaWhatsapp color="#25D366" fontSize={"2rem"} />,
      size: "xs",
      tooltip: "Share on Whatsapp",
    },
  ];

  const copyToClipboard = (href) => {
    window.navigator.clipboard.writeText(href);
    setClipboardContent(href);
    setTimeout(removeClipboard, 1000);
  };

  const removeClipboard = () => {
    setClipboardContent("");
  };

  return (
    <div className="flex items-center gap-3 shared-social-links">
      {socialLinks.map((link, idx) => {
        return (
          <SocialLink
            key={idx}
            href={link.href}
            action={link.action}
            icon={link.icon}
            size={link.size}
            className={link.className}
            tooltip={link.tooltip}
          />
        );
      })}
      <SocialLink
        copyContent={dynamicHref}
        icon={<FaLink fontSize={"2rem"} />}
        onClick={copyToClipboard}
        className={"text-primary-dark text-[1.1rem]"}
        tooltip={clipboardContent ? "Copied!" : "Copy URL"}
      />
    </div>
  );
};

export default SharableSocialLinks;
