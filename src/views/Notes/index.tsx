import { StatusBar } from "expo-status-bar";
import { Box, Button } from "native-base";
import { Fab } from "native-base";
import { Icon, HStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { NotesList } from "./components/NotesList";
import { auth } from "../../firebase/firebase";
import { newNote } from "../../utils/newNote";
import { NoteItems } from "../../../App";
import { useRecoilState } from "recoil";
import { NoteInterface } from "../../interfaces/NoteInterface";

export const Notes = ({ navigation }) => {
  const [notes, setNotes] = useRecoilState<NoteInterface[]>(NoteItems);

  const handleAdd = () => {
    const note: NoteInterface = newNote(
      "",
      "",
      auth.currentUser.uid,
      "",
      "rgb(24, 255, 109)"
    );
    navigation.navigate("NoteDetails", { note: note });
  };

  return (
    <Box w="100%" background="#E5E5E5" alignItems={"center"}>
      <Fab
        position="absolute"
        size="sm"
        backgroundColor="yellow.500"
        onPress={handleAdd}
        renderInPortal={false}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
      />
      <NotesList navigation={navigation} />
      <StatusBar style="auto" />
    </Box>
  );
};
