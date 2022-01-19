import { parseCookies, setCookie } from "nookies";

export const setAccessToken = (s: any) => {
    setCookie(null, "_li", s, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        sameSite: "strict",
        // httpOnly: true,sss
        // u cannont set httpOnly cookie in browser
    });
};

export const getAccessToken = (context: any) => {
    const jwt = parseCookies(context)._li;
    return jwt;
};
