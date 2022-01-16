import { Box, HStack, Text, VStack } from "native-base";
export const UserCard = ({ username }) => {
  return (
    <Box background="white" shadow={3} borderRadius="10px" padding="20px">
      <HStack justifyContent="center" alignItems="flex-end" width="20%">
        <Text fontSize="2xl" bold marginRight="10px">
          Hi
        </Text>
        <Text fontSize="xl">{username}</Text>
      </HStack>
    </Box>
  );
};
