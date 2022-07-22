import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface PaginationItemProps extends ChakraButtonProps {
  current?: boolean;
  number: string;
}

function PaginationItem({ current = false, number, ...rest }: PaginationItemProps) {
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
    >
      {number}
    </Button>
  );
}

export default PaginationItem;
