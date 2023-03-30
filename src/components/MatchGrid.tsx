import { Component } from "solid-js";
import { For } from "solid-js";
import { usePlay } from "provider/PlayProvider";
import classNames from "classnames";
import overlayMonkey from "assets/pair-monkeys.svg";
import type { Monkey } from "provider/PlayProvider";

const MatchGrid: Component = () => {
  const { monkeys, onImageClick, pairedMonkeys, activeMonkeys } = usePlay();

  const isDisableClick = () => activeMonkeys().length === 2;

  return (
    <div class="grid grid-cols-4 md:grid-cols-5 bg-white p-1 gap-1 sm:p-3 sm:gap-3">
      <For each={monkeys().groupedMonkeys1}>
        {(monkey) => (
          <button
            class={classNames(
              "relative max-w-[150px] border-[1px] active:scale-95 duration-75 min-h-[60px]",
              {
                "pointer-events-none":
                  isDisableClick() ||
                  !!pairedMonkeys().find((m) => m.id === monkey.id) ||
                  !!activeMonkeys().find((m) => m.id === monkey.id),
              }
            )}
            onClick={() => onImageClick(monkey)}
          >
            <img src={monkey.imageSrc} alt="Card" />
            <div
              class={classNames(
                "absolute flex justify-center items-center origin-top-left bg-white top-0 left-0 w-full h-full duration-100",
                {
                  "scale-x-0": doesImageActive(
                    activeMonkeys,
                    pairedMonkeys,
                    monkey
                  ),
                }
              )}
            >
              <img
                src={overlayMonkey}
                class="max-w-[70px] md:max-w-[100px]"
                alt="Monkey"
              />
            </div>
          </button>
        )}
      </For>
      <For each={monkeys().groupedMonkeys2}>
        {(monkey) => (
          <button
            class={classNames(
              "relative max-w-[150px] border-[1px] active:scale-95 duration-75 min-h-[60px]",
              {
                "pointer-events-none":
                  isDisableClick() ||
                  !!pairedMonkeys().find((m) => m.id === monkey.id) ||
                  !!activeMonkeys().find((m) => m.id === monkey.id),
              }
            )}
            onClick={() => onImageClick(monkey)}
          >
            <img src={monkey.imageSrc} alt="Card" />
            <div
              class={classNames(
                "absolute flex justify-center items-center origin-top-left bg-white top-0 left-0 w-full h-full duration-100",
                {
                  "scale-x-0": doesImageActive(
                    activeMonkeys,
                    pairedMonkeys,
                    monkey
                  ),
                }
              )}
            >
              <img
                src={overlayMonkey}
                class="max-w-[70px] md:max-w-[100px]"
                alt="Monkey"
              />
            </div>
          </button>
        )}
      </For>
    </div>
  );
};

const doesImageActive = (
  activeMonkeys: () => Monkey[],
  pairedMonkeys: () => Monkey[],
  monkey: Monkey
) => {
  return (
    !!activeMonkeys().find((cur) => cur.id === monkey.id) ||
    !!pairedMonkeys().find((cur) => cur.id === monkey.id)
  );
};

export default MatchGrid;
