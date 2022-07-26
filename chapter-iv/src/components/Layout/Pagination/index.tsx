import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalRecords: number;
  recordsPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesNumber(from: number, to: number) {
  const arr = [...new Array(to - from)];
  return arr.map((_, index) => from + index + 1).filter((page) => page > 0);
}

function Pagination({
  totalRecords,
  recordsPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalRecords / recordsPerPage);

  const previousPages =
    currentPage > 1 ? generatePagesNumber(currentPage - 1 - siblingsCount, currentPage - 1) : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesNumber(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : [];

  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      marginTop="1rem"
      flexDirection={["column-reverse", "row"]}
    >
      <Box fontSize={["xs", "sm"]} marginTop={["0.5rem", "0"]}>
        <strong>
          {recordsPerPage * currentPage - recordsPerPage + 1} - {recordsPerPage * currentPage}
        </strong>{" "}
        of <strong>{totalRecords}</strong>
      </Box>
      <HStack spacing="0.5rem">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            <Text>...</Text>
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem onPageChange={onPageChange} key={page} number={page} />
          ))}

        <PaginationItem onPageChange={onPageChange} number={currentPage} current />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem onPageChange={onPageChange} key={page} number={page} />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            <Text>...</Text>
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </HStack>
    </Flex>
  );
}

export default Pagination;
