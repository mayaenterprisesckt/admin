import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import Router from "next/router";
import { parseCookies } from "nookies";

export async function fetcher(url: string, ctx: NextPageContext) {
    const jwt = parseCookies(ctx).token;
    const resp = await fetch(url, {
        credentials: "include",
        headers: {
            Authorization: jwt,
        },
    });

    if (resp.status === 401 && !ctx.req) {
        Router.replace("/login");
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: "http://localhost:3000/login",
        });
        ctx.res?.end();
        return;
    }

    const json = await resp.json();
    return json;
}

// import axios from "axios";
// import { parseCookies } from "nookies";

// const fetcher = async <T>(url: string, ctx?: any): Promise<T | null> => {
//     const jwt = parseCookies(ctx).token;
//     const cookies = parseCookies(ctx);
//     try {
//         const { data } = await axios.get<T>(url, {
//             withCredentials: true,
//             headers: {
//                 cookie: JSON.stringify(cookies),
//                 Authorization: jwt,
//             },
//         });

//         return data;
//     } catch (e) {
//         return null;
//     }
// };

// export default fetcher;
