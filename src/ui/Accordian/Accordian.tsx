"use client";

import React, {
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";

type AccordianListProps = {
  id: string;
  children: ReactElement | ReactElement[];
  className?: string;
  close?: boolean;
};

interface AccordianContextProps {
  openId: string;
  openAccordian: (id: string) => void;
  closeAccordian: () => void;
}

const AccordianContext = createContext({} as AccordianContextProps);

function Accordian({ children }) {
  const [openId, setOpenId] = useState<string>("");

  const openAccordian = setOpenId;

  const closeAccordian = () => setOpenId("");

  return (
    <AccordianContext.Provider
      value={{ openAccordian, closeAccordian, openId }}
    >
      {children}
    </AccordianContext.Provider>
  );
}

function AccordianToggle({ id, children }) {
  const { openId, openAccordian, closeAccordian } =
    useContext(AccordianContext);

  function handleToggle() {
    id === "" || openId !== id ? openAccordian(id) : closeAccordian();
  }

  return (
    <button
      style={{ padding: "15px" }}
      className=" w-full relative transition-all duration-500"
      onClick={handleToggle}
    >
      {children}
    </button>
  );
}

function AccordianList({ id, children, className, close }: AccordianListProps) {
  const { openId, closeAccordian } = useContext(AccordianContext);

  if (close) return null;

  return (
    <ul
      style={{
        height: id === openId ? "50%" : "0",
      }}
      className={`${className}  mt-6 transition-all duration-500 ease-out overflow-hidden`}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(child, { onClick: () => closeAccordian() } as Partial<
              typeof child.props
            >)
          : child
      )}
    </ul>
  );
}

Accordian.Toggle = AccordianToggle;

Accordian.List = AccordianList;

export default Accordian;
