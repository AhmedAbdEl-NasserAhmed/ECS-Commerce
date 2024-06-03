import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styles from "./Menus.module.scss";
import useClickOutside from "../../hooks/useClickOutside";

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
  close: (id: string) => void;
  openHandler: (id: string) => void;
  position: object;
  setPosition: (object: PositionObject) => void;
}

const MenusContext = createContext({} as MenusContext);

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");

  const openHandler = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, openHandler, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className={styles["menus__menu"]}>{children}</div>;
}

function Toggle({ id }) {
  const { openId, close, setPosition, openHandler } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x + 20,
      y: rect.y + rect.height - 15,
    });

    openId === "" || openId !== id ? openHandler(id) : close("");
  }

  return (
    <button className={styles["menus__toggle"]} onClick={handleClick}>
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  const menuRef = useClickOutside({ close, StopBubbling: false });

  function hanldeScrolling() {
    close("");
  }

  window.addEventListener("scroll", hanldeScrolling);

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
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick();
    close("");
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
