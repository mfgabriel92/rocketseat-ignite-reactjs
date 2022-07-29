import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileInfo?: boolean;
  user: {
    name: string;
    email: string;
  };
}

function Profile({ showProfileInfo = true, user }: ProfileProps) {
  return (
    <Flex alignItems="center">
      <Box marginRight="1rem" textAlign="right">
        {showProfileInfo && (
          <>
            <Text fontSize="small">{user?.name}</Text>
            <Text color="gray.300" fontSize="xs">
              {user?.email}
            </Text>
          </>
        )}
      </Box>

      <Avatar size="sm" name={user?.name}></Avatar>
    </Flex>
  );
}

export default Profile;
