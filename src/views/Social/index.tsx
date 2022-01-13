import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Box, Text, VStack, Center } from "native-base";
import { useRecoilState } from "recoil";
import { NoteItems } from "../../../App";
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
export const Social = ({ navigation }) => {
  const [sharedWithUser, setSharedWithUser] = useState([]);
  const getSharedItems = async () => {
    const newArray = [];
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
    getSharedItems();
  }, []);

  return (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
