import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/views/Home";
import { CreateNote } from "./src/views/CreateNote";
import { NativeBaseProvider, Box } from "native-base";
import { useState } from "react";
import { ShareNote } from "./src/views/ShareNote";
import { NoteDetails } from "./src/views/NoteDetails";
import { Login } from "./src/views/Login";
import { db } from "./src/firebase/firebase";
import { auth } from "./src/firebase/firebase";
import { Notes } from "./src/views/Notes";
import { Privates } from "./src/views/Privates";
import { PrivateShow } from "./src/views/Privates/components/PrivateShow";
import { Spinner } from "native-base";
import { Center } from "native-base";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import React from "react";
import { Button } from "native-base";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const NoteItems = atom({
  key: "NoteItems",
  default: [],
});
export const UserData = atom({
  key: "UserData",
  default: { uid: "" },
});

export const NoteItemsQuery = selector({
  key: "NoteItemsQuery",
  get: async ({ get }) => {
    const newArray = [];
    const q = query(
      collection(db, "notes"),
      where("owner", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
    return newArray;
  },
});

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <RecoilRoot>
        <React.Suspense
          fallback={
            <Center width="100%" height="100%">
              <Spinner color="indigo.500" size="lg" />
            </Center>
          }
        >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={Home}
              />
              <Stack.Screen name="createNote" component={CreateNote} />
              <Stack.Screen name="ShareNote" component={ShareNote} />
              <Stack.Screen
                name="PrivateShow"
                options={{ headerShown: false }}
                component={PrivateShow}
              />
              <Stack.Screen
                name="NoteDetails"
                component={NoteDetails}
                options={{ title: "" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </React.Suspense>
      </RecoilRoot>
    </NativeBaseProvider>
  );
}
