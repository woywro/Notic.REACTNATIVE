import { useCallback, useState } from "react";
import { Input, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Box, Button, Icon, Text, HStack, Checkbox } from "native-base";
import { db, auth } from "../../firebase/firebase";
import { useEffect } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { updateNote } from "../../utils/updateNote";
import { NoteInterface } from "../../interfaces/NoteInterface";
export const ShareNote = ({ navigation, route }) => {
  const { note } = route.params;
  const [groupValues, setGroupValues] = useState([]);
  const [sendOptions, setSendOptions] = useState([]);
  const [friends, setFriends] = useState([]);

  const getData = async () => {
    let newArray = [];
    const colRef = collection(db, "users");
    const snapshot = await getDocs(colRef);
    snapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
    newArray = newArray.filter((e) => e.uid !== auth.currentUser.uid);
    setFriends(newArray);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSendNote = async () => {
    const newArray = note.sharedWith.concat(groupValues);
    console.log(newArray);
    const isEditable = handleIsNoteEditable();
    updateNote(
      note,
      note.title,
      note.text,
      newArray,
      note.isPinned,
      note.color,
      note.reminder,
      isEditable
    );
    const docRef = doc(db, "notes", note.id);
    await updateDoc(docRef, {
      sharedWith: newArray,
      isEditable: isEditable,
    });
  };

  const handleIsNoteEditable = () => {
    if (sendOptions.includes("isEditable")) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box w="100%" h="100%" padding="20px">
      <Input
        placeholder="Search friends"
        variant="filled"
        margin="10px"
        borderRadius="10"
        py="1"
        px="2"
        placeholderTextColor="gray.100"
        _hover={{ bg: "gray.200", borderWidth: 0 }}
        borderWidth="0"
        InputLeftElement={
          <Icon
            ml="2"
            size="5"
            color="gray.500"
            as={<Ionicons name="ios-search" />}
          />
        }
      />
      <Checkbox.Group
        onChange={(e) => {
          setSendOptions(e);
        }}
        value={sendOptions}
      >
        <VStack justifyContent="center" w="100%">
          <Text>isEditable</Text>
          <Checkbox value={"isEditable"} marginLeft="20px" />
        </VStack>
      </Checkbox.Group>
      {friends.map((e) => {
        return (
          <HStack justifyContent="center">
            <Text>{e.username}</Text>
            <Checkbox.Group
              onChange={(e) => {
                setGroupValues(e);
              }}
              value={groupValues}
              accessibilityLabel="choose numbers"
            >
              <Checkbox value={e.uid} marginLeft="20px" />
            </Checkbox.Group>
          </HStack>
        );
      })}
      <Button
        position="absolute"
        width="100%"
        bottom="0"
        padding="20px"
        onPress={handleSendNote}
      >
        send
      </Button>
    </Box>
  );
};
