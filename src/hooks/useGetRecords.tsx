import supabase from "lib/supabase";
import { useSettings } from "provider/SettingsProvider";
import { createSignal, createEffect } from "solid-js";

interface Record {
  created_at: string;
  id: number;
  player_name: string;
  time_record: number;
}

const useGetRecords = () => {
  const [isLoading, setLoading] = createSignal(false);
  const [data, setData] = createSignal<Record[]>();

  const { isModalRankRecordsOpen } = useSettings();

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from("records")
        .select()
        .order("time_record", { ascending: true });

      if (data) {
        const result = data as Record[];

        setData(result);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    if (isModalRankRecordsOpen()) fetchRecords();
  });

  return { isLoading, data };
};

export default useGetRecords;
