"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styles from "./Menus.module.scss";
import useClickOutside from "../../hooks/useClickOutside";
import { useParams } from "next/navigation";

interface MenusButton {
  children: React.ReactNode;
  onClick?: () => void;
  icon: React.ReactElement;
}

interface PositionObject {
  x: number;
  y: number;
}

interface MenusContext {
  openId: string;
  position: object;
  closeMenus: (id: string) => void;
  openHandler: (id: string) => void;
  setPosition: (object: PositionObject) => void;
}

const MenusContext = createContext({} as MenusContext);

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const [position, setPosition] = useState(null);

  const closeMenus = () => setOpenId("");

  const openHandler = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, closeMenus, openHandler, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className={styles["menus__menu"]}>{children}</div>;
}

function Toggle({ id }) {
  const { openId, closeMenus, setPosition, openHandler } =
    useContext(MenusContext);

  const { locale } = useParams();

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();

    const isRTL = locale === "ar";

    const x = isRTL
      ? window.innerWidth - rect.width - rect.x - 110
      : window.innerWidth - rect.width - rect.x + 20;

    const y = rect.y + rect.height - 15;

    setPosition({ x, y });

    openId === "" || openId !== id ? openHandler(id) : closeMenus("");
  }
  return (
    <button className={styles["menus__toggle"]} onClick={handleClick}>
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, closeMenus } = useContext(MenusContext);

  useEffect(() => {
    function handleScrolling() {
      closeMenus("");
    }

    window.addEventListener("scroll", handleScrolling);

    return () => window.removeEventListener("scroll", handleScrolling);
  }, [closeMenus]);

  const menuRef = useClickOutside({
    close: closeMenus,
    value: "",
    StopBubbling: false,
  });

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={menuRef}
      style={{ right: `${position["x"]}px`, top: `${position["y"]}px` }}
      className={styles["menus__list"]}
    >
      {children}
    </ul>,
    document.body
  );
}

function MenusButton({ children, onClick, icon }: MenusButton) {
  const { closeMenus } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    closeMenus("");
  }

  return (
    <li>
      <button onClick={handleClick} className={styles["menus__button"]}>
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = MenusButton;

export default Menus;
