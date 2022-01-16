export interface NoteInterface {
  id: string;
  title: string;
  text: string;
  createdTimestamp: string;
  modificationTimestamp: string;
  owner: string;
  sharedWith: string[];
  isPinned: boolean;
  color: string;
  reminder: string;
  isEditable: boolean;
}
