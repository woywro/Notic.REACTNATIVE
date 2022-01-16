import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
} from "native-base";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { user } from "../../../App";
import { useRecoilState, useResetRecoilState } from "recoil";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ErrorPopup } from "../../components/ErrorPopup";
import { useState, useEffect } from "react";
import { userDataInterface } from "../../interfaces/userDataInterface";

export const Login = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState<userDataInterface | {}>(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  navigation.setOptions({ headerShown: false });
  const auth = getAuth();

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
      setIsOpen(true);
    });
  };

  const getUserData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const snapshot = await getDoc(docRef);
    const res = snapshot.data();
    return res;
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const result = await getUserData();
        setUserData(result);
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  }, [auth]);

  return (
    <VStack space={2.5} px="3" height="100%" width="100%" padding="10px">
      <Center flex={1} px="3">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="2xl"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Login
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Please sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <Input
                onChangeText={(e) => setEmail(e)}
                placeholder="email"
                borderRadius="10px"
                padding="10px 20px"
              />
            </FormControl>
            <FormControl>
              <Input
                type="password"
                onChangeText={(e) => setPassword(e)}
                placeholder="password"
                borderRadius="10px"
                padding="10px 20px"
              />
            </FormControl>
            <Button
              mt="2"
              backgroundColor="yellow.500"
              onPress={() => signIn(email, password)}
            >
              Sign in
            </Button>
            <Button
              mt="2"
              backgroundColor="yellow.500"
              onPress={() => signIn("test@test.pl", "rrreee")}
            >
              test
            </Button>
            <Button
              mt="2"
              backgroundColor="yellow.500"
              onPress={() => signIn("woywro@gmail.com", "rrreee")}
            >
              woywro
            </Button>
          </VStack>
        </Box>
      </Center>
      <ErrorPopup
        title="login error"
        text={error}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </VStack>
  );
};
