import { InputField } from "@/components/From/InputField";
import ForgotPass from "@/containers/auth/ForgotPass";
import { Button, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

function ResetPasswordForm({ token }: { token: string }): JSX.Element {
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");
    const router = useRouter();

    const [Message, setMessage] = useState("");
    const [link, setlink] = useState(false);
    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={Bgvalue}>
            <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={Bgvalue}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={12}
            >
                <Heading lineHeight={1.1} color={"red.400"} fontSize={{ base: "2xl", md: "3xl" }}>
                    {Message}
                </Heading>

                <Formik
                    initialValues={{ password: "", password2: "" }}
                    onSubmit={async (values, { setErrors }) => {
                        if (values.password !== values.password2) {
                            setErrors({
                                password: "Password Not matching",
                                password2: "Password Not matching",
                            });
                        } else {
                            const responce = await fetch(
                                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/reset-password-now`,
                                {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        resetPasswordToken: token,
                                        password: values.password,
                                    }),
                                }
                            );
                            const respp = await responce.json();
                            if (respp.success === false) {
                                setMessage(respp.message);
                                setlink(true);
                            } else {
                                router.push("/auth/login");
                            }

                            // console.log(responce);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Stack
                                spacing={4}
                                w={"full"}
                                maxW={"md"}
                                bg={Bgvalue}
                                // rounded={"xl"}
                                // boxShadow={"lg"}
                                p={6}
                                my={12}
                            >
                                <InputField
                                    name="password"
                                    placeholder="password"
                                    label="Password"
                                    passwordField={true}
                                    required
                                    type={"password"}
                                    minLength={6}
                                />
                                <InputField
                                    name="password2"
                                    placeholder="Confirm Password"
                                    label="Password2"
                                    type={"password"}
                                    passwordField={true}
                                    required
                                    minLength={6}
                                />
                            </Stack>
                            <Stack spacing={10}>
                                <Button
                                    bg={"#040505"}
                                    color={"white"}
                                    _hover={{
                                        bg: "green.500",
                                    }}
                                    type="submit"
                                    isLoading={isSubmitting}
                                >
                                    Reset Password
                                </Button>
                                {link ? (
                                    <Button
                                        bg={"#040505"}
                                        color={"white"}
                                        _hover={{
                                            bg: "green.500",
                                        }}
                                    >
                                        <ForgotPass title={" Send Reset Link again"} />
                                    </Button>
                                ) : null}
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Stack>
        </Flex>
    );
}
export default ResetPasswordForm;

ResetPasswordForm.getInitialProps = async (ctx: NextPageContext) => {
    const token = ctx.query.token;
    return {
        token,
    };
};
