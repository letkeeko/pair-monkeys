import { createContext, createSignal, useContext } from "solid-js";
import { createStorageSignal } from "@solid-primitives/storage";
import type { JSXElement, Accessor, Setter } from "solid-js";

interface SettingsProviderProps {
  backgroundIndex: Accessor<number>;
  setBackgroundIndex: Setter<number>;
  onChangeBackground: () => void;
  isDropdownOpen: Accessor<boolean>;
  setDropdownOpen: Setter<boolean>;
  isModalFormOpen: Accessor<boolean>;
  setModalFormOpen: Setter<boolean>;
  playerName: Accessor<string>;
  setPlayerName: Setter<string>;
}

export const SettingsContext = createContext({} as SettingsProviderProps);

const SettingsProvider = (props: { children: JSXElement }) => {
  const [backgroundIndex, setBackgroundIndex] = createSignal(0);
  const [isDropdownOpen, setDropdownOpen] = createSignal(false);
  const [playerName, setPlayerName] = createStorageSignal("player", "");
  const [isModalFormOpen, setModalFormOpen] = createSignal(false);

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
        isModalFormOpen,
        setModalFormOpen,
        playerName,
        setPlayerName,
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
