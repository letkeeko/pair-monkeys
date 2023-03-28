import { createContext, createSignal, useContext } from "solid-js";
import type { JSXElement, Accessor, Setter } from "solid-js";

interface SettingsProviderProps {
  backgroundIndex: Accessor<number>;
  setBackgroundIndex: Setter<number>;
  onChangeBackground: () => void;
  isDropdownOpen: Accessor<boolean>;
  setDropdownOpen: Setter<boolean>;
  level: Accessor<LevelOption>;
  setLevel: Setter<LevelOption>;
}

export enum LevelOption {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export const SettingsContext = createContext({} as SettingsProviderProps);

const SettingsProvider = (props: { children: JSXElement }) => {
  const [backgroundIndex, setBackgroundIndex] = createSignal(0);
  const [isDropdownOpen, setDropdownOpen] = createSignal(false);
  const [level, setLevel] = createSignal(LevelOption.Medium);

  const onChangeBackground = () => {
    if (backgroundIndex() === 11) {
      setBackgroundIndex(0);
      return;
    }
    setBackgroundIndex(backgroundIndex() + 1);
  };

  return (
    <SettingsContext.Provider
      value={{
        backgroundIndex,
        setBackgroundIndex,
        onChangeBackground,
        isDropdownOpen,
        setDropdownOpen,
        level,
        setLevel,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};

export default SettingsProvider;
