import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        res.setHeader("Set-Cookie", [
            cookie.serialize("access", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                expires: new Date(0),
                sameSite: "strict",
                path: "/api/",
            }),
            cookie.serialize("refresh", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                expires: new Date(0),
                sameSite: "strict",
                path: "/api/",
            }),
        ]);

        return res.status(200).json({
            success: "Successfully logged out",
        });
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({
            error: `Method ${req.method} now allowed`,
        });
    }
};