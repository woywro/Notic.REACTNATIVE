import { Button, HStack, Text, Box } from "native-base";
import { db } from "../../../../firebase/firebase";
import { doc, getDoc, query, collection, where } from "firebase/firestore";
import { PrivateShow } from "../PrivateShow";
import { Pressable } from "native-base";
import { useEffect, useState } from "react";
import { PrivateInterface } from "../../../../interfaces/PrivateInterface";

interface Props {
  sender: string;
  noteId: string;
  navigation: any;
  priv: PrivateInterface;
  setPrivatesRefs: () => void;
  privateRefs: PrivateInterface[] | [];
}

export const PrivateElement = ({
  sender,
  noteId,
  navigation,
  priv,
  setPrivatesRefs,
  privateRefs,
}: Props) => {
  const [error, setError] = useState(false);

  const handleOpenPrivate = async () => {
    try {
      const ref = doc(db, "notes", priv.note_id);
      const snapshot = await getDoc(ref);
      const res = snapshot.data();
      navigation.navigate("PrivateShow", {
        title: res.title,
        text: res.text,
        color: res.color,
        id: priv.private_id,
        navigation: navigation,
        setPrivatesRefs: setPrivatesRefs,
        privateRefs: privateRefs,
      });
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Pressable onPress={handleOpenPrivate}>
      <Box shadow="3" background="white" padding="10px" margin="5px">
        <HStack>
          {error == true ? (
            <Text>This note has been removed</Text>
          ) : (
            <Text>{priv.from}</Text>
          )}
        </HStack>
      </Box>
    </Pressable>
  );
};
