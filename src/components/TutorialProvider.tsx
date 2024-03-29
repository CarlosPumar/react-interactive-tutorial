import React, { useContext } from "react";
import { type ReactNode, createContext, useEffect, useState } from "react";
import Opaque from "./Opaque.js";
import type { Position, TutorialStep } from "../types/type.js";

type TutorialContextType = {
    start: () => void;
    id: string | null;
    index: number | null;
    props: Position | null;
}

type Props = {
    steps: TutorialStep[];
    children: ReactNode;
}

const TutorialContext = createContext<TutorialContextType | null>(null);

export const TutorialProvider = ({ steps, children }: Props) => {
    
    const [index, setIndex] = useState<number | null>(null);
    const [position, setPosition] = useState<Position | null>(null);
    const [currentStep, setCurrentStep] = useState<TutorialStep | null>(null)

    const _getData = (newIndex: number) => {
        _handleResize(newIndex);
        setCurrentStep(steps[newIndex] || null);
        setIndex(newIndex);
    }

    const start = () => {
        _getData(0);
    }

    const finish = () => {
        setIndex(null);
        setCurrentStep(null);
    }

    const next = () => {
        if (index === null) return; 
        if (index >= steps.length - 1) return finish()
        _getData(index + 1)
    }

    const back = () => {
        if (index === null) return; 
        if (index - 1 < 0) return finish()
        _getData(index - 1)
    }

    const goTo = (id: string) => {
        let i = 0;
        let newIndex = -1;
        steps.forEach(step => {
            if (step.id === id) newIndex = i;
            i++;
        })
        if (newIndex < 0) return;
        _getData(newIndex)
    }


    // USE EFFECT
    const _handleResize = (index: number) => {    
        if (index === null) return;

        const stepSelectedHTML = document.querySelector(steps[index]?.id || '');
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
            y: props.y
        })
      };

      useEffect(() => {
        const handleResizeElement = () => index !== null ? _handleResize(index) : null;
    
        window.addEventListener('resize', handleResizeElement);
        window.addEventListener('scroll', handleResizeElement, { capture: true });
    
        return () => {
          window.removeEventListener('resize', handleResizeElement);
          window.removeEventListener('scroll', handleResizeElement);
        };
      }, [index]);

    let stepRendered = null;

    if (currentStep && !position) stepRendered = <Opaque>{null}</Opaque>
    if (currentStep && position) {
        stepRendered = <Opaque>
                            {currentStep?.render({props: position, next, back, finish, goTo}) || null}
                       </Opaque>
    }
    return (
        <TutorialContext.Provider value={{
            start,
            id: currentStep?.id || null,
            index,
            props: position
        }}>
            {children}
            {stepRendered}
        </TutorialContext.Provider>
    );
}

export const useTutorial = () => {
    const tutorialContext = useContext(TutorialContext);
    if (!tutorialContext) throw Error('useTutorial must be inside of TuturialProvider!');
    return tutorialContext;
}
