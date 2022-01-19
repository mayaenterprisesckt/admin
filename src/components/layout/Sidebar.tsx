import { Box, CloseButton, Flex, useColorModeValue, Text, BoxProps, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { IconType } from "react-icons";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import NavItem from "./NavItem";

interface LinkItemProps {
    name: string;
    icon: IconType;
    path: string;
    onClick?: any;
}
const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, path: "/" },
    { name: "My Account", icon: FiUser, path: "/users/me" },
    { name: "Settings", icon: FiSettings, path: "/settings" },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const router = useRouter();

    async function handelLogout() {
        await destroyCookie(null, "_li");
        router.push("/");
    }
    return (
        <>
            <Box
                transition="3s ease"
                bg={useColorModeValue("#FFFFFF", "#000000")}
                borderRight="1px"
                borderRightColor={useColorModeValue("#d1d5db", "primaryDark")}
                w={{ base: "full", md: 60 }}
                pos="fixed"
                h="full"
                {...rest}
            >
                <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                    <Text
                        fontSize="2xl"
                        fontFamily="monospace"
                        fontWeight="bold"
                        color={useColorModeValue("primaryDark", "primaryLight")}
                    >
                        Admin
                        {/* <Image src={hello} height={50} width={50} alt="" /> */}
                    </Text>

                    <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
                </Flex>
                {LinkItems.map(link => (
                    <>
                        <NavItem key={link.name} icon={link.icon} path={link.path}>
                            {link.name}
                        </NavItem>
                    </>
                ))}
                <p onClick={handelLogout}>
                    <Flex
                        align="center"
                        p="4"
                        mx="4"
                        borderRadius="lg"
                        role="group"
                        // color={value}
                        cursor="pointer"
                        _hover={{
                            bg: "lightAccent",
                        }}
                    >
                        <Icon mr="4" fontSize="16" as={GoSignOut} />
                        Signout
                    </Flex>
                </p>
            </Box>
        </>
    );
};

export default SidebarContent;
