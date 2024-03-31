import type { ReactNode } from "react";

export interface TutorialStep {
    id: string;
    render: (renderProps: RederProps) => ReactNode;
}

export interface Position {
    x?: string | number;
    y?:  string | number;
    top?:  string | number;
    right?:  string | number;
    left?: string | number;
    bottom?: string | number;
    width?: string | number;
    height?: string | number;
}

export interface RederProps {
    position?: Position, 
    next: () => void, 
    back: () => void, 
    finish: () => void, 
    goTo: (id: string) => () => void
}