import React, { HTMLAttributes, useRef } from "react";
import { useTutorial } from "./TutorialProvider";
import { Position } from "..";

interface TutorialProps  extends HTMLAttributes<HTMLDivElement> {
    position: 'left' | 'right'
    props?: Position;
}

export const Tutorial = ({ props, position, ...rest }: TutorialProps) => {

    const { props: contextProps } = useTutorial();

    let propsToRender = contextProps;
    if (props) propsToRender = props;

    const ref = useRef<HTMLDivElement | null>(null);

    let propsCopy = {...propsToRender}

    if (position === 'left') {
        propsCopy = {
            ...props,
            top: propsToRender!!.top,
            left: propsToRender!!.left!! + propsToRender!!.width
        }
    }

    if (position === 'right') {
        const refProps = ref.current?.getBoundingClientRect()
        if (!refProps) return
        propsCopy = {
            ...props,
            top: propsToRender!!.top,
            left: propsToRender!!.left - refProps.width
        }
    }

    return <div
                ref={ref}
                {...rest}
                style={{
                    ...rest.style,
                    position: 'fixed',
                    visibility:'visible',
                    zIndex: '10010',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    top: propsCopy.top,
                    left: propsCopy.left
                }}
            />
}
