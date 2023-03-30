import { For } from "solid-js";
import formatTimer from "utils/format-timer";
import dayjs from "dayjs";
import useGetRecords from "hooks/useGetRecords";

const ScoreTable = () => {
  const { data: recordsData, isLoading } = useGetRecords();

  if (isLoading()) return <h2 class="text-lg mb-6 text-center">Loading...</h2>;

  return (
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recordsData() && (
            <For each={recordsData()}>
              {(record, index) => {
                const formattedTimer = () => formatTimer(record.score);

                const formattedDate = () =>
                  dayjs(record.created_at).format("MMM D, YYYY");

                return (
                  <tr>
                    <th>{index() + 1}</th>
                    <td>{record.player_name}</td>
                    <td>
                      {formattedTimer().hours}
                      {" : "}
                      {formattedTimer().minutes}
                      {" : "}
                      {formattedTimer().seconds}
                    </td>
                    <td>{formattedDate()}</td>
                  </tr>
                );
              }}
            </For>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
