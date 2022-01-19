/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
    title: "Minvest",
    titleTemplate: "%s | Minvest",
    defaultTitle: "Minvest",
    description: "MAdmin DashBoard",
    openGraph: {
        url: "https://admin.minvest.mayaenterprises.co.in",
        title: "minvest",
        description: "MAdmin DashBoard",
        images: [
            {
                url: "https://admin.minvest.mayaenterprises.co.in",
                alt: "minvest.MayaEnterprises.co.in og-image",
            },
        ],
        site_name: "minvest",
    },
    twitter: {
        handle: "@minvest",
        cardType: "summary_large_image",
    },
};

export default defaultSEOConfig;
