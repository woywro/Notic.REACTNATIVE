import { Box, Text, VStack, Center } from "native-base";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../../firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { PrivateElement } from "./components/PrivateElement";
import { PrivateInterface } from "../../interfaces/PrivateInterface";

export const Privates = ({ navigation }) => {
  const [privatesRefs, setPrivatesRefs] = useState([]);

  const getPrivatesRef = async () => {
    const newArray: PrivateInterface[] = [];
    const q = query(
      collection(db, "privates"),
      where("to", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
    setPrivatesRefs(newArray);
  };

  useEffect(() => {
    getPrivatesRef();
  }, []);

  return (
    <VStack space={2.5} px="3" height="100%" width="100%">
      <Box>
        {privatesRefs.length !== 0 ? (
          privatesRefs.map((e) => {
            return (
              <PrivateElement
                priv={e}
                sender={e.from}
                noteId={e.note_id}
                navigation={navigation}
                setPrivatesRefs={setPrivatesRefs}
                privateRefs={privatesRefs}
              />
            );
          })
        ) : (
          <Center height="100%">
            <Text>There are no snap notes :(</Text>
          </Center>
        )}
      </Box>
    </VStack>
  );
};
