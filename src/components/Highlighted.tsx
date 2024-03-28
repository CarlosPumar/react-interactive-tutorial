import React from "react";
import { HTMLAttributes } from "react";
import { useTutorial } from "./TutorialProvider";
import { Position } from "../types";

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