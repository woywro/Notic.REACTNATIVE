export interface NoteInterface {
  id: string;
  title: string;
  text: string;
  created_timestamp: string;
  modification_timestamp: string;
  owner: string;
  sharedWith: string[];
  isPinned: boolean;
  color: string;
  reminder: string;
  isEditable: boolean;
}
