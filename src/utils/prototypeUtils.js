export const formatTime = (timestamp) => {
  const date = new Date(+timestamp);
  const fillZero = (str) => (str >= 10 ? str : `0${str}`);
  const [yyyy, MM, dd, HH, mm, ss] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ].map(fillZero);
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
};