import { Box, Flex, HStack } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

function Pagination() {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      marginTop="1rem"
      flexDirection={["column-reverse", "row"]}
    >
      <Box fontSize={["xs", "sm"]} marginTop={["0.5rem", "0"]}>
        <strong>0 - 10</strong> of <strong>100</strong>
      </Box>
      <HStack spacing="0.5rem">
        <PaginationItem number="1" current />
        <PaginationItem number="2" />
        <PaginationItem number="3" />
        <PaginationItem number="4" />
        <PaginationItem number="5" />
      </HStack>
    </Flex>
  );
}

export default Pagination;
