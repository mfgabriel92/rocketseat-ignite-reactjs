import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, HStack, useBreakpointValue } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from 'react-icons/ri'
import Header from '../../components/Layout/Header'
import Pagination from '../../components/Layout/Pagination'
import Sidebar from '../../components/Layout/Sidebar'

interface UsersProps {
  users: {
    id: number,
    name: string,
    email: string
  }[]
}

function Users({ users }: UsersProps) {
  const isWideScreen = useBreakpointValue({ base: false, lg: true })
  
  return (
    <Box>
      <Header />
      <Flex width="100%" flex="1">
        <Sidebar />
        <Box flex="1" borderRadius="8px" padding="1rem">
          <Flex marginBottom="1rem" justifyContent="space-between" alignItems="center">
            <Heading size="lg" fontWeight="normal">Users</Heading>
            <Link href="/dashboard/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" cursor="pointer" leftIcon={<Icon as={RiAddLine} />}>New</Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th paddingX={['0.5rem', '1rem', '1.5rem']} width={['1rem', '1rem', '2rem']} color="gray.300">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>User</Th>
                { isWideScreen && <Th>Registered at</Th> }
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                users?.map(user => (
                  <Tr key={user.id}>
                    <Td paddingX={['0.5rem', '1rem', '1.5rem']}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td paddingX={['0.5rem', '1rem', '1.5rem']}>
                      <Box>
                        <Text fontWeight="bold" fontSize={['xs', 'xs', 'sm']}>{user.name}</Text>
                        <Text fontSize={['xs', 'xs', 'sm']} color="gray.300">{user.email}</Text>
                      </Box>
                    </Td>
                    {
                      isWideScreen && (
                        <Td>
                          April 04, 2021
                        </Td>
                      )
                    }
                    <Td paddingX={['0.5rem', '1rem', '1.5rem']}>
                      <HStack spacing="0.5rem" justifyContent="flex-end">
                        <Button size="xs" fontSize="xs" colorScheme="pink"><Icon as={RiPencilLine} /></Button>
                        <Button size="xs" fontSize="xs" colorScheme="pink"><Icon as={RiDeleteBinLine} /></Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => data)

  return {
    props: {
      users: [...users]
    }
  }
}

export default Users