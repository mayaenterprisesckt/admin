import { InputField } from "@/components/From/InputField";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useColorModeValue,
    useDisclosure,
    Button,
    FormLabel,
    Select,
    useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";

interface AddNewUserProps {
    title: string;
}

function AddNewUser({ title }: AddNewUserProps) {
    const { onClose, isOpen, onOpen } = useDisclosure();
    const Bgvalue = useColorModeValue("#FFFFFF", "primaryDark");
    const [selectedClient, setSelectedClient] = useState("");
    const toast = useToast();
    function handleSelectChange(event: any) {
        setSelectedClient(event.target.value);
    }
    return (
        <div>
            <p onClick={onOpen} className="underline font-semibold cursor-pointer">
                {title}
            </p>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size={"2xl"}>
                <ModalOverlay />
                <ModalContent boxShadow={"lg"} rounded={"xl"} bg={Bgvalue}>
                    {/* <ModalHeader>Modal Title</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody p={6} my={20}>
                        <Formik
                            initialValues={{ email: "", username: "", name: "", password: "" }}
                            onSubmit={async (values, { setErrors }) => {
                                const responce = await fetch(
                                    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/register`,
                                    {
                                        method: "POST",
                                        credentials: "include",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            email: values.email,
                                            username: values.username,
                                            name: values.name,
                                            usertype: selectedClient,
                                            password: values.password,
                                        }),
                                    }
                                );
                                // console.log(JSON.stringify(values) + selectedClient);
                                const respp = await responce.json();
                                respp.errors;
                                if (respp.errors) {
                                    setErrors({
                                        email: respp.errors[0].msg,
                                    });
                                }
                                if (respp.success === false) {
                                    setErrors({
                                        email: respp.message,
                                        // email: "Please Check Your email",
                                    });
                                }
                                if (respp.success === true) {
                                    toast({
                                        duration: 3000,
                                        isClosable: false,
                                        // @ts-ignore
                                        title: "Hurray  New Client Added SuccesFully",
                                        // @ts-ignore
                                        // description: `${res.error}`,
                                        // @ts-ignore
                                        status: "success",
                                        position: "top",
                                    });
                                    // router.push("/login");
                                    // setTimeout(() => {
                                    //     onClose();
                                    // }, 5000);
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="rounded-t bg-white mb-0"></div>
                                    <div className="flex-auto px-4 lg:px-10  pt-0">
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <InputField
                                                        name="username"
                                                        placeholder="nobody"
                                                        label="Username"
                                                        type={"text"}
                                                        passwordField={false}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <InputField
                                                        name="email"
                                                        placeholder="example@gmail.com"
                                                        label="Email"
                                                        type={"email"}
                                                        passwordField={false}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <InputField
                                                        name="name"
                                                        placeholder="SomeOne"
                                                        label="Name"
                                                        type={"text"}
                                                        passwordField={false}
                                                        required
                                                        minLength={6}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            Cilent Info
                                        </h6>
                                        <div className="flex flex-wrap">
                                            <FormLabel
                                                htmlFor="country"
                                                fontSize="sm"
                                                fontWeight="md"
                                                color={useColorModeValue("gray.700", "gray.50")}
                                            >
                                                USER TYPE
                                            </FormLabel>
                                            <Select
                                                isRequired
                                                value={selectedClient}
                                                onChange={handleSelectChange}
                                                id="filetype"
                                                name="filetype"
                                                autoComplete="dbf"
                                                placeholder="Select option"
                                                mt={1}
                                                focusBorderColor="brand.400"
                                                shadow="sm"
                                                size="sm"
                                                w="full"
                                                rounded="md"
                                            >
                                                <option value="USER">USER</option>
                                                <option value="DIS">DIS</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </Select>
                                        </div>
                                        <div className="flex flex-wrap mt-4">
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField
                                                    name="password"
                                                    placeholder="password"
                                                    label="Password"
                                                    type={"password"}
                                                    passwordField={true}
                                                    required
                                                    minLength={6}
                                                />
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField
                                                    name="confirmapssword"
                                                    placeholder="password"
                                                    label="Confirm Password"
                                                    type={"password"}
                                                    passwordField={true}
                                                    required
                                                    minLength={6}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap mt-5 items-center justify-center">
                                        <Button
                                            rounded={0}
                                            mt={6}
                                            bg={"#040505"}
                                            color={"white"}
                                            _hover={{
                                                bg: "green.500",
                                            }}
                                            type="submit"
                                            isLoading={isSubmitting}
                                        >
                                            Add {"New  " + selectedClient}
                                        </Button>
                                    </div>
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

export default AddNewUser;
