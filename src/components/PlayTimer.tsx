import { usePlay } from "provider/PlayProvider";
import formatTimer from "utils/format-timer";

const PlayTimer = () => {
  const { time, setTimerOn, isTimerOn, onReset } = usePlay();

  const formattedTimer = () => formatTimer(time());

  return (
    <div class="fixed flex items-center justify-between py-2 sm:py-3 bottom-0 bg-white left-[50%] w-[100%] translate-x-[-50%] pr-6 pl-2">
      <button
        class="btn btn-ghost hover:bg-transparent"
        onClick={() => {
          if (isTimerOn()) {
            onReset();
            return;
          }

          setTimerOn(true);
        }}
      >
        {isTimerOn() ? <IconPause /> : <IconPlay />}
      </button>
      <div class="flex gap-2">
        <p class="text-2xl sm:text-3xl min-w-[32px] sm:min-w-[41px]">
          {formattedTimer().hours}
        </p>
        <p class="text-2xl sm:text-3xl">:</p>
        <p class="text-2xl sm:text-3xl min-w-[32px] sm:min-w-[41px]">
          {formattedTimer().minutes}
        </p>
        <p class="text-2xl sm:text-3xl">:</p>
        <p class="text-2xl sm:text-3xl min-w-[32px] sm:min-w-[41px]">
          {formattedTimer().seconds}
        </p>
      </div>
    </div>
  );
};

const IconPlay = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width={1.5}
    stroke="currentColor"
    class="w-10 h-10 sm:w-12 sm:h-12"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
    />
  </svg>
);

const IconPause = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width={1.5}
    stroke="currentColor"
    class="w-8 h-8 sm:w-10 sm:h-10"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

export default PlayTimer;
