import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraInput id={name} name={name} focusBorderColor="pink.500" backgroundColor="gray.950" borderColor="gray.700" {...rest} />
    </FormControl>
  )
}

export default Input