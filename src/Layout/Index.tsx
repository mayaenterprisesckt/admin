import { Box, useColorModeValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { ReactNode } from "react";
import Nav from "../components/Nav";
import SidebarContent from "../components/Sidebar/SidebarContent";

function Layout({ children }: { children: ReactNode }) {
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");
    // const router = useRouter();
    // const { status } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         router.push("/auth/login");
    //     },
    // });

    // if (typeof window === "undefined") {
    //     return null;
    // }
    // if (status === "loading") {
    //     return (
    //         <>
    //             <div>Loading</div>
    //         </>
    //     );
    // }
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

export const getServerSideProps: GetServerSideProps = async context => {
    const { req } = context;
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
    // const data = await fetcher(
    //     `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
    //     req
    // );
    return {
        props: {
            // fallbackData: data,
            // session: session,
        },
    };
};
