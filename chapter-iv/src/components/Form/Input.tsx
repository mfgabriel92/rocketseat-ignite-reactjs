import {
  FormControl,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
} from "@chakra-ui/react";
import { ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...rest },
  ref,
) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="pink.500"
        backgroundColor="gray.950"
        borderColor="gray.700"
        ref={ref}
        {...rest}
      />
      {error && (
        <Text fontSize="xs" color="red.300">
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
