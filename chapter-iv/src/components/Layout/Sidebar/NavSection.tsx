import { Box, Stack, Text } from '@chakra-ui/react'
import { ReactElement } from 'react'

interface NavSectionProps {
  title: string
  children: ReactElement[]
}

function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text paddingX="1.5rem" paddingTop="2rem" paddingBottom="1rem" fontWeight="bold" color="gray.400">{title}</Text>
      <Stack alignItems="stretch">
        {children}
      </Stack>
    </Box>
  )
}

export default NavSection