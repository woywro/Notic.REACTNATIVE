import { getTime } from "./getTime";

export const newNote = (
  title: string,
  text: string,
  owner: string,
  reminder: string,
  color: string
) => {
  const random = Math.floor(Math.random() * 1000000).toString();
  const newNote = {
    id: random,
    title: title,
    text: text,
    created_timestamp: getTime().toString(),
    modification_timestamp: getTime().toString(),
    owner: owner,
    reminder: reminder,
    sharedWith: ["a", "b", "c", "d"],
    isPinned: false,
    color: color,
  };
  return newNote;
};
