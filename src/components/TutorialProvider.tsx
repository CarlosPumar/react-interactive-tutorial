import React, { useContext } from "react";
import { type ReactNode, createContext, useEffect, useState } from "react";
import Opaque from "./Opaque.js";
import type { Position, TutorialStep } from "../types/type.js";

type TutorialContextType = {
  start: () => void;
};

type TutorialPrivateContextType = {
  position: Position | null;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
};

type Props = {
  steps: TutorialStep[];
  children: ReactNode;
};

const TutorialContext = createContext<TutorialContextType | null>(null);
const TutorialPrivateContext = createContext<TutorialPrivateContextType | null>(
  null
);

export const TutorialProvider = ({ steps, children }: Props) => {
  const [index, setIndex] = useState<number | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [currentStep, setCurrentStep] = useState<TutorialStep | null>(null);

  const [isLoading, setLoading] = useState(false);

  const _getData = (newIndex: number) => {
    setLoading(true);
    _handleGetPositionFirstTime(newIndex);
    setCurrentStep(steps[newIndex] || null);
    setIndex(newIndex);
  };

  const start = () => {
    _getData(0);
  };

  const finish = () => {
    setIndex(null);
    setCurrentStep(null);
    setPosition(null)
  };

  const next = () => {
    if (index === null) return;
    if (index >= steps.length - 1) return finish();
    _getData(index + 1);
  };

  const back = () => {
    if (index === null) return;
    if (index - 1 < 0) return finish();
    _getData(index - 1);
  };

  const goTo = (id: string) => () => {
    let i = 0;
    let newIndex = -1;
    steps.forEach((step) => {
      if (step.id === id) newIndex = i;
      i++;
    });
    if (newIndex < 0) return;
    _getData(newIndex);
  };

  const _handleGetPositionFirstTime = (index: number) => {
    if (index === null || steps[index]?.id.charAt(0) === "_") return;

    const targetNode = document.body;

    const observerElement = new MutationObserver((_, observer) => {
      const stepSelectedHTML = document.querySelector(steps[index]?.id || "");
      if (!stepSelectedHTML) return;

      const props = stepSelectedHTML.getBoundingClientRect();
      if (!props) return;

      setPosition({
        left: props.left,
        top: props.top,
        right: props.right,
        bottom: props.bottom,
        width: props.width,
        height: props.height,
        x: props.x,
        y: props.y,
      });
      observer.disconnect(); // Stop observing once the modal is found
    });

    // Start observing the body for changes
    observerElement.observe(targetNode, { childList: true, subtree: true });
  };

  // USE EFFECT
  const _handleResize = () => {
    if (index === null || steps[index]?.id.charAt(0) === "_") return;

    const stepSelectedHTML = document.querySelector(steps[index]?.id || "");
    if (!stepSelectedHTML) return;

    const props = stepSelectedHTML.getBoundingClientRect();
    if (!props) return;

    setPosition({
      left: props.left,
      top: props.top,
      right: props.right,
      bottom: props.bottom,
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", _handleResize);
    window.addEventListener("scroll", _handleResize, { capture: true });

    return () => {
      window.removeEventListener("resize", _handleResize);
      window.removeEventListener("scroll", _handleResize);
    };
  }, [index]);

  let stepRendered = null;

  if (currentStep && !position) stepRendered = <Opaque>{null}</Opaque>;
  if (currentStep && position) {
    stepRendered = (
      <Opaque>
        {currentStep?.render({ position, next, back, finish, goTo }) || null}
      </Opaque>
    );
  }

  if (index !== null && steps[index]?.id.charAt(0) === "_") {
    stepRendered = (
      <Opaque>
        {currentStep?.render({ position: undefined, next, back, finish, goTo }) || null}
      </Opaque>
    );
  }

  return (
    <TutorialContext.Provider
      value={{
        start,
      }}
    >
      <TutorialPrivateContext.Provider
        value={{
          position,
          isLoading,
          setLoading
        }}
      >
        {children}
        {stepRendered}
      </TutorialPrivateContext.Provider>
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const tutorialContext = useContext(TutorialContext);
  if (!tutorialContext)
    throw Error("useTutorial must be inside of TuturialProvider!");
  return tutorialContext;
};

export const useTutorialPrivate = () => {
  const tutorialPrivateContext = useContext(TutorialPrivateContext);
  if (!tutorialPrivateContext)
    throw Error("useTutorial must be inside of TuturialProvider!");
  return tutorialPrivateContext;
};
