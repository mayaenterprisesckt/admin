import Layout from "@/components/Layout/Index";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Home from "../containers/home";

const Index: NextPage = ({}) => {
    // const { data: session, status } = useSession();
    // const { data } = useSwr<any | null>(
    //     `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
    //     fetcher,
    //     {
    //         fallbackData,
    //     }
    // );
    return (
        <Layout>
            <Home />
        </Layout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async context => {
    const { req } = context;
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
    // const data = await fetcher(
    //     `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
    //     req
    // );
    return {
        props: {
            // fallbackData: data,
            // session: session,
        },
    };
};
