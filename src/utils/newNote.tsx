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
    createdTimestamp: getTime().toString(),
    modificationTimestamp: getTime().toString(),
    owner: owner,
    reminder: reminder,
    sharedWith: [],
    isPinned: false,
    color: color,
    isEditable: false,
  };
  return newNote;
};
