import type { Component } from "solid-js";
import RootLayout from "./components/RootLayout";
import SettingsProvider from "provider/SettingsProvider";
import PlayProvider from "provider/PlayProvider";
import {
  ModalPlayWarning,
  ModalPlayComplete,
  ModalFormName,
  ModalScoreTable,
} from "components/Modals";

const App: Component = () => {
  return (
    <SettingsProvider>
      <PlayProvider>
        <RootLayout />
        <ModalPlayWarning />
        <ModalPlayComplete />
        <ModalFormName />
        <ModalScoreTable />
      </PlayProvider>
    </SettingsProvider>
  );
};

export default App;
