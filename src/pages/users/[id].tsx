import { fetcher } from "@/app/lib/fetcher";
import Layout from "@/components/layout";
import { NextPageContext } from "next";
import Link from "next/link";

const SingleUser: any = ({ fallbackData }: any) => {
    // const router = useRouter();
    // const userId = router.query.id;
    // const { data, error } = useSwr<any | null>(
    //     `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/users/${userId}`,
    //     fetcher,
    //     { refreshInterval: 400000, revalidateOnFocus: false, fallbackData }
    // );

    // if (isValidating) {
    //     return (
    //         <>
    //             <div>Loading...</div>
    //         </>
    //     );
    // }
    // if (error) {
    //     return (
    //         <>
    //             <div>Error {error}</div>
    //         </>
    //     );
    // }

    return (
        <Layout>
            {JSON.stringify(fallbackData)}
            <Link href="/">Home</Link>
        </Layout>
    );
};

export default SingleUser;

SingleUser.getInitialProps = async (ctx: NextPageContext) => {
    const userId = ctx.query.id;
    const resx = await fetcher(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/users/${userId}`, ctx);
    return { fallbackData: resx };
};

// export const getServerSideProps: GetServerSideProps = async context => {
//     const userId = context.query.id;
//     const data = await fetcher(
//         `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/users/${userId}`,
//         context.req.headers
//     );
//     console.log(userId, context.req.headers);
//     return { props: { fallbackData: data } };
// };
