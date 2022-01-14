import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "native-base";
import {
  Radio,
  Select,
  Box,
  TextArea,
  Input,
  Divider,
  Text,
} from "native-base";
import { updateNote } from "../../../../utils/updateNote";
import { Modal } from "native-base";
import { useRecoilState } from "recoil";
import { NoteItems } from "../../../../../App";
import { auth, db } from "../../../../firebase/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Actionsheet, useDisclose } from "native-base";
import { Reminder } from "../../../../components/Reminder";
import { setDoc } from "firebase/firestore";
import { TimeConverter } from "../../../../utils/TimeConverter";
import { NoteInterface } from "../../../../interfaces/NoteInterface";

interface Props {
  navigation: any;
  route: any;
  isOpen: boolean;
  onClose: any;
  setPinned: any;
  pinned: boolean;
  noteText: string;
  noteTitle: string;
  color: string;
  setColor: any;
  reminder: string;
  setReminder: any;
}

export const NoteMenu = ({
  navigation,
  route,
  isOpen,
  onClose,
  setPinned,
  pinned,
  noteText,
  noteTitle,
  color,
  setColor,
  setReminder,
  reminder,
}: Props) => {
  const [notes, setNotes] = useRecoilState(NoteItems);
  const { note } = route.params;
  const [show, setShow] = useState(false);
  const [isEditable, setEditable] = useState(note.isEditable);

  const colors = [
    "rgb(10, 239, 255)",
    "rgb(190, 10, 255)",
    "rgb(20, 125, 245)",
    "rgb(242, 158, 76)",
    "rgb(88, 10, 255)",
  ];

  const handleDeleteReminder = () => {
    // setReminder("");
    const newArray = notes.filter((e) => e.id !== note.id);
    newArray.push(
      updateNote(
        note,
        note.title,
        note.text,
        note.sharedWith,
        note.isPinned,
        note.color,
        "",
        note.isEditable
      )
    );
    setNotes(newArray);
    const noteRef = doc(db, "notes", note.id);
    updateDoc(noteRef, {
      reminder: "",
    });
  };

  const handleSaveNote = () => {
    const newArray = notes.filter((e) => e.id !== note.id);
    newArray.push(
      updateNote(
        note,
        noteTitle,
        noteText,
        note.sharedWith,
        pinned,
        color,
        note.reminder,
        isEditable
      )
    );
    setNotes(newArray);
    const noteRef = doc(db, "notes", note.id);
    updateDoc(noteRef, {
      text: noteText,
      title: noteTitle,
      isPinned: pinned,
      color: color,
      isEditable: isEditable,
    });
    navigation.navigate("Notes");
  };

  const handleDeleteNote = useCallback(() => {
    const notesAfterDelete = notes.filter((e) => e.id !== note.id);
    setNotes(notesAfterDelete);
    const noteRef = doc(db, "notes", note.id);
    deleteDoc(noteRef);
    navigation.navigate("Notes");
  }, []);

  // const getPrivates = async () => {
  //   const docRef = doc(db, "users", "zQIWFPxcaCWHvLIT7OckgouB57W2");
  //   const snapshot = await getDoc(docRef);
  //   const res = snapshot.data();
  //   return res;
  // };

  const handleSendPrivate = useCallback(async () => {
    // const uid = "zQIWFPxcaCWHvLIT7OckgouB57W2";
    await setDoc(doc(db, "privates", "privateid123"), {
      from: auth.currentUser.uid,
      to: "zQIWFPxcaCWHvLIT7OckgouB57W2",
      note_id: note.id,
    });
  }, []);

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Text fontSize="xs">
            created: {TimeConverter(note.created_timestamp)}
          </Text>
          <Text fontSize="xs">
            last modified: {TimeConverter(note.modification_timestamp)}
          </Text>
          <Radio.Group
            width="100%"
            justifyContent="space-around"
            flexDirection="row"
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={color}
            onChange={(e) => {
              setColor(e);
            }}
          >
            {colors.map((e) => {
              return <Radio value={e} my={1} colorScheme={e} />;
            })}
          </Radio.Group>
          <Divider my="2" bg={color} />
          <Actionsheet.Item
            onPress={() => navigation.navigate("ShareNote", { note: note })}
          >
            Share
          </Actionsheet.Item>
          <Actionsheet.Item onPress={handleSendPrivate}>
            Send Private
          </Actionsheet.Item>
          {note.owner == auth.currentUser.uid && (
            <Actionsheet.Item onPress={handleDeleteNote}>
              Delete
            </Actionsheet.Item>
          )}
          {note.reminder == "" ? (
            <Actionsheet.Item onPress={() => setShow(!show)}>
              Reminder
            </Actionsheet.Item>
          ) : (
            <Actionsheet.Item onPress={handleDeleteReminder}>
              Delete Reminder
            </Actionsheet.Item>
          )}

          <Actionsheet.Item onPress={handleSaveNote}>Save</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Reminder
        route={route}
        show={show}
        setShow={setShow}
        // setReminder={setReminder}
      />
    </>
  );
};
