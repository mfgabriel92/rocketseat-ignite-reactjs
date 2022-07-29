import { Button, Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";
import { useAuth } from "../contexts/AuthContext";
import schema from "./signin.schema";

interface SignInProps {
  email: string;
  password: string;
}

function Home() {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState } = useForm<SignInProps>({
    resolver: zodResolver(schema),
  });

  async function handleSignIn(data: SignInProps) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    signIn(data);
  }

  return (
    <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        backgroundColor="gray.800"
        width="100%"
        maxWidth="22.5rem"
        padding="2rem"
        borderRadius="8px"
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Heading alignSelf="center">Sign In</Heading>
        <Divider marginY="1rem" borderColor="gray.700" />
        <Stack spacing="0.5rem">
          <Input label="E-mail" error={formState.errors.email?.message} {...register("email")} />
          <Input
            type="password"
            label="Password"
            error={formState.errors.password?.message}
            {...register("password")}
          />
        </Stack>
        <Button
          type="submit"
          marginTop="1.5rem"
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Enter
        </Button>
      </Flex>
    </Flex>
  );
}

export default Home;
