import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Container, VStack, Flex, Center, Box, Button } from "native-base";
import { Fab } from "native-base";
import { Icon, HStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { NotesList } from "./components/NotesList";
import { auth } from "../../firebase/firebase";
import { useRecoilState } from "recoil";
import { UserData } from "../../../App";
import { NoteItems } from "../../../App";

export const Notes = ({ navigation }) => {
  // const [notes, setNotes] = useRecoilState(NoteItems);
  const handleAdd = useCallback(() => {
    navigation.navigate("createNote");
  }, []);
  // const logout = () => {
  //   auth.signOut();
  //   setNotes([]);
  //   navigation.navigate("Login");
  // };
  return (
    <Box w="100%" background="#E5E5E5" alignItems={"center"}>
      {/* <Button onPress={logout}>logout</Button> */}
      <Fab
        position="absolute"
        size="sm"
        onPress={handleAdd}
        renderInPortal={false}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
      />
      <NotesList navigation={navigation} />

      <StatusBar style="auto" />
    </Box>
  );
};
