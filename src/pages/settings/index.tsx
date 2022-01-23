import type { GetServerSideProps } from "next";
import React from "react";
// Chakra imports
// Custom components
import { getSession } from "next-auth/react";
import { fetcher } from "@/app/lib/fetcher";
import { InferGetServerSidePropsType } from "next";
// Assets
import IndexLayout from "@/components/Layout/Index";
import CardProfile from "@/components/Card/CardProfile";
import CardSettings from "@/components/Card/CardSettings";
import useSwr from "swr";

function Settings({ fallbackData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { data } = useSwr<User.User | null>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
        fetcher,
        {
            fallbackData,
        }
    );
    return (
        <IndexLayout>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <CardSettings />
                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <CardProfile user={data!.user} />
                </div>
            </div>
        </IndexLayout>
    );
}

export default Settings;

export const getServerSideProps: GetServerSideProps = async context => {
    const { req } = context;
    const session = await getSession({ req });
    // console.log(session);
    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
    // if (session?.user?.usertype === "DIS") {
    //     return {
    //         redirect: {
    //             destination: "/",
    //             permanent: false,
    //         },
    //     };
    // }
    const data = await fetcher(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
        req
    );
    const me: User.User = await data;
    return {
        props: {
            fallbackData: me,
        },
    };
};
