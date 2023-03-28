import { usePlay } from "provider/PlayProvider";
import { Portal } from "solid-js/web";
import formatTimer from "utils/format-timer";

export const ModalPlayWarning = () => {
  const { isModalWarningOpen, setModalWarningOpen } = usePlay();

  return (
    <Portal>
      <input
        type="checkbox"
        class="modal-toggle"
        checked={isModalWarningOpen()}
      />
      <div class="modal bg-primary/75">
        <div class="modal-box text-center">
          <h3 class="font-medium text-xl mb-4 px-6">
            To begin playing, click the play icon in the lower left corner.
          </h3>
          <div class="flex justify-center">
            <button
              onClick={() => setModalWarningOpen(false)}
              class="btn btn-warning text-primary"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export const ModalPlayComplete = () => {
  const { isModalCompleteOpen, setModalCompleteOpen, time, onReset } =
    usePlay();

  const formattedTimer = () => formatTimer(time());

  return (
    <Portal>
      <input
        type="checkbox"
        class="modal-toggle"
        checked={isModalCompleteOpen()}
      />
      <div class="modal bg-primary/75">
        <div class="modal-box text-center">
          <h3 class="font-medium text-3xl mb-3">Excellent work!</h3>
          <p class="mb-6 text-xl">
            Your time is {formattedTimer().hours} : {formattedTimer().minutes} :{" "}
            {formattedTimer().seconds}.
          </p>
          <div class="flex justify-center">
            <button
              onClick={() => {
                setModalCompleteOpen(false);
                onReset();
              }}
              class="btn btn-success text-primary"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
