import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Box, Text, VStack, Center, Spinner } from "native-base";
import React from "react";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { Post } from "./components/Post.tsx";
import { NoteInterface } from "../../interfaces/NoteInterface";
export const Social = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [sharedWithUser, setSharedWithUser] = useState<NoteInterface[]>([]);
  const getSharedItems = async () => {
    const newArray: NoteInterface[] = [];
    const q = query(
      collection(db, "notes"),
      where("sharedWith", "array-contains", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
    setSharedWithUser(newArray);
  };

  useEffect(() => {
    getSharedItems().then(() => {
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Center width="100%" height="100%">
      <Spinner color="indigo.500" size="lg" />
    </Center>
  ) : (
    <VStack space={2.5} px="3" height="100%" width="100%" padding="10px">
      {sharedWithUser.length !== 0 ? (
        sharedWithUser.map((e) => {
          return <Post note={e} navigation={navigation} />;
        })
      ) : (
        <Center height="100%">
          <Text>There are no notes in your feed :(</Text>
        </Center>
      )}
      <StatusBar style="auto" />
    </VStack>
  );
};
