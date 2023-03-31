import { createContext, createSignal, useContext } from "solid-js";
import { createStorageSignal } from "@solid-primitives/storage";
import type { JSXElement, Accessor, Setter } from "solid-js";

interface SettingsProviderProps {
  backgroundIndex: Accessor<number | null>;
  setBackgroundIndex: Setter<number>;
  onChangeBackground: () => void;
  isDropdownOpen: Accessor<boolean>;
  setDropdownOpen: Setter<boolean>;
  isModalFormOpen: Accessor<boolean>;
  setModalFormOpen: Setter<boolean>;
  playerName: Accessor<string | null>;
  setPlayerName: Setter<string>;
  isModalRankRecordsOpen: Accessor<boolean>;
  setModalRankRecordsOpen: Setter<boolean>;
}

export const SettingsContext = createContext({} as SettingsProviderProps);

const SettingsProvider = (props: { children: JSXElement }) => {
  const [backgroundIndex, setBackgroundIndex] = createStorageSignal(
    "background",
    1
  );
  const [isDropdownOpen, setDropdownOpen] = createSignal(false);
  const [playerName, setPlayerName] = createStorageSignal("player", "");
  const [isModalFormOpen, setModalFormOpen] = createSignal(false);
  const [isModalRankRecordsOpen, setModalRankRecordsOpen] = createSignal(false);

  const onChangeBackground = () => {
    if (backgroundIndex() === 11) {
      setBackgroundIndex(0);
      return;
    }

    setBackgroundIndex(Number(backgroundIndex()!) + 1); // ensure transform to a number, value from localStorage
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
        isModalRankRecordsOpen,
        setModalRankRecordsOpen,
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
