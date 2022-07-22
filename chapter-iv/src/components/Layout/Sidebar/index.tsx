import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSidebar } from "../../../contexts/SidebarContext";
import SidebarNav from "./SidebarNav";

function Sidebar() {
  const isDrawerMode = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onClose } = useSidebar();

  if (isDrawerMode) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent backgroundColor="gray.800">
            <DrawerCloseButton marginTop="1.5rem" />
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box
      as="aside"
      width="14rem"
      marginRight="1rem"
      backgroundColor="gray.800"
      height="calc(100vh - 4rem)"
    >
      <SidebarNav />
    </Box>
  );
}

export default Sidebar;
