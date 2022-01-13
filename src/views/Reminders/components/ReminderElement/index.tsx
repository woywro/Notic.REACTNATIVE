import { Text, Box, HStack, Pressable } from "native-base";
import { TimeConverter } from "../../../../utils/TimeConverter";
import moment from "moment";
import { NoteInterface } from "../../../../interfaces/NoteInterface";

interface Props {
  note: NoteInterface;
  navigation: any;
}

export const ReminderElement = ({ note, navigation }: Props) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("NoteDetails", { note: note });
      }}
    >
      <Box
        margin="5px"
        padding="10px"
        borderRadius="10px"
        background="white"
        width="100%"
      >
        <HStack space={4} alignItems="center">
          <Box
            backgroundColor={note.color}
            width="10px"
            height="10px"
            borderRadius="50"
          ></Box>
          <Text bold>{note.title}</Text>
          <Text bold>
            {moment(TimeConverter(note.reminder), "DD/MM/YYYY hh:mm").fromNow()}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
};
