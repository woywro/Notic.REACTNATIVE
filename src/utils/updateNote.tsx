import { getTime } from "./getTime";
import { NoteInterface } from "../interfaces/NoteInterface";
export const updateNote = (
  beforeUpdate: NoteInterface,
  title: string,
  text: string,
  sharedWith: string[],
  isPinned: boolean,
  color: string,
  reminder: string,
  isEditable: boolean
) => {
  const updatedNote: NoteInterface = {
    id: beforeUpdate.id,
    title: title,
    text: text,
    created_timestamp: beforeUpdate.created_timestamp,
    modification_timestamp: getTime().toString(),
    owner: beforeUpdate.owner,
    sharedWith: sharedWith,
    isPinned: isPinned,
    color: color,
    reminder: reminder,
    isEditable: isEditable,
  };
  return updatedNote;
};
