import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileInfo?: boolean
}

function Profile({ showProfileInfo = true }: ProfileProps) {
  return (
    <Flex alignItems="center">
      <Box marginRight="1rem" textAlign="right">
        {
          showProfileInfo && (
            <>
              <Text fontSize="small">John Doe</Text>
              <Text color="gray.300" fontSize="xs">johndoe@gmail.com</Text>
            </>
          )
        }
      </Box>

      <Avatar size="sm" name="John Doe"></Avatar>
    </Flex>
  )
}

export default Profile