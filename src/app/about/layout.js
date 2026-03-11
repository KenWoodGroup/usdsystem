export const metadata = {
    title: "О компании | USD System",
    description: "USD System — цифровая трансформация бизнеса.",

    alternates: {
        canonical: "https://usd-system.uz/about",
    },

    openGraph: {
        title: "О компании | USD System",
        description: "USD System — цифровая трансформация бизнеса.",
        url: "https://usd-system.uz/about",
        siteName: "USD System",
        images: [
            {
                url: "https://usd-system.uz/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "USD System",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "О компании | USD System",
        description: "USD System — цифровая трансформация бизнеса.",
        images: ["https://usd-system.uz/og-image.jpg"],
    },
};

export default function AboutLayout({ children }) {
    return <>{children}</>;
}
