import Highlighted from "./components/Highlighted.js";
import Opaque from "./components/Opaque.js";
import { Tutorial } from "./components/Tutorial.js";
import { TutorialProvider, useTutorial  } from "./components/TutorialProvider.js";

export type { TutorialStep, Position, RederProps } from "./types/type.js";
export { TutorialProvider, useTutorial, Tutorial, Opaque, Highlighted };
