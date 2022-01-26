import Head from "next/head";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import "@fontsource/lexend/latin.css";
import { ThemeProvider } from "next-themes";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import customTheme from "../styles/theme";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import defaultSEOConfig from "../../next-seo.config";
import createEmotionCache from "../styles/createEmotionCache";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import Router, { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

const clientSideEmotionCache = createEmotionCache();

// interface MyAppProps extends AppProps {
//     emotionCache?: EmotionCache;
// }

type ComponentWithPageLayout = AppProps & {
    emotionCache?: EmotionCache;
    Component: AppProps["Component"] & {
        PageLayout?: React.ComponentType;
    };
};

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
    NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
    NProgress.done();
});

Router.events.on("routeChangeError", () => {
    NProgress.done();
});
const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
    emotionCache = clientSideEmotionCache,
}: ComponentWithPageLayout) => {
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider
                    attribute="class"
                    storageKey="chakra-ui-color-mode"
                    defaultTheme="light"
                >
                    <ChakraProvider theme={customTheme}>
                        <Head>
                            <meta
                                name="viewport"
                                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                            />
                        </Head>
                        <DefaultSeo {...defaultSEOConfig} />
                        {Component.PageLayout ? (
                            <Auth>
                                <Component.PageLayout>
                                    <Component {...pageProps} />
                                </Component.PageLayout>
                            </Auth>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </ChakraProvider>
                </ThemeProvider>
            </CacheProvider>
        </SessionProvider>
    );
};

MyApp.defaultProps = {
    emotionCache: clientSideEmotionCache,
};

export default MyApp;

function Auth({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/login");
        },
    });
    if (typeof window === "undefined") {
        return (
            <>
                <div className="flex justify-center items-center h-screen">
                    <Spinner color="red.500" size={"xl"} />
                </div>
            </>
        );
    }
    if (status === "loading") {
        return (
            <>
                <div className="flex justify-center items-center h-screen">
                    <Spinner color="red.500" size={"xl"} />
                </div>
            </>
        );
    }
    return <>{children}</>;
}
