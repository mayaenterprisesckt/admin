import { Box, useColorModeValue } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Nav from "../Nav";
import SidebarContent from "../Sidebar/SidebarContent";

function Layout({ children }: { children: ReactNode }) {
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");

    return (
        <>
            <Nav></Nav>
            <Box as="section" bg={Bgvalue} minH="100vh" pt={10}>
                <SidebarContent display={{ base: "none", md: "unset" }} />

                <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
                    <Box as="main" p="4" mt={10}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
export default Layout;
