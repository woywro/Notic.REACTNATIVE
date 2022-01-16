import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Box, Text, VStack, Center, Spinner, Button } from "native-base";
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
import { NoteInterface } from "../../interfaces/NoteInterface";
import { user } from "../../../App";
import { useRecoilState, useResetRecoilState } from "recoil";
import { UserCard } from "./components/userCard";

export const Account = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState(user);
  console.log(userData);

  return (
    <VStack space={2.5} px="3" height="100%" width="100%" padding="10px">
      <UserCard username={userData.username} />
      <Button onPress={() => auth.signOut()}>sign out</Button>
      <StatusBar style="auto" />
    </VStack>
  );
};
