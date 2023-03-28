import { useSettings } from "provider/SettingsProvider";
import BACKGROUNDS from "const/backgrounds";
import PlayTimer from "./PlayTimer";
import MenuSettings from "./MenuSettings";
import MatchGrid from "./MatchGrid";

const RootLayout = () => {
  const { backgroundIndex } = useSettings();

  return (
    <div
      style={`background-image: url(${BACKGROUNDS[backgroundIndex()].url})`}
      class={`relative h-screen bg-[url('assets/background-images/option${backgroundIndex()}.jpg')] bg-no-repeat bg-cover bg-center`}
    >
      <div class="mx-auto px-1 sm:px-4 container">
        <div>
          <div class="absolute right-3 sm:right-10 md:right-20 top-4">
            <MenuSettings />
          </div>
          <div class="pt-[60px] sm:pt-[78px] lg:pt-[88px] flex justify-center">
            <MatchGrid />
          </div>
        </div>
      </div>
      <PlayTimer />
    </div>
  );
};

export default RootLayout;
