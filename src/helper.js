const pad = n => n < 10 ? '0' + n : n;
const formatTimestamp = (timestamp) => {
  const unixTimestamp = new Date(timestamp * 1000);
  const year = unixTimestamp.getFullYear();
  const month = unixTimestamp.getMonth() + 1;
  const day = unixTimestamp.getDate();
  const hour = unixTimestamp.getHours();
  const min = unixTimestamp.getMinutes();
  const sec = unixTimestamp.getSeconds();

  return `${year}-${pad(month + 1)}-${day} ${hour}:${min}:${pad(sec)}`;
};

export default {
  formatTimestamp,
}
