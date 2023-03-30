import type { Component } from "solid-js";
import { useSettings } from "provider/SettingsProvider";

const MenuSettings: Component = () => {
  const {
    onChangeBackground,
    isDropdownOpen,
    setDropdownOpen,
    setModalRankRecordsOpen,
  } = useSettings();

  return (
    <div class="text-primary relative right-0">
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen())}
        class="btn btn-sm sm:btn-md btn-circle bg-white text-primary hover:bg-primary hover:text-white"
      >
        <IconMenu />
      </button>
      {isDropdownOpen() && (
        <div class="bg-white rounded-md font-light p-3 absolute top-[35px] sm:top-[50px] right-0 z-10 shadow-md w-[190px] sm:w-[200px]">
          <button
            class="btn btn-sm sm:btn-md btn-outline whitespace-pre font-normal w-full"
            onClick={onChangeBackground}
          >
            Change Map
          </button>
          <button
            class="btn gap-2 btn-sm sm:btn-md btn-outline whitespace-pre font-normal w-full mt-3"
            onClick={() => setModalRankRecordsOpen(true)}
          >
            <IconTrophy />
            Rank Records
          </button>
        </div>
      )}
    </div>
  );
};

const IconTrophy: Component = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width={1.5}
    stroke="currentColor"
    class="w-4 h-4 sm:w-5 sm:h-5"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
    />
  </svg>
);

const IconMenu: Component = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width={1.75}
    stroke="currentColor"
    class="w-5 h-5 sm:w-8 sm:h-8"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

export default MenuSettings;
