import { useSettings } from "provider/SettingsProvider";
import BACKGROUNDS from "const/backgrounds";
import PlayTimer from "./PlayTimer";
import MenuSettings from "./MenuSettings";
import MatchGrid from "./MatchGrid";

const RootLayout = () => {
  const { backgroundIndex, playerName, setModalFormOpen } = useSettings();

  return (
    <div
      style={`background-image: url(${BACKGROUNDS[backgroundIndex()].url})`}
      class={`relative h-screen bg-[url('assets/background-images/option${backgroundIndex()}.jpg')] bg-no-repeat bg-cover bg-center`}
    >
      <div class="mx-auto px-1 sm:px-4 container">
        <div class="absolute w-full left-0 px-3 sm:px-7 top-2 sm:top-3 flex items-start justify-between">
          <p
            class="text-sm sm:text-md font-light bg-white py-1 px-3 rounded leading-[20px]"
            role="button"
            onClick={setModalFormOpen}
          >
            Player:{" "}
            <strong class="font-medium text-secondary">{playerName()}</strong>
          </p>
          <MenuSettings />
        </div>
        <div class="pt-[60px] sm:pt-[78px] lg:pt-[88px] flex justify-center">
          <MatchGrid />
        </div>
      </div>
      <PlayTimer />
    </div>
  );
};

export default RootLayout;
