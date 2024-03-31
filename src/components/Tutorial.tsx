import React, { type HTMLAttributes, useRef, useState, useEffect } from "react";
import { useTutorialPrivate } from "./TutorialProvider.js";
import type { Position } from "../types/type.js";

interface TutorialProps extends HTMLAttributes<HTMLDivElement> {
  location?: "left" | "right";
  position?: Position;
}

export const Tutorial = ({
  position: positionProps,
  location,
  ...rest
}: TutorialProps) => {
  const { position: positionContext, isLoading, setLoading } = useTutorialPrivate();
  const ref = useRef<HTMLDivElement | null>(null);

  const [renderPosition, setRenderPosition] = useState<Position | null>(null);

  useEffect(() => {
    const position: Position | null = positionProps || positionContext;

    if (!position) throw Error("Not position exists");

    let tempPosition: Position = { ...position };

    if (location === "right") {
      let leftPosition = position?.left || '0px'
      let width = position?.width || '0px'

      if (typeof leftPosition === 'number') {
        leftPosition = leftPosition + 'px'
      }
      if (typeof width === 'number') {
        width = width + 'px'
      }

      tempPosition = {
        ...position,
        left: `calc(${leftPosition} + ${width})`,
      };
    }

    if (location === "left") {
      const refPosition = ref.current?.getBoundingClientRect();
      let leftPosition = position?.left || '0px'
      let width = (refPosition?.width || '0px')

      if (typeof leftPosition === 'number') {
        leftPosition = leftPosition + 'px'
      }
      if (typeof width === 'number') {
        width = width + 'px'
      }

      tempPosition = {
        ...position,
        left: `calc(${leftPosition} - ${width})`,
      };
    }

    setRenderPosition(tempPosition);
    setLoading(false);
  }, [positionContext, positionProps, isLoading]);

  if (isLoading) return null;

  return (
    <div
      {...rest}
      ref={ref}
      style={{
        ...rest.style,
        position: "fixed",
        visibility: "visible",
        zIndex: "10010",
        borderRadius: "3px",
        overflow: "hidden",
        backgroundColor: "gray",
        top: renderPosition?.top,
        left: renderPosition?.left,
      }}
    />
  );
};
