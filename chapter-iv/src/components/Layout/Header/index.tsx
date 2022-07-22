import { Flex, HStack, Icon, IconButton, Input, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine, RiNotificationLine, RiSearchLine, RiUserAddLine } from "react-icons/ri";
import { useSidebar } from "../../../contexts/SidebarContext";
import Logo from "./Logo";
import Profile from "./Profile";

function Header() {
  const isWideScreen = useBreakpointValue({ base: false, lg: true });
  const { onOpen } = useSidebar();

  return (
    <Flex as="header" height="4rem" alignItems="center" backgroundColor="gray.800">
      <Flex
        width="100%"
        margin="auto"
        paddingX="1.5rem"
        alignItems="center"
        justifyContent="space-between"
      >
        {!isWideScreen && (
          <HStack spacing="1rem">
            <IconButton
              icon={<Icon as={RiMenuLine} />}
              fontSize="2rem"
              variant="unstyled"
              onClick={onOpen}
              aria-label="Open navigation"
            />
            <Logo />
          </HStack>
        )}

        {isWideScreen && <Logo />}

        {isWideScreen && (
          <Flex
            as="label"
            paddingX="0.875rem"
            height="2rem"
            alignItems="center"
            alignSelf="center"
            color="gray.200"
            position="relative"
            borderRadius="full"
            width="32rem"
            backgroundColor="gray.700"
          >
            <Input
              color="gray.50"
              variant="unstyled"
              placeholder="Search"
              paddingX="1rem"
              fontSize="0.875rem"
              marginRight="1rem"
              _placeholder={{ color: "gray.400", fontSize: "0.875rem" }}
            />
            <Icon as={RiSearchLine} fontSize="1rem" />
          </Flex>
        )}

        <Flex alignItems="center">
          <HStack
            spacing="1rem"
            color="gray.300"
            marginX="1rem"
            paddingRight="1rem"
            paddingY="0.125rem"
            borderRightWidth="1px"
            borderColor="gray.700"
          >
            <Icon as={RiNotificationLine} fontSize="1rem" />
            <Icon as={RiUserAddLine} fontSize="1rem" />
          </HStack>

          <Profile showProfileInfo={isWideScreen} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
