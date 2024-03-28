import Highlighted from "./components/Highlighted";
import Opaque from "./components/Opaque";
import { Tutorial } from "./components/Tutorial";
import { TutorialProvider, useTutorial,  } from "./components/TutorialProvider";
import { Position, RederProps, TutorialStep } from "./types";

export { TutorialProvider, useTutorial, Tutorial, Opaque, Highlighted }
export type { TutorialStep, Position, RederProps }