import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "my-project",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                    placeholder: "jsmith@example.com",
                },
                password: { label: "Password", type: "password" },
                // tenantKey: {
                //   label: "Tenant Key",
                //   type: "text",
                // },
            },
            async authorize(credentials, _req) {
                const payload = {
                    username: credentials?.username,
                    password: credentials?.password,
                };

                const resx = await fetch(
                    `https://maya-enterprises-api.herokuapp.com/auth/api/authenticate-admin`,
                    {
                        method: "POST",
                        body: JSON.stringify(payload),
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            // tenant: credentials.tenantKey,
                            "Accept-Language": "en-US",
                        },
                    }
                );
                const user = await resx.json();
                if (!resx.ok) {
                    throw new Error(user.message);
                }
                if (user.user.usertype !== "ADM") {
                    console.log(user.user.usertype);
                    throw new Error(user.message);
                }

                // If no error and we have user data, return it
                if (resx.ok && user) {
                    return user;
                }

                // Return null if user data could not be retrieved
                return null;
            },
        }),
        // ...add more providers here
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET,
    pages: {
        error: "/auth/login",
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            user && (token.user = user);
            if (account && user) {
                // console.log("======>" + user);
                return {
                    ...token,
                    accessToken: user.token,
                    // refreshToken: user.refresh_token,
                };
            }

            return token;
        },

        async session({ session, token }) {
            // @ts-ignore
            // console.log(token.user);
            session.accessToken = token.accessToken;
            // @ts-ignore
            session = token.user;
            // session?.user?.refreshToken = token.refreshToken;
            // session?.user?.accessTokenExpires = token.accessTokenExpires;

            return session;
        },
    },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code #33FF5D
        logo: "/vercel.svg", // Absolute URL to image
    },
    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === "development",
});
