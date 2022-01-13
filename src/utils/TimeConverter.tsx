import moment from "moment";
export const TimeConverter = (timestamp: string) => {
  const time = moment(parseInt(timestamp)).format("DD/MM/YYYY hh:mm");
  return time;
};
