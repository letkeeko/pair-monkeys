import {
  createContext,
  createSignal,
  createEffect,
  onCleanup,
  useContext,
} from "solid-js";
import type { JSXElement, Accessor, Setter } from "solid-js";
import MONKEYS from "const/monkeys";
import shuffleArray from "utils/shuffle-array";
import correctAudio from "assets/audio/correct.wav";
import incorrectAudio from "assets/audio/incorrect.wav";
import completeAudio from "assets/audio/complete.wav";
import { makeAudio } from "@solid-primitives/audio";

export type Monkey = {
  id: string;
  imageSrc: string;
};

interface PlayProviderProps {
  onImageClick: (monkey: Monkey) => void;
  activeMonkeys: Accessor<Monkey[]>;
  pairedMonkeys: Accessor<Monkey[]>;
  time: Accessor<number>;
  setTime: Setter<number>;
  isTimerOn: Accessor<boolean>;
  setTimerOn: Setter<boolean>;
  onReset: () => void;
  monkeys: Accessor<ShuffledMonkeys>;
  isModalCompleteOpen: Accessor<boolean>;
  setModalCompleteOpen: Setter<boolean>;
  isModalWarningOpen: Accessor<boolean>;
  setModalWarningOpen: Setter<boolean>;
}

interface ShuffledMonkeys {
  shuffledMonkeys: Monkey[];
  groupedMonkeys1: Monkey[];
  groupedMonkeys2: Monkey[];
}

export const PlayContext = createContext({} as PlayProviderProps);

const PlayProvider = (props: { children: JSXElement }) => {
  // images
  const shuffledMonkeys = shuffleArray(MONKEYS).slice(0, 10);
  const [monkeys, setMonkeys] = createSignal<ShuffledMonkeys>({
    shuffledMonkeys,
    groupedMonkeys1: shuffleArray(shuffledMonkeys).map((monkey) => {
      return { ...monkey, id: crypto.randomUUID() };
    }),
    groupedMonkeys2: shuffleArray(shuffledMonkeys).map((monkey) => {
      return { ...monkey, id: crypto.randomUUID() };
    }),
  });

  // timer
  const [time, setTime] = createSignal(0);
  const [isTimerOn, setTimerOn] = createSignal(false);

  // selection
  const [activeMonkeys, setActiveMonkeys] = createSignal<Monkey[]>([]);
  const [pairedMonkeys, setPairedMonkeys] = createSignal<Monkey[]>([]);

  // score
  const [score, setScore] = createSignal(0);

  // feedbacks
  const [isModalCompleteOpen, setModalCompleteOpen] = createSignal(false);
  const [isModalWarningOpen, setModalWarningOpen] = createSignal(false);

  // sound effects
  const correctSound = makeAudio(correctAudio);
  const incorrectSound = makeAudio(incorrectAudio);
  const completeSound = makeAudio(completeAudio);

  createEffect(() => {
    if (isTimerOn()) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      onCleanup(() => clearInterval(interval));
    }
  });

  const onImageClick = (monkey: Monkey) => {
    if (isTimerOn() === false) {
      setModalWarningOpen(true);
      return;
    }

    setActiveMonkeys([monkey, ...activeMonkeys()]);
    if (activeMonkeys().length === 2) {
      setTimeout(checkMatch, 200);
    }
  };

  const checkMatch = () => {
    const selection1 = activeMonkeys()[0];
    const selection2 = activeMonkeys()[1];

    if (selection1.imageSrc === selection2.imageSrc) {
      setScore(score() + 1);
      setPairedMonkeys([...pairedMonkeys(), selection1, selection2]);
      setTimeout(() => setActiveMonkeys([]), 200); // clear selection
      correctSound.play();
    } else {
      setTimeout(() => setActiveMonkeys([]), 200); // clear selection
      incorrectSound.play();
    }

    if (score() === 10) {
      completeSound.play();
      setModalCompleteOpen(true);
      setTimerOn(false);
    }
  };

  const onReset = () => {
    setActiveMonkeys([]);
    setPairedMonkeys([]);
    setScore(0);
    setTime(0);
    setTimerOn(false);

    setMonkeys({
      shuffledMonkeys,
      groupedMonkeys1: shuffleArray(shuffledMonkeys).map((monkey) => {
        return { ...monkey, id: crypto.randomUUID() };
      }),
      groupedMonkeys2: shuffleArray(shuffledMonkeys).map((monkey) => {
        return { ...monkey, id: crypto.randomUUID() };
      }),
    });
  };

  return (
    <PlayContext.Provider
      value={{
        onImageClick,
        activeMonkeys,
        pairedMonkeys,
        isTimerOn,
        time,
        setTime,
        setTimerOn,
        onReset,
        monkeys,
        isModalCompleteOpen,
        setModalCompleteOpen,
        isModalWarningOpen,
        setModalWarningOpen,
      }}
    >
      {props.children}
    </PlayContext.Provider>
  );
};

export const usePlay = () => {
  return useContext(PlayContext);
};

export default PlayProvider;
