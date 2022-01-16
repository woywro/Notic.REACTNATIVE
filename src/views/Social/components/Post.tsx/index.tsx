import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { Box, HStack, Text, Button, Center, VStack } from "native-base";
import { generateIntroText } from "../../../../utils/generateIntroText";
import { TimeConverter } from "../../../../utils/TimeConverter";
import { Pressable } from "react-native";
import { useRecoilState } from "recoil";
import { NoteItems } from "../../../../../App";
import { newNote } from "../../../../utils/newNote";
import { Divider } from "native-base";
import { auth } from "../../../../firebase/firebase";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { NoteInterface } from "../../../../interfaces/NoteInterface";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const Post = ({ note, navigation }) => {
  const [notes, setNotes] = useRecoilState<NoteInterface[]>(NoteItems);
  const [username, setUsername] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

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
    const noteCopy: NoteInterface = newNote(
      note.title,
      note.text,
      auth.currentUser.uid.toString(),
      note.reminder,
      note.color
    );
    const withDuplicated: NoteInterface[] = [...notes, noteCopy];
    setNotes(withDuplicated);
    setDoc(doc(db, "notes", noteCopy.id), noteCopy);
    setSaved(true);
  };

  return (
    <Pressable onPress={() => setExpanded(!isExpanded)}>
      <Box padding="10px" background="white">
        <HStack
          width="100%"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <VStack justifyContent="flex-end">
            <Text fontSize="md" fontWeight="bold" marginRight="5px">
              {username}
            </Text>
            <Text fontSize="xs">
              {moment(
                TimeConverter(note.modification_timestamp),
                "DD/MM/YYYY hh:mm"
              ).fromNow()}
            </Text>
          </VStack>
          <Text fontSize="xs">{`you and ${
            note.sharedWith.length - 1
          } more...`}</Text>
        </HStack>
        <Box
          borderRadius="10px"
          padding="10px"
          margin="5px"
          background="white"
          shadow={1}
          minHeight="150px"
        >
          <Text bold fontSize="xl">
            {note.title}
          </Text>
          <Divider my="2" bg={note.color} />
          {isExpanded == false ? (
            <Text>{generateIntroText(note.text)}</Text>
          ) : (
            <>
              <Text>{note.text}</Text>
              {note.isEditable == false && (
                <HStack width="100%" justifyContent="center" marginTop="10px">
                  <FontAwesome name="lock" size={15} color="black" />
                  <Text fontSize="xs">You can't modify this note</Text>
                </HStack>
              )}
            </>
          )}
        </Box>
        <HStack
          width="100%"
          justifyContent="space-around"
          alignItems="center"
          margin="10px"
        >
          {note.isEditable == true && (
            <Feather
              name="edit"
              size={24}
              color={note.color}
              onPress={handleEditNote}
            />
          )}
          <Ionicons
            name={saved ? "cloud-download" : "cloud-download-outline"}
            size={24}
            color={note.color}
            onPress={handleDuplicateNote}
            disabled={saved}
          />
        </HStack>
      </Box>
      <Divider my="1" />
    </Pressable>
  );
};
