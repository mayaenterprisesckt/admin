import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";

function ResetPasswordForm(): JSX.Element {
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");
    const router = useRouter();

    const passwordRef = useRef<HTMLInputElement>(null);
    const cpasswordRef = useRef<HTMLInputElement>(null);
    console.log(router.query?.token);

    async function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/reset-password-now`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resetPasswordToken: router.query?.token,
                    password: passwordRef.current?.value,
                }),
            }
        );
        const json = await res.json();
        console.log(json);
        // router.push("/");
    }
    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={Bgvalue}>
            <form onSubmit={handelSubmit}>
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
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                        Enter new password
                    </Heading>

                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" ref={passwordRef} />
                    </FormControl>
                    <FormControl id="password Confirm password">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type="password" ref={cpasswordRef} />
                    </FormControl>
                    <Stack spacing={6}>
                        <Button
                            bg={"#040505"}
                            color={"white"}
                            type="submit"
                            _hover={{
                                bg: "green.400",
                            }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Flex>
    );
}
export default ResetPasswordForm;
