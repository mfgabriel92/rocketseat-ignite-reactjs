import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface PaginationItemProps extends ChakraButtonProps {
  current?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

function PaginationItem({ current = false, number, onPageChange, ...rest }: PaginationItemProps) {
  if (current) {
    return (
      <Button
        size="xs"
        fontSize="xs"
        width="0.875rem"
        colorScheme="pink"
        disabled
        _disabled={{ color: "gray.50", cursor: "default" }}
        {...rest}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="xs"
      fontSize="xs"
      width="0.875rem"
      backgroundColor="gray.800"
      _hover={{ backgroundColor: "pink.500" }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}

export default PaginationItem;
