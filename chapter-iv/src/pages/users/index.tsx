import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Layout/Header";
import Pagination from "../../components/Layout/Pagination";
import Sidebar from "../../components/Layout/Sidebar";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

function Users() {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });
  const { data, isLoading, error } = useQuery(
    ["users"],
    async () => {
      const result = await fetch("https://localhost:3000/api/v1/users");
      const response = await result.json();
      return response;
    },
    {
      staleTime: 1000 * 60 * 15,
    },
  );

  return (
    <Box>
      <Header />
      <Flex width="100%" flex="1">
        <Sidebar />
        <Box flex="1" borderRadius="8px" padding="1rem">
          <Flex marginBottom="1rem" justifyContent="space-between" alignItems="center">
            <Heading size="lg" fontWeight="normal">
              Users
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                cursor="pointer"
                leftIcon={<Icon as={RiAddLine} />}
              >
                New
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : error ? (
            <Center>
              <Text>Error loading users</Text>
            </Center>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th
                      paddingX={["0.5rem", "1rem", "1.5rem"]}
                      width={["1rem", "1rem", "2rem"]}
                      color="gray.300"
                    >
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>User</Th>
                    {isWideScreen && <Th>Registered at</Th>}
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users?.map((user: User) => (
                    <Tr key={user.id}>
                      <Td paddingX={["0.5rem", "1rem", "1.5rem"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td paddingX={["0.5rem", "1rem", "1.5rem"]}>
                        <Box>
                          <Text fontWeight="bold" fontSize={["xs", "xs", "sm"]}>
                            {user.name}
                          </Text>
                          <Text fontSize={["xs", "xs", "sm"]} color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideScreen && <Td>{format(new Date(user.createdAt), "LLLL c, yyyy")}</Td>}
                      <Td paddingX={["0.5rem", "1rem", "1.5rem"]}>
                        <HStack spacing="0.5rem" justifyContent="flex-end">
                          <Button size="xs" fontSize="xs" colorScheme="pink">
                            <Icon as={RiPencilLine} />
                          </Button>
                          <Button size="xs" fontSize="xs" colorScheme="pink">
                            <Icon as={RiDeleteBinLine} />
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default Users;
