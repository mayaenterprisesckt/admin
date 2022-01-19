import type { NextPage } from "next";
import Head from "next/head";
import IndexLayout from "../../components/layout";

import { fetcher } from "@/app/lib/fetcher";

import { NextPageContext } from "next";
import useSwr from "swr";
const Me: NextPage = ({ fallbackData }: any) => {
    const { data } = useSwr<any | null>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
        fetcher,
        {
            fallbackData,
        }
    );

    return (
        <>
            <div>
                <Head>
                    <title>Minvest</title>
                    <meta name="description" content="All your investments in one single place" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <IndexLayout>
                    <div className="w-ful h-full justify-center items-start flex">
                        {JSON.stringify(data)}
                    </div>
                </IndexLayout>
            </div>
        </>
    );
};

export default Me;

Me.getInitialProps = async (ctx: NextPageContext) => {
    // console.log(ctx.req?.headers.cookie);
    // console.log(jwt);
    const ress = await fetcher(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
        ctx
    );
    return { fallbackData: ress };
};
