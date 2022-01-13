import { useCallback, useState } from "react";
import { Button } from "native-base";
import { Input } from "native-base";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Radio, Box, TextArea, Divider } from "native-base";
import { newNote } from "../../utils/newNote";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NoteInterface } from "../../interfaces/NoteInterface";
import { useRecoilState } from "recoil";
import { NoteItems } from "../../../App";
import { UserData } from "../../../App";
import { auth } from "../../firebase/firebase";

interface Props {
  navigation: NativeStackNavigationProp;
}

export const CreateNote = ({ navigation }: Props) => {
  const [notes, setNotes] = useRecoilState(NoteItems);
  const [userData, setUserData] = useRecoilState(UserData);
  const [value, setValue] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [color, setColor] = useState("rgb(24, 255, 109)");

  const colors = [
    "rgb(108, 207, 246)",
    "rgb(24, 255, 109)",
    "rgb(255, 132, 232)",
    "rgb(127, 44, 203)",
    "rgb(87, 196, 229)",
  ];

  type noteList = NoteInterface[];

  const handleSubmit = () => {
    const note = newNote(
      noteTitle,
      noteText,
      auth.currentUser.uid.toString(),
      "",
      color
    );
    setNotes([...notes, note]);
    setDoc(doc(db, "notes", note.id), note);
    navigation.navigate("Notes");
  };
  return (
    <Box w="100%" h="100%" padding={5}>
      <Button.Group
        colorScheme="blue"
        mx={{
          base: "auto",
          md: 0,
        }}
        size="sm"
      >
        <Button>pin</Button>
        <Button onPress={() => navigation.navigate("ShareNote")}>share</Button>
        <Button onPress={handleSubmit}>save</Button>
      </Button.Group>
      <Radio.Group
        width="100%"
        justifyContent="space-around"
        flexDirection="row"
        name="myRadioGroup"
        accessibilityLabel="favorite number"
        value={color}
        onChange={(e) => {
          setColor(e);
        }}
      >
        {colors.map((e) => {
          return <Radio value={e} my={1} colorScheme={e} />;
        })}
      </Radio.Group>
      <Input
        isFullWidth
        fontWeight="bold"
        placeholder="Note Title"
        variant="unstyled"
        fontSize="18px"
        value={noteTitle}
        onChangeText={(e) => setNoteTitle(e)}
      />
      <Divider my="2" />
      <TextArea
        variant="unstyled"
        fontSize="16px"
        placeholder="Note Text"
        value={noteText}
        onChangeText={(e) => setNoteText(e)}
      />
    </Box>
  );
};
