import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";

// components

export default function CardSettings() {
    const toast = useToast();
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F1F5F9] dark:bg-black  border-0">
                <div className="rounded-t bg-gray-50 dark:bg-black mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                        {/*  */}
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Formik
                        initialValues={{ email: "", username: "", name: "", password: "" }}
                        onSubmit={async (values, { setErrors }) => {
                            const responce = await fetch(
                                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/change-password`,
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
                                    title: respp.message,
                                    // @ts-ignore
                                    // description: `${res.error}`,
                                    // @ts-ignore
                                    status: "success",
                                    position: "top",
                                });
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    User Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white  dark:bg-primaryDark dark:text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue="lucky.jesse"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white dark:bg-primaryDark dark:text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue="jesse@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white dark:bg-primaryDark dark:text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue="Lucky"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white dark:bg-primaryDark dark:text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue="Jesse"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Contact Information
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white dark:bg-primaryDark dark:text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                City
                                            </label>
                                            <input
                                                type="email"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white dark:bg-primaryDark dark:text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue="New York"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Mobile
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="2222222222222"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white dark:bg-primaryDark dark:text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue="90909747454"
                                                minLength={10}
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                ZIP CODE
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="12345"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white dark:bg-primaryDark dark:text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                defaultValue="12345"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />

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
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
