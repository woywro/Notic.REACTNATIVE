import { useCallback, useEffect, useState } from "react";
import { Box, TextArea, Input, Divider, Text } from "native-base";
import { updateNote } from "../../utils/updateNote";
import { useRecoilState } from "recoil";
import { NoteItems } from "../../../App";
import { updateDoc } from "firebase/firestore";
import { TimeConverter } from "../../utils/TimeConverter";
import { Actionsheet, useDisclose } from "native-base";
import { NoteMenu } from "./components/NoteMenu/";
import { auth } from "../../firebase/firebase";
import { setDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getTime } from "../../utils/getTime";
import { Ionicons } from "@expo/vector-icons";
import { VStack, HStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { NoteInterface } from "../../interfaces/NoteInterface";

export const NoteDetails = ({ route, navigation }) => {
  const [notes, setNotes] = useRecoilState<NoteInterface[]>(NoteItems);
  const { note } = route.params;
  const [noteText, setNoteText] = useState(note.text);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [pinned, setPinned] = useState(note.isPinned);
  const [color, setColor] = useState(note.color);
  const { isOpen, onOpen, onClose } = useDisclose();

  // useEffect(() => {
  //   navigation.setParams({
  //     note: notes.filter((e) => e.id == note.id)[0],
  //   });
  // }, [notes]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: color,
      },
      headerRight: () =>
        note.owner !== auth.currentUser.uid ? (
          <FontAwesome
            name="send-o"
            size={18}
            color="black"
            onPress={() => handleSaveNote()}
          />
        ) : (
          <AntDesign
            name="check"
            onPress={() => handleSaveNote()}
            size={24}
            color="black"
          />
        ),
    });
  }, [noteText, noteTitle, color, pinned, color, note]);

  const handleSaveNote = useCallback(() => {
    const newArray = notes.filter((e: NoteInterface) => e.id !== note.id);
    newArray.push(
      updateNote(
        note,
        noteTitle,
        noteText,
        note.sharedWith,
        pinned,
        color,
        note.reminder,
        note.isEditable
      )
    );
    setNotes(newArray);
    const noteRef = doc(db, "notes", note.id);
    updateDoc(noteRef, {
      text: noteText,
      title: noteTitle,
      isPinned: pinned,
      color: color,
      modification_timestamp: getTime(),
    });
    navigation.navigate("Notes");
  }, [pinned, color, noteTitle, noteText, note]);

  const handlePinNote = useCallback(() => {
    setPinned(!pinned);
    handleSaveNote();
  }, [pinned, note.isPinned]);

  return (
    <Box
      w="100%"
      h="100%"
      padding={5}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Input
        isDisabled={
          note.isEditable == false && note.owner !== auth.currentUser.uid
            ? true
            : false
        }
        isFullWidth
        fontWeight="bold"
        placeholder="Text Area Placeholder"
        variant="unstyled"
        fontSize="18px"
        value={noteTitle}
        onChangeText={(e) => setNoteTitle(e)}
      />
      <Divider my="2" bg={color} />
      <TextArea
        variant="unstyled"
        fontSize="16px"
        value={noteText}
        onChangeText={(e) => setNoteText(e)}
        isDisabled={
          note.isEditable == false && note.owner !== auth.currentUser.uid
            ? true
            : false
        }
      />
      {note.reminder !== "" && (
        <Text fontSize="xs">reminder: {TimeConverter(note.reminder)}</Text>
      )}
      <NoteMenu
        navigation={navigation}
        route={route}
        isOpen={isOpen}
        onClose={onClose}
        setPinned={setPinned}
        pinned={pinned}
        noteText={noteText}
        noteTitle={noteTitle}
        color={color}
        setColor={setColor}
      />
      {note.owner == auth.currentUser.uid && (
        <Box
          position="absolute"
          bottom="20px"
          borderRadius="10px"
          width="100%"
          padding="10px"
          shadow={3}
          bgColor={color}
        >
          <HStack justifyContent="space-between" alignItems="center">
            {pinned == true ? (
              <AntDesign
                name="pushpin"
                size={24}
                color="black"
                onPress={handlePinNote}
              />
            ) : (
              <AntDesign
                name="pushpino"
                size={24}
                color="black"
                onPress={handlePinNote}
              />
            )}
            <Text fontSize="xs">
              last modified: {TimeConverter(note.modification_timestamp)}
            </Text>
            <Ionicons name="menu" size={24} color="black" onPress={onOpen} />
          </HStack>
        </Box>
      )}
    </Box>
  );
};
