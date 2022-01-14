import { Box, Center, Pressable, Text, Checkbox, HStack } from "native-base";
import { auth } from "../../../firebase/firebase";
import { TimeConverter } from "../../../utils/TimeConverter";
import { doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { useCallback, useEffect } from "react";
export const Note = ({
  note,
  navigation,
  setListEditMode,
  listEditMode,
  setGroupValues,
  groupValues,
}) => {
  const getOwnerData = async () => {
    if (note.owner !== auth.currentUser.uid) {
      const newArray = [];
      const docRef = doc(db, "users", note.owner);
      const snapshot = await getDocs(docRef);
      snapshot.forEach((doc) => {
        newArray.push(doc.data());
      });
    }
  };
  getOwnerData();

  const generateIntroText = useCallback((text) => {
    return `${text.split(" ").splice(0, 15).join(" ")}...`;
  }, []);

  useEffect(() => {
    // navigation.setParams({
    //   note: note,
    // });
    console.log(note);
  }, [note]);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("NoteDetails", { note: note });
      }}
      onLongPress={() => {
        setListEditMode(true);
      }}
    >
      <Box margin="5px" padding="10px" borderRadius="10px" background="white">
        {listEditMode == true && note.owner == auth.currentUser.uid && (
          <Checkbox.Group
            onChange={(e) => {
              setGroupValues(e);
            }}
            value={groupValues}
          >
            <Checkbox value={note.id} colorScheme={note.color} my={2} />
          </Checkbox.Group>
        )}
        <HStack space={4} alignItems="center">
          <Box
            backgroundColor={note.color}
            width="10px"
            height="10px"
            borderRadius="50"
          ></Box>
          <Text bold>{note.title}</Text>
        </HStack>
        <Text>{generateIntroText(note.text)}</Text>
        {note.reminder !== "" && (
          <HStack
            justifyContent="flex-start"
            alignItems="center"
            position="absolute"
            top="1"
            right="1"
          >
            <FontAwesome name="bell" size={12} color="black" />
            <Text bold marginLeft="5px">
              {moment(
                TimeConverter(note.reminder),
                "DD/MM/YYYY hh:mm"
              ).fromNow()}
            </Text>
          </HStack>
        )}
        {note.isPinned && <Text bold>pin</Text>}
        {note.owner !== auth.currentUser.uid && (
          <HStack justifyContent="space-around" alignItems="center" w="40%">
            <FontAwesome name="user" size={12} color="black" />
            <Text>shared with you</Text>
          </HStack>
        )}
      </Box>
    </Pressable>
  );
};
