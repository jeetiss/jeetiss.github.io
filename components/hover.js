"use client";

import { useContext, useState, createContext } from "react";

const HoverContext = createContext();

export const Hover = ({ as, children, ...props }) => {
  const [isHovered, update] = useState(false);
  const Tag = as ?? "div";

  return (
    <Tag
      {...props}
      onMouseEnter={() => update(true)}
      onMouseLeave={() => update(false)}
    >
      <HoverContext.Provider value={isHovered}>
        {children}
      </HoverContext.Provider>
    </Tag>
  );
};

export const Default = ({ children }) => {
  const isHovered = useContext(HoverContext);
  return isHovered ? null : children;
};

export const Hovered = ({ children }) => {
  const isHovered = useContext(HoverContext);
  return isHovered ? children : null;
};
