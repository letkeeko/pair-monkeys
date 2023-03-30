import supabase from "lib/supabase";
import { createSignal } from "solid-js";
import type { Accessor } from "solid-js";

const useSaveRecord = () => {
  const [isLoading, setLoading] = createSignal(false);
  const [isSuccess, setSuccess] = createSignal(false);

  const insertPlayerScore = async ({
    playerName,
    score,
  }: {
    playerName: Accessor<string>;
    score: Accessor<number>;
  }) => {
    try {
      setLoading(true);
      const { status } = await supabase
        .from("records")
        .insert({ player_name: playerName(), score: score() });

      if (status === 200 || status === 201) setSuccess(true);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { insertPlayerScore, isLoading, isSuccess, setSuccess };
};

export default useSaveRecord;
