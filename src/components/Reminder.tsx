import { View } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Platform } from "react-native";
import { useRecoilState } from "recoil";
import { NoteItems } from "../../App";
import { updateNote } from "../utils/updateNote";
import moment from "moment";
import { NoteInterface } from "../interfaces/NoteInterface";

type mode = "date" | "time";

export const Reminder = ({ route, show, setShow }) => {
  const [notes, setNotes] = useRecoilState(NoteItems);
  const { note } = route.params;
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [mode, setMode] = useState<mode>("date");

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode("time");
      setShow(Platform.OS !== "ios");
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === "ios");
      setMode("date");
      handleSetReminder(date, selectedTime);
    }
  };

  const formatDate = (date: Date, time: Date) => {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
  };

  const handleSetReminder = (date: Date, time: Date) => {
    const timestamp = moment(formatDate(date, time), "DD/MM/YYYY hh:mm")
      .valueOf()
      .toString();
    const newArray = notes.filter((e: NoteInterface) => e.id !== note.id);
    newArray.push(
      updateNote(
        note,
        note.title,
        note.text,
        note.sharedWith,
        note.isPinned,
        note.color,
        timestamp,
        note.isEditable
      )
    );
    setNotes(newArray);
    const noteRef = doc(db, "notes", note.id);
    updateDoc(noteRef, {
      reminder: timestamp,
    });
  };
  return (
    <View>
      {show && <DateTimePicker value={date} mode={mode} onChange={onChange} />}
    </View>
  );
};
