import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Button } from "native-base";
import { Container, VStack, Flex, Center, Box } from "native-base";
import { Fab } from "native-base";
import { Icon, HStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Note } from "./Note";
import { useRecoilState } from "recoil";
import { NoteItems } from "../../../../App";
import { NoteItemsQuery } from "../../../../App";
import { useRecoilValue } from "recoil";
import { doc, deleteDoc } from "firebase/firestore";
import { Divider, Text } from "native-base";
import { db } from "../../../firebase/firebase";
import { ScrollView } from "native-base";
import { SimpleGrid } from "native-base";

export const NotesList = ({ navigation }) => {
  const [notes, setNotes] = useRecoilState(NoteItems);
  // const [notesSorted, setNotesSorted] = useState([]);
  const [listEditMode, setListEditMode] = useState(false);
  const [groupValues, setGroupValues] = useState([]);
  const notesFetched = useRecoilValue(NoteItemsQuery);

  useEffect(() => {
    const sorted = JSON.parse(JSON.stringify(notesFetched)).sort((a, b) => {
      return b.created_timestamp - a.created_timestamp;
    });
    setNotes(sorted);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        listEditMode && (
          <HStack width="50%" alignItems="center" justifyContent="space-around">
            <Button onPress={() => handleDeleteEditMode()} size="lg">
              delete
            </Button>
            <Button onPress={() => setListEditMode(false)} size="lg">
              x
            </Button>
          </HStack>
        ),
    });
  }, [listEditMode, groupValues]);

  // useEffect(() => {
  //   const sorted = JSON.parse(JSON.stringify(notes)).sort((a, b) => {
  //     return a.created_timestamp - b.created_timestamp;
  //   });
  //   setNotes(sorted);
  // }, [notes]);

  const handleDeleteEditMode = useCallback(() => {
    const afterDelete = notes.filter((e) => !groupValues.includes(e.id));
    setNotes(afterDelete);
    const toDelete = notes.filter((e) => groupValues.includes(e.id));
    toDelete.forEach((element) => {
      deleteDoc(doc(db, "notes", element.id));
    });
    setListEditMode(false);
  }, [groupValues, listEditMode]);

  return (
    <VStack space={2.5} px="3" height="100%" width="100%">
      {notes.length !== 0 ? (
        <ScrollView>
          {notes.map((e) => {
            return (
              e.isPinned == true && (
                <Note
                  setListEditMode={setListEditMode}
                  listEditMode={listEditMode}
                  setGroupValues={setGroupValues}
                  groupValues={groupValues}
                  note={e}
                  navigation={navigation}
                />
              )
            );
          })}
          <Divider my={2} />
          {notes.map((e) => {
            return (
              e.isPinned == false && (
                <Note
                  setListEditMode={setListEditMode}
                  listEditMode={listEditMode}
                  setGroupValues={setGroupValues}
                  groupValues={groupValues}
                  note={e}
                  navigation={navigation}
                />
              )
            );
          })}
        </ScrollView>
      ) : (
        <Center height="100%">
          <Text>You don't have any note</Text>
        </Center>
      )}
    </VStack>
  );
};
