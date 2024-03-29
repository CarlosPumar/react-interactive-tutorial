import React from "react";
import type { HTMLAttributes } from "react";
import { useTutorial } from "./TutorialProvider.js";
import type { Position } from "../types/type.js";

interface HighlightedProps extends HTMLAttributes<HTMLDivElement> {
    props?: Position;
}

const Highlighted = ({ props, ...rest }: HighlightedProps) => {

    const { props: contextProps } = useTutorial();

    let propsToRender = contextProps;
    if (props) propsToRender = props;

    return <div 
                {...rest} 
                style={{
                    ...rest.style,
                    position: 'absolute',
                    opacity: '1',
                    pointerEvents: 'auto',
                    transition: 'opacity 0.2s ease 0s',
                    overflow: 'hidden',
                    visibility: 'visible',
                    backgroundColor: 'gray',
                    ...propsToRender
                }} 
            />
}

export default Highlighted;