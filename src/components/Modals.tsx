import { usePlay } from "provider/PlayProvider";
import { createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import formatTimer from "utils/format-timer";
import { useSettings } from "provider/SettingsProvider";
import useSaveRecord from "hooks/useSaveRecord";
import classNames from "classnames";
import type { Setter } from "solid-js";
import ScoreTable from "./ScoreTable";

export const ModalFormName = () => {
  const { isModalFormOpen, setModalFormOpen, playerName, setPlayerName } =
    useSettings();

  if (!playerName() || playerName().length <= 2) setModalFormOpen(true);

  const [isNameEmpty, setNameEmpty] = createSignal(false);

  return (
    <Portal>
      <input type="checkbox" class="modal-toggle" checked={isModalFormOpen()} />
      <div class="modal bg-primary/75">
        <div class="modal-box text-center">
          <h3 class="font-medium text-2xl mb-2 px-1 sm:px-6">
            Welcome to Pair Monkeys
          </h3>

          <p class="text-md font-light mb-6 max-w-[300px] mx-auto">
            Add your name to start playing matching photos of{" "}
            <strong class="font-medium text-secondary">
              mischievous siblings
            </strong>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (playerName().length <= 2) {
                setNameEmpty(true);
                return;
              }

              setModalFormOpen(false);
            }}
          >
            <input
              class="input input-primary block mx-auto font-light w-[230px] border-secondary"
              placeholder="Your name"
              value={playerName() || ""}
              onFocus={() => {
                if (isNameEmpty()) setNameEmpty(false);
              }}
              onInput={(e) => {
                setPlayerName(e.currentTarget.value);
              }}
            />
            {isNameEmpty() && (
              <p class="mt-2 text-sm text-error">
                The name must be at least 3 characters long
              </p>
            )}
            <button class="btn btn-warning mt-5 text-primary">Continue</button>
          </form>
        </div>
      </div>
    </Portal>
  );
};

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
          <h3 class="font-medium text-xl mb-4 px-1 sm:px-6">
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

  const { playerName } = useSettings();

  const { insertPlayerScore, isLoading, isSuccess, setSuccess } =
    useSaveRecord();

  const formattedTimer = () => formatTimer(time());

  return (
    <Portal>
      <input
        type="checkbox"
        class="modal-toggle"
        checked={isModalCompleteOpen()}
      />
      <div class="modal bg-primary/75">
        <div class="modal-box text-center relative">
          <h3 class="font-medium text-3xl mb-3">Excellent work!</h3>
          <p class="mb-6 text-xl">
            Your time is {formattedTimer().hours} : {formattedTimer().minutes} :{" "}
            {formattedTimer().seconds}
          </p>
          <div class="flex justify-center">
            <button
              onClick={() => {
                insertPlayerScore({
                  playerName: playerName,
                  score: time,
                });
                // onReset();
              }}
              class={classNames("btn btn-success text-primary", {
                loading: isLoading(),
              })}
            >
              Save Record
            </button>
          </div>
          <p
            class="text-sm sm:text-md underline mt-2 sm:mt-3"
            role="button"
            onClick={() => {
              setModalCompleteOpen(false);
              onReset();
            }}
          >
            Play again
          </p>
          {isSuccess() && <ModalSuccessRecordOverlay setSuccess={setSuccess} />}
        </div>
      </div>
    </Portal>
  );
};

const ModalSuccessRecordOverlay = (props: { setSuccess: Setter<boolean> }) => {
  const { setModalCompleteOpen, onReset } = usePlay();

  return (
    <div class="absolute w-full h-full top-0 left-0 bg-white p-6 flex justify-center items-center">
      <div>
        <h3 class="font-medium text-3xl mb-3">Record saved!</h3>
        <p class="mb-6 text-xl">View rank records in the top right menu</p>
        <div class="flex justify-center">
          <button
            onClick={() => {
              props.setSuccess(false);
              onReset();
              setModalCompleteOpen(false);
            }}
            class={classNames("btn btn-success text-primary")}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalScoreTable = () => {
  const { isModalRankRecordsOpen, setModalRankRecordsOpen } = useSettings();

  return (
    <Portal>
      <input
        type="checkbox"
        class="modal-toggle"
        checked={isModalRankRecordsOpen()}
      />
      <div class="modal bg-primary/75">
        <div class="modal-box text-center max-w-[750px]">
          <h3 class="font-medium text-3xl mb-3">Rank records</h3>
          <ScoreTable />
          <div class="flex justify-center mt-4">
            <button
              onClick={() => setModalRankRecordsOpen(false)}
              class="btn btn-warning text-primary"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
