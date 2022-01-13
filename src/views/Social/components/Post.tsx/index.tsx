import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { Box, HStack, Text, Button, Center } from "native-base";
import { generateIntroText } from "../../../../utils/generateIntroText";
import { TimeConverter } from "../../../../utils/TimeConverter";
import { Pressable } from "react-native";
import { useRecoilState } from "recoil";
import { NoteItems } from "../../../../../App";
import { newNote } from "../../../../utils/newNote";
import { Divider } from "native-base";
import { auth } from "../../../../firebase/firebase";

export const Post = ({ note, navigation }) => {
  const [notes, setNotes] = useRecoilState(NoteItems);
  const [username, setUsername] = useState("");
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    getPostOwner(note.owner);
  }, []);

  const getPostOwner = async (owner) => {
    const docRef = doc(db, "users", owner);
    const snapshot = await getDoc(docRef);
    const res = snapshot.data();
    setUsername(res.username);
  };

  const handleEditNote = () => {
    navigation.navigate("NoteDetails", { note: note });
  };

  const handleDuplicateNote = () => {
    const noteCopy = newNote(
      note.title,
      note.text,
      auth.currentUser.uid.toString(),
      note.reminder,
      note.color
    );
    setNotes([...notes, noteCopy]);
    setDoc(doc(db, "notes", noteCopy.id), noteCopy);
  };

  return (
    <Pressable onPress={() => setExpanded(!isExpanded)}>
      <Box borderRadius="10px" padding="10px" shadow={3} background="white">
        <HStack>
          <Text>{username}</Text>
          <Text>{TimeConverter(note.modification_timestamp)}</Text>
        </HStack>
        <Text bold>{note.title}</Text>
        <Divider my="2" bg={note.color} />
        {isExpanded == false ? (
          <Text>{generateIntroText(note.text)}</Text>
        ) : (
          <>
            <Text>{note.text}</Text>
            <Divider my="2" bg={note.color} />
            <HStack
              width="100%"
              justifyContent="space-around"
              alignItems="center"
            >
              {note.isEditable == true && (
                <Button onPress={handleEditNote} colorScheme={note.color}>
                  Edit Online
                </Button>
              )}
              <Button onPress={handleDuplicateNote} colorScheme={note.color}>
                Save to your notes
              </Button>
            </HStack>
          </>
        )}
        <Center marginTop="5px">
          <Text fontSize="xs">{`you and ${
            note.sharedWith.length - 1
          } more...`}</Text>
        </Center>
      </Box>
    </Pressable>
  );
};
