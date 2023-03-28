const formatTimer = (value: number) => {
  let hours = ("0" + Math.floor((value / 60000) % 60)).slice(-2);
  let minutes = ("0" + Math.floor((value / 1000) % 60)).slice(-2);
  let seconds = ("0" + ((value / 10) % 100)).slice(-2);

  return { hours, minutes, seconds };
};

export default formatTimer;
