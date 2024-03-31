import React from "react";
import type { HTMLAttributes } from "react";
import { useTutorialPrivate } from "./TutorialProvider.js";
import type { Position } from "../types/type.js";

interface HighlightedProps extends HTMLAttributes<HTMLDivElement> {
  position?: Position;
}

const Highlighted = ({ position, ...rest }: HighlightedProps) => {
  const { position: contextProps } = useTutorialPrivate();

  let positionToRender = contextProps;
  if (position) positionToRender = position;

  return (
    <div
      {...rest}
      style={{
        ...rest.style,
        position: "absolute",
        opacity: "1",
        pointerEvents: "auto",
        transition: "opacity 0.2s ease 0s",
        overflow: "hidden",
        visibility: "visible",
        backgroundColor: "gray",
        ...positionToRender,
      }}
    />
  );
};

export default Highlighted;
