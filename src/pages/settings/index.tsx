import React from "react";
// Chakra imports
// Custom components

// Assets

import CardProfile from "@/components/Card/CardProfile";
// import CardSettings from "@/components/Card/CardSettings";
import Layout from "@/Layout/Index";

function Settings() {
    // const { data } = useSwr<User.User | null>(
    //     `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
    //     fetcher,
    //     {
    //         fallbackData,
    //     }
    // );
    return (
        <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4">{/* <CardSettings /> */}</div>
            {/* <div className="w-full lg:w-4/12 px-4"> */}
            <CardProfile />
            {/* </div> */}
        </div>
    );
}
Settings.PageLayout = Layout;

export default Settings;

// export const getServerSideProps: GetServerSideProps = async context => {
//     const { req } = context;
//     const session = await getSession({ req });
//     // console.log(session);
//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/auth/login",
//                 permanent: false,
//             },
//         };
//     }
//     // if (session?.user?.usertype === "DIS") {
//     //     return {
//     //         redirect: {
//     //             destination: "/",
//     //             permanent: false,
//     //         },
//     //     };
//     // }
//     const data = await fetcher(
//         `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`,
//         req
//     );
//     const me: User.User = await data;
//     return {
//         props: {
//             fallbackData: me,
//         },
//     };
// };
