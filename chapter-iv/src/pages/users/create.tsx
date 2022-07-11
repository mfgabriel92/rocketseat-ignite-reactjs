import { Box, Button, Divider, Flex, Heading, Icon, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { RiArrowLeftLine, RiCheckLine } from 'react-icons/ri'
import Input from '../../components/Form/Input'
import Header from '../../components/Layout/Header'
import Sidebar from '../../components/Layout/Sidebar'

function CreateUser() {
  return (
    <Box>
      <Header />
      <Flex width="100%" flex="1">
        <Sidebar />
        <Box flex="1" borderRadius="8px" padding="1rem">
          <Heading size="lg" fontWeight="normal">Create user</Heading>
          <Divider marginY="1.5rem" borderColor="gray.700" />
          <VStack spacing="1rem">
            <SimpleGrid minChildWidth="14rem" spacing="0.5rem" width="100%" height="fit-content">
              <Input label="Full name" name="name" />
              <Input label="E-mail" name="email" type="email" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="14rem" spacing="0.5rem" width="100%" height="fit-content">
              <Input label="Password" name="password" type="password" />
              <Input label="Confirm password" name="confirmPassword" type="password" />
            </SimpleGrid>
          </VStack>
          <Flex marginTop="1rem">
            <Stack spacing="1rem" width="100%" direction={['column-reverse', 'row']}>
              <Link href="/dashboard/users" passHref>
                <Button as="a" backgroundColor="gray.700" leftIcon={<Icon as={RiArrowLeftLine} />}>
                Cancel
                </Button>
              </Link>
              <Button colorScheme="pink" leftIcon={<Icon as={RiCheckLine} />}>
                Save
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateUser