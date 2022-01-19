import { Flex, useColorModeValue, Text, Stack, Heading, Box, Button } from "@chakra-ui/react";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { setAccessToken } from "@/app/lib/accessToken";
import { Form, Formik } from "formik";
import { InputField } from "@/components/From/InputField";
import ForgotPass from "@/containers/ForgotPass";

function LoginPage() {
    // hmm use history if authh let me know
    const router = useRouter();
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");
    const [message, setMessage] = useState("");
    // const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={Bgvalue}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"green.500"}>
                        {message}
                    </Text>
                </Stack>
                <Box rounded={"lg"} bg={Bgvalue} boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={async (values, { setErrors }) => {
                                // if (values.password === "") {
                                //     setErrors({
                                //         password: "Password is required.",
                                //     });
                                // }
                                // if (values.username === "") {
                                //     setErrors({
                                //         password: "Username is required.",
                                //     });
                                // }
                                const responce = await fetch(
                                    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
                                    {
                                        method: "POST",
                                        credentials: "include",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            username: values.username,
                                            password: values.password,
                                        }),
                                    }
                                );
                                const respp = await responce.json();
                                // console.log(responce);
                                if (respp.success === false) {
                                    setErrors({
                                        username: respp.message,
                                    });
                                    if (respp.message === "Incorrect password.") {
                                        setErrors({
                                            password: respp.message,
                                        });
                                    }
                                }
                                if (respp.success === true) {
                                    setMessage(respp.message);
                                    await setAccessToken(respp.token);
                                    router.push("/");
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <InputField
                                        required
                                        name="username"
                                        placeholder="username"
                                        label="Username"
                                        minLength={3}
                                    />

                                    <InputField
                                        name="password"
                                        placeholder="password"
                                        label="Password"
                                        // type={"password"}
                                        passwordField={true}
                                        required
                                        minLength={6}
                                    />

                                    <Stack spacing={10}>
                                        <Stack
                                            direction={{ base: "column", sm: "row" }}
                                            align={"start"}
                                            justify={"space-between"}
                                        >
                                            <div className="text-center pt-12 pb-12">
                                                <ForgotPass title={"Forgot your password?"} />
                                            </div>
                                        </Stack>
                                        <Button
                                            bg={"#040505"}
                                            color={"white"}
                                            _hover={{
                                                bg: "green.500",
                                            }}
                                            type="submit"
                                            isLoading={isSubmitting}
                                        >
                                            Sign in
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default LoginPage;
