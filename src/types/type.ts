import type { ReactNode } from "react";

export interface TutorialStep {
    id: string;
    render: (renderProps: RederProps) => ReactNode;
}

export interface Position {
    x: number;
    y: number;
    top: number;
    right: number;
    left: number;
    bottom: number;
    width: number;
    height: number;
}

export interface RederProps {
    props: Position, 
    next?: () => void, 
    back?: () => void, 
    finish?: () => void, 
    goTo?: (id: string) => void
}