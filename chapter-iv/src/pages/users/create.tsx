import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RiArrowLeftLine, RiCheckLine } from "react-icons/ri";
import { Input } from "../../components/Form/Input";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import schema from "./create-user.schema";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function CreateUser() {
  const { register, handleSubmit, formState } = useForm<CreateUserProps>({
    resolver: zodResolver(schema),
  });

  async function handleCreateNewUser(data: CreateUserProps) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  }

  return (
    <Box>
      <Header />
      <Flex as="form" width="100%" flex="1" onSubmit={handleSubmit(handleCreateNewUser)}>
        <Sidebar />
        <Box flex="1" borderRadius="8px" padding="1rem">
          <Heading size="lg" fontWeight="normal">
            Create user
          </Heading>
          <Divider marginY="1.5rem" borderColor="gray.700" />
          <VStack spacing="1rem">
            <SimpleGrid minChildWidth="14rem" spacing="0.5rem" width="100%" height="fit-content">
              <Input
                label="Full name"
                error={formState.errors.name?.message}
                {...register("name")}
              />
              <Input
                label="E-mail"
                type="email"
                error={formState.errors.email?.message}
                {...register("email")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="14rem" spacing="0.5rem" width="100%" height="fit-content">
              <Input
                label="Password"
                type="password"
                error={formState.errors.password?.message}
                {...register("password")}
              />
              <Input
                label="Confirm password"
                type="password"
                error={formState.errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </SimpleGrid>
          </VStack>
          <Flex marginTop="1rem">
            <Stack spacing="1rem" width="100%" direction={["column-reverse", "row"]}>
              <Link href="/dashboard/users" passHref>
                <Button as="a" backgroundColor="gray.700" leftIcon={<Icon as={RiArrowLeftLine} />}>
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                leftIcon={<Icon as={RiCheckLine} />}
                isLoading={formState.isSubmitting}
              >
                Save
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default CreateUser;
