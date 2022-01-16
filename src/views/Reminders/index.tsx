import { useRecoilState } from "recoil";
import { NoteItems } from "../../../App";
import { VStack } from "native-base";
import { ReminderElement } from "./components/ReminderElement";
import { useEffect, useState } from "react";
import { NoteInterface } from "../../interfaces/NoteInterface";

export const Reminders = ({ navigation }) => {
  const [notes, setNotes] = useRecoilState(NoteItems);
  const [notesWithReminder, setNotesWithReminder] = useState<NoteInterface[]>(
    []
  );
  useEffect(() => {
    const notesWithReminder: NoteInterface[] = notes
      .filter((e: NoteInterface) => e.reminder !== "")
      .sort((a: any, b: any) => a.reminder - b.reminder);
    setNotesWithReminder(notesWithReminder);
  }, [notes]);

  return (
    <VStack space={2.5} px="3" height="100%" width="100%">
      {notesWithReminder.map((e) => {
        return <ReminderElement note={e} navigation={navigation} />;
      })}
    </VStack>
  );
};
