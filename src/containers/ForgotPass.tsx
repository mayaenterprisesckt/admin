import { InputField } from "@/components/From/InputField";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Text,
    ModalCloseButton,
    ModalBody,
    Heading,
    Stack,
    Button,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

interface forgotPassProps {
    title: string;
}

function ForgotPass({ title }: forgotPassProps) {
    const { onClose, isOpen, onOpen } = useDisclosure();
    const router = useRouter();
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");
    const Colorvalue = useColorModeValue("primaryDark", "#FFFFFF");
    const [message, setMessage] = useState("Forgot your password?");
    return (
        <div>
            <p onClick={onOpen} className="underline font-semibold cursor-pointer">
                {title}
            </p>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent boxShadow={"lg"} rounded={"xl"} bg={Bgvalue}>
                    {/* <ModalHeader>Modal Title</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody p={6} my={20}>
                        <Formik
                            initialValues={{ email: "" }}
                            onSubmit={async (values, { setErrors }) => {
                                const responce = await fetch(
                                    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/reset-password`,
                                    {
                                        method: "PUT",
                                        credentials: "include",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            email: values.email,
                                        }),
                                    }
                                );
                                const respp = await responce.json();
                                console.log(respp.errors);
                                if (respp.errors) {
                                    setErrors({
                                        email: respp.errors[0].msg,
                                    });
                                }
                                if (respp.success === false) {
                                    setErrors({
                                        email: respp.message,
                                    });
                                }
                                if (respp.success === true) {
                                    setMessage(respp.message);
                                    router.push("/login");
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <Heading
                                        lineHeight={1.1}
                                        fontSize={{ base: "2xl", md: "3xl" }}
                                        color={Colorvalue}
                                    >
                                        {message}
                                    </Heading>
                                    <Text
                                        fontSize={{ base: "sm", sm: "md" }}
                                        color={Colorvalue}
                                    ></Text>
                                    <Stack my={20}>
                                        <InputField
                                            required
                                            name="email"
                                            placeholder="your-email@example.com"
                                            label="Email"
                                            type="email"
                                            passwordField={false}

                                            // type={"email"}
                                        />
                                    </Stack>
                                    <Stack spacing={6} maxW={"lg"}>
                                        <Button
                                            bg={"#040505"}
                                            color={"white"}
                                            _hover={{
                                                bg: "green.400",
                                            }}
                                            isLoading={isSubmitting}
                                            type="submit"
                                        >
                                            Request Reset
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                    {/* <ModalFooter></ModalFooter> */}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ForgotPass;
