import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect } from 'react'

interface SidebarContextProps {
  isOpen: boolean;
  onClose(): void;
  onOpen(): void;
}
const SidebarContext = createContext({} as SidebarContextProps)

interface SidebarProviderProps {
  children: ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const disclosure =  useDisclosure()
  const router = useRouter()

  useEffect(() => disclosure.onClose, [router.asPath])

  return (
    <SidebarContext.Provider value={disclosure}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)