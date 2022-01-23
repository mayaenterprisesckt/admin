import Layout from "@/Layout/Index";
import Home from "../containers/home";

function Index({}) {
    // const { data: session, status } = useSession();
    // const { data } = useSwr<any | null>(
    //     `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
    //     fetcher,
    //     {
    //         fallbackData,
    //     }
    // );
    return <Home />;
}

Index.PageLayout = Layout;

export default Index;
