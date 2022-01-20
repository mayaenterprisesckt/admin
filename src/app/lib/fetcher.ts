import fetch from "isomorphic-unfetch";
import { getToken } from "next-auth/jwt";
export async function fetcher(url: string, req: any) {
    const secret = process.env.JWT_SECRET!;
    const token = await getToken({ req, secret });
    const jwt = token!.accessToken;
    const resp = await fetch(url, {
        credentials: "include",
        headers: {
            Authorization: jwt as string,
        },
    });

    // if (resp.status === 401 && !ctx.req) {
    //     Router.replace("/login");
    //     return {};
    // }

    // if (resp.status === 401 && ctx.req) {
    //     ctx.res?.writeHead(302, {
    //         Location: `${process.env.NEXT_PUBLIC_SELF_ENDPOINT}/login`,
    //     });
    //     ctx.res?.end();
    //     return;
    // }

    const json = await resp.json();
    return json;
}
