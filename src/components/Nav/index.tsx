import React from "react";
import {
    chakra,
    Box,
    Flex,
    Text,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    useDisclosure,
    IconButton,
    InputGroup,
    InputLeftElement,
    Input,
    Avatar,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Icon,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    VStack,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import SidebarContent from "../layout/Sidebar/SidebarContent";
import { signOut, useSession } from "next-auth/react";
import DarkModeToggleSwitch from "../shared/ToggleThemeSwitch";
import { useRouter } from "next/router";
function Nav() {
    const bg = useColorModeValue("#FFFFFF", "primaryDark");
    const sidebar = useDisclosure();
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");
    const ColorValue = useColorModeValue("primaryDark", "#FFFFFF");
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <>
            <chakra.header
                bg={bg}
                w="full"
                px={{ base: 2, sm: 4 }}
                py={4}
                shadow="md"
                position={"fixed"}
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} alignItems="center">
                        <Box display={{ base: "inline-flex", md: "none" }}>
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color={useColorModeValue("gray.800", "inherit")}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={sidebar.onOpen}
                            />
                            <Drawer
                                isOpen={sidebar.isOpen}
                                onClose={sidebar.onClose}
                                placement="left"
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <SidebarContent w="full" borderRight="none" />
                                </DrawerContent>
                            </Drawer>
                            {/*  */}
                        </Box>
                        <chakra.a
                            href="/"
                            title="Choc Home Page"
                            display="flex"
                            alignItems="center"
                        >
                            <VisuallyHidden>Choc</VisuallyHidden>
                        </chakra.a>
                    </HStack>
                    <HStack spacing={3} display={"flex"} alignItems="center">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <AiOutlineSearch />
                            </InputLeftElement>
                            <Input type="tel" placeholder="Search..." />
                        </InputGroup>

                        {/* <chakra.a
                            p={3}
                            color={useColorModeValue("gray.800", "inherit")}
                            rounded="sm"
                            _hover={{ color: useColorModeValue("gray.800", "gray.600") }}
                        >
                            <AiFillBell />
                            <VisuallyHidden>Notifications</VisuallyHidden>
                        </chakra.a> */}

                        <Menu>
                            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
                                <HStack>
                                    <Avatar
                                        size={"sm"}
                                        // @ts-ignore
                                        src={session?.user?.avatar ? session?.user.avatar : null}
                                    />
                                    <VStack
                                        display={{ base: "none", md: "flex" }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        {/* @ts-ignore */}
                                        <Text fontSize="sm">{session?.user?.name}</Text>
                                        <Text fontSize="xs" color="gray.600">
                                            {/* @ts-ignore */}
                                            {session?.user?.usertype}
                                        </Text>
                                    </VStack>
                                    <Box display={{ base: "none", md: "flex" }}>
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList bg={Bgvalue} color={ColorValue}>
                                <MenuItem
                                    onClick={e => {
                                        e.preventDefault();
                                        router.push("setting");
                                    }}
                                >
                                    My Account
                                </MenuItem>
                                <MenuItem>
                                    <DarkModeToggleSwitch />
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={() => signOut()}>
                                    <Icon mr="4" fontSize="16" as={GoSignOut} />
                                    Signout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Flex>
            </chakra.header>
        </>
    );
}
export default Nav;
