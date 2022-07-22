import { Flex } from "@chakra-ui/react";

function Logo() {
  return (
    <Flex
      as="p"
      fontSize={["xl", "2xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      alignItems="center"
    >
      dashgo
      <Flex
        as="span"
        color="pink.500"
        fontSize={["xl", "2xl"]}
        fontWeight="bold"
        marginLeft="0.125rem"
        alignItems="center"
      >
        .
      </Flex>
    </Flex>
  );
}

export default Logo;
