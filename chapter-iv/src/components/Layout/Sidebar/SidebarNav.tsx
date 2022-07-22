import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiUserSearchFill } from "react-icons/ri";
import NavLink from "./NavLink";
import NavSection from "./NavSection";

function SidebarNav() {
  return (
    <Stack spacing="2rem" align="stretch">
      <NavSection title="GENERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
        <NavLink href="/users" icon={RiUserSearchFill}>
          Users
        </NavLink>
      </NavSection>
    </Stack>
  );
}

export default SidebarNav;
