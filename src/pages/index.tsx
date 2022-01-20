import Layout from "@/components/layout/";
import type { GetServerSideProps, NextPage } from "next";
// import { fetcher } from "@/app/lib/fetcher";
import { getSession, useSession } from "next-auth/react";
// import useSwr from "swr";

const Home: NextPage = ({}: any) => {
    const { data: session, status } = useSession();

    // const { data } = useSwr<any | null>(
    //     `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
    //     fetcher,
    //     {
    //         fallbackData,
    //     }
    // );
    return (
        <Layout>
            <div>
                {session?.user?.name}
                {"    "}
                {status}
            </div>
        </Layout>
    );
};

export default Home;

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
