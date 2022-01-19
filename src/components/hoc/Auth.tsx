import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState, useEffect, ReactNode } from "react";

function Auth({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const jwt = parseCookies()._li;
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT2}/auth/api/authenticate`, {
            credentials: "include",
            headers: {
                Authorization: jwt,
            },
        }).then(async x => {
            const user = await x.json();
            if (user.user.usertype === "USER") {
                router.push("http://minvest.mayaenterprises.co.in");
            }
            setLoading(false);
        });
    }, [jwt, router]);

    if (loading) {
        return <div>loading...</div>;
    }

    return <>{children}</>;
}

export default Auth;
