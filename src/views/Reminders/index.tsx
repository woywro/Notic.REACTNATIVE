import { useRecoilState } from "recoil";
import { NoteItems } from "../../../App";
import { VStack } from "native-base";
import { ReminderElement } from "./components/ReminderElement";
import { NoteInterface } from "../../interfaces/NoteInterface";
import { useEffect, useState } from "react";

export const Reminders = ({ navigation }) => {
  const [notes, setNotes] = useRecoilState(NoteItems);
  const [notesWithReminder, setNotesWithReminder] = useState([]);
  useEffect(() => {
    const notesWithReminder = notes
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
