import fetch from "isomorphic-unfetch";
import Router from "next/router";
import { getAccessToken } from "./accessToken";

export async function fetcher(url: string, ctx: any) {
    const jwt = getAccessToken(ctx);
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
            Location: `${process.env.NEXT_PUBLIC_SELF_ENDPOINT}/login`,
        });
        ctx.res?.end();
        return;
    }

    const json = await resp.json();
    return json;
}
