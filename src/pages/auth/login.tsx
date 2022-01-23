import {
    Flex,
    useColorModeValue,
    Text,
    Stack,
    Heading,
    Box,
    Button,
    useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { signIn, getCsrfToken, getSession, useSession } from "next-auth/react";
import { Form, Formik } from "formik";
import { InputField } from "@/components/From/InputField";
import ForgotPass from "@/containers/auth/ForgotPass";
import { NextPageContext } from "next";
function LoginPage({ csrfToken }: { csrfToken: any }) {
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");
    const router = useRouter();
    const toast = useToast();
    const { status } = useSession();
    if (status === "authenticated") {
        router.push("/");
        return null;
    }
    // if (status === "authenticated") {

    // }
    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={Bgvalue}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"green.500"}>
                        Enjoy All Your
                    </Text>
                </Stack>
                <Box rounded={"lg"} bg={Bgvalue} boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={async (values, { setErrors, setSubmitting }) => {
                                const res = await signIn("credentials", {
                                    redirect: false,
                                    username: values.username,
                                    password: values.password,
                                    callbackUrl: `${window.location.origin}`,
                                });

                                // @ts-ignore
                                if (res?.error) {
                                    setErrors({
                                        // @ts-ignore
                                        // username: res?.error,
                                        username: "Username or password Wrong",
                                    });
                                    // @ts-ignore
                                    if (res?.error === "Incorrect password.") {
                                        setErrors({
                                            // @ts-ignore
                                            // password: res?.error,
                                            password: res?.error,
                                        });
                                    }
                                }
                                // @ts-ignore
                                if (res.url) {
                                    toast({
                                        duration: 3000,
                                        isClosable: false,
                                        // @ts-ignore
                                        title: res?.error
                                            ? // @ts-ignore
                                              `${res?.error}`
                                            : "Hurray You are logged in",
                                        // @ts-ignore
                                        // description: `${res.error}`,
                                        // @ts-ignore
                                        status: res.error ? `${res.error}` : "success",
                                        position: "top",
                                    });
                                    // @ts-ignore
                                    router.push(res.url);
                                    setSubmitting(false);
                                    // router.push("/");
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <input
                                        name="csrfToken"
                                        type="hidden"
                                        defaultValue={csrfToken}
                                    />
                                    <InputField
                                        required
                                        name="username"
                                        placeholder="username"
                                        label="Username"
                                        minLength={3}
                                        type={"text"}
                                        passwordField={false}
                                    />

                                    <InputField
                                        name="password"
                                        placeholder="password"
                                        label="Password"
                                        type={"password"}
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

export async function getServerSideProps(context: NextPageContext) {
    const { req, res } = context;
    const session = await getSession({ req });
    if (session && res && session?.accessToken) {
        res.writeHead(302, {
            Location: "/",
        });
        res.end();
        return null;
    }
    return {
        props: {
            session: null,
            csrfToken: await getCsrfToken(context),
        },
    };
}
