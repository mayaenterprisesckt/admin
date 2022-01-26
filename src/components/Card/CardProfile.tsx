import { Button, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useSession } from "next-auth/react";
import React from "react";
import { InputField } from "../From/InputField";

// components

export default function CardProfile() {
    const { data: session } = useSession();
    const toast = useToast();
    const accessToken = session?.token;

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-[#F1F5F9] dark:bg-black w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                            <div className="relative">
                                <img
                                    alt="..."
                                    src="/fallback.png"
                                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                            {/* @ts-ignore */}
                            {session?.user.name}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                        </div>
                        <div className="mb-2 text-blueGray-600 mt-10">
                            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                            {/* @ts-ignore */}
                            {session?.user.usertype}
                        </div>
                        <div className="mb-2 text-blueGray-600">
                            <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                            {/* @ts-ignore */}
                            {session?.user.username}
                        </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <Formik
                            initialValues={{ oldpassword: "", password: "" }}
                            onSubmit={async (values, { setErrors }) => {
                                const responce = await fetch(
                                    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/change-password`,
                                    {
                                        method: "PUT",
                                        credentials: "include",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: accessToken as string,
                                        },
                                        body: JSON.stringify({
                                            oldpassword: values.oldpassword,
                                            password: values.password,
                                        }),
                                    }
                                );
                                // console.log(JSON.stringify(values) + selectedClient);
                                const respp = await responce.json();
                                respp.errors;
                                if (respp.errors) {
                                    setErrors({
                                        password: respp.errors[0].msg,
                                    });
                                }
                                if (respp.success === false) {
                                    setErrors({
                                        password: respp.message,
                                    });
                                }
                                if (respp.success === true) {
                                    toast({
                                        duration: 3000,
                                        isClosable: false,
                                        // @ts-ignore
                                        title: respp.message,
                                        status: "success",
                                        position: "top",
                                    });
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Change password
                                    </h6>
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <InputField
                                                    name="oldpassword"
                                                    placeholder="Current password"
                                                    label="Current Password"
                                                    type={"password"}
                                                    passwordField={true}
                                                    required
                                                    minLength={6}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <InputField
                                                    name="password"
                                                    placeholder="New password"
                                                    label="New Password"
                                                    type={"password"}
                                                    passwordField={true}
                                                    required
                                                    minLength={6}
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
            </div>
        </>
    );
}
