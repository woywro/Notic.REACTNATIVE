import { Box, Text, Center, Button } from "native-base";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { StatusBar } from "expo-status-bar";
import { PrivateInterface } from "../../../../interfaces/PrivateInterface";

export const PrivateShow = ({ route, navigation }) => {
  const priv = route.params;

  const handleMarkAsSeen = async () => {
    await deleteDoc(doc(db, "privates", priv.id));
    priv.setPrivatesRefs(
      priv.privateRefs.filter((e: PrivateInterface) => e.private_id !== priv.id)
    );
    navigation.navigate("Privates");
  };

  const handleAdd = async () => {
    const random = Math.floor(Math.random() * 1000000).toString();

    await setDoc(doc(db, "privates", random), {
      from: "zQIWFPxcaCWHvLIT7OckgouB57W2",
      to: "TRiw2SaaaWear1oJmFyHPBHbLwE2",
      note_id: "605207",
      private_id: random,
    });
  };

  return (
    <Box width="100%" height="100%" background="red.100" padding="30px">
      <Center height="100%">
        <Text fontSize="xl" margin="10px">
          {priv.title}
        </Text>
        <Text>{priv.text}</Text>
        <Text>{priv.id}</Text>
        <Button onPress={() => handleMarkAsSeen()}>mark as seen</Button>
        <Button onPress={handleAdd}>dd</Button>
      </Center>
    </Box>
  );
};
