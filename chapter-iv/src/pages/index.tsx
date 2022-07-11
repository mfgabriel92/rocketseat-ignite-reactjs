import { Heading, Divider, Flex, Stack, Button } from '@chakra-ui/react'
import Input from '../components/Form/Input'

function Home() {
  return (
    <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <Flex as="form" backgroundColor="gray.800" width="100%" maxWidth="22.5rem" padding="2rem" borderRadius="8px" flexDirection="column">
        <Heading alignSelf="center">Sign In</Heading>
        <Divider marginY="1rem" borderColor="gray.700" />
        <Stack spacing="0.5rem">
          <Input name="email" label="E-mail" />
          <Input name="password" type="password" label="Password" />
        </Stack>
        <Button type="submit" marginTop="1.5rem" colorScheme="pink">
          Enter
        </Button>
      </Flex>
    </Flex>
  )
}

export default Home
