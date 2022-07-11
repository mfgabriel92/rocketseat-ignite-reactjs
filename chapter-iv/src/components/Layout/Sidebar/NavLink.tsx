import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from '@chakra-ui/react'
import { ElementType } from 'react'
import ActiveLink from './ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType
  href: string
  children: string
}

function NavLink({ icon, href, children, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" paddingY="1rem" paddingX="1.5rem" _hover={{ backgroundColor: 'pink.500', color: 'gray.50' }} {...rest}>
        <Icon as={icon} fontSize="22px" />
        <Text marginLeft="1rem">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}

export default NavLink