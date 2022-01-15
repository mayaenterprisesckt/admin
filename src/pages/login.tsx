import {
    Flex,
    useColorModeValue,
    Text,
    Stack,
    Heading,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import React, { useRef } from "react";
import { setCookie } from "nookies";
function LoginPage() {
    // hmm use history if authh let me know
    const router = useRouter();
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");
    const Colorvalue = useColorModeValue("primaryDark", "#FFFFFF");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const emailRef = useRef<HTMLInputElement>(null);
    const emailForgotRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: emailRef.current?.value,
                    password: passwordRef.current?.value,
                }),
            }
        );
        const respp = await res.json();
        console.log(respp);
        setCookie(null, "token", respp.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
            httpOnly: true,
            sameSite: "strict",
        });

        router.push("/");
    }
    async function handelForgotSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Preventing the page from reloading
        event.preventDefault();
        console.log(emailForgotRef.current?.value);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/reset-password`,
            {
                method: "PUT",

                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailForgotRef.current?.value,
                }),
            }
        );
        const respp = await res.json();
        // Do something
        console.log(respp);

        // router.push("/");
    }

    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={Bgvalue}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"green.500"}>
                        to enjoy all of our cool
                    </Text>
                </Stack>
                <Box rounded={"lg"} bg={Bgvalue} boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                        <form onSubmit={handelSubmit}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="" ref={emailRef} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" ref={passwordRef} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}
                                >
                                    <div className="text-center pt-12 pb-12">
                                        <p onClick={onOpen}>
                                            <p className="underline font-semibold cursor-pointer">
                                                Forgot password ?
                                            </p>
                                        </p>
                                    </div>
                                </Stack>
                                <Button
                                    bg={"#040505"}
                                    color={"white"}
                                    _hover={{
                                        bg: "green.500",
                                    }}
                                    type="submit"
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent boxShadow={"lg"} rounded={"xl"} bg={Bgvalue}>
                    {/* <ModalHeader>Modal Title</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody p={6} my={20}>
                        <form onSubmit={handelForgotSubmit}>
                            <Heading
                                lineHeight={1.1}
                                fontSize={{ base: "2xl", md: "3xl" }}
                                color={Colorvalue}
                            >
                                Forgot your password?
                            </Heading>
                            <Text fontSize={{ base: "sm", sm: "md" }} color={Colorvalue}>
                                You&apos;ll get an email with a reset link
                            </Text>
                            <Stack my={20}>
                                <FormControl id="email">
                                    <Input
                                        ref={emailForgotRef}
                                        placeholder="your-email@example.com"
                                        _placeholder={{ color: "gray.500" }}
                                        type="email"
                                        isRequired
                                    />
                                </FormControl>
                            </Stack>
                            <Stack spacing={6} maxW={"lg"}>
                                <Button
                                    bg={"#040505"}
                                    color={"white"}
                                    _hover={{
                                        bg: "green.400",
                                    }}
                                    type="submit"
                                >
                                    Request Reset
                                </Button>
                            </Stack>
                        </form>
                    </ModalBody>
                    {/* <ModalFooter></ModalFooter> */}
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default LoginPage;
