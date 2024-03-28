import { ReactNode } from "react";

type TutorialStep = {
    id: string;
    render: (renderProps: RederProps) => ReactNode;
}

type Position = {
    x: number;
    y: number;
    top: number;
    right: number;
    left: number;
    bottom: number;
    width: number;
    height: number;
}

type RederProps = {
    props: Position, 
    next?: () => void, 
    back?: () => void, 
    finish?: () => void, 
    goTo?: (id: string) => void
}