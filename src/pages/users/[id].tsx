import { fetcher } from "@/app/lib/fetcher";
import Layout from "@/components/layout";
import { Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react";
import { NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSwr from "swr";

const SingleUser: any = ({ fallbackData }: any) => {
    const router = useRouter();
    const userId = router.query.id;
    const { data } = useSwr<any | null>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/users/${userId}`,
        fetcher,
        { refreshInterval: 400000, revalidateOnFocus: false, fallbackData }
    );

    return (
        <Layout>
            <Table variant="simple">
                <TableCaption>Usertable</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>email</Th>
                        <Th>profile</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* {JSON.stringify(data)} */}
                    {/* {JSON.stringify(data.data)} */}
                    <div>
                        <Link href={"/pro"}>Pro</Link>
                    </div>
                    {Object.entries(data.data).map(([k, v]) => (
                        <Tr key={k}>
                            <Td>{k}</Td>
                            {/* @ts-ignore */}
                            <Td>{v}</Td>
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>table footer</Tfoot>
            </Table>

            <Link href="/">Home</Link>
        </Layout>
    );
};

export default SingleUser;

SingleUser.getInitialProps = async (ctx: NextPageContext) => {
    const userId = ctx.query.id;
    const resx = await fetcher(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT4}/users/${userId}`, ctx);
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
