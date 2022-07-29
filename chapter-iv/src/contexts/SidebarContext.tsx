import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarContextProps {
  isOpen: boolean;
  onClose(): void;
  onOpen(): void;
}
const SidebarContext = createContext({} as SidebarContextProps);

function SidebarProvider({ children }: { children: ReactNode }) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => disclosure.onClose, [router.asPath]);

  return <SidebarContext.Provider value={disclosure}>{children}</SidebarContext.Provider>;
}

function useSidebar() {
  return useContext(SidebarContext);
}

export { SidebarProvider, useSidebar };
