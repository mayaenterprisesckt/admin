/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
    title: "madnin",
    titleTemplate: "%s | madnin",
    defaultTitle: "madnin",
    description: "MAdmin DashBoard",
    openGraph: {
        url: "https://admin.madnin.mayaenterprises.co.in",
        title: "madnin",
        description: "MAdmin DashBoard",
        images: [
            {
                url: "https://admin.madnin.mayaenterprises.co.in",
                alt: "madnin.MayaEnterprises.co.in og-image",
            },
        ],
        site_name: "madnin",
    },
    twitter: {
        handle: "@madnin",
        cardType: "summary_large_image",
    },
};

export default defaultSEOConfig;
