import "./globals.css";
import Script from "next/script";
export const metadata = {
  title: "PublikMarket",
  description:
    "Publiez et vendez vos produits en toute simplicité grâce à notre système d’abonnement sécurisé.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "PublikMarket",
    description: "Marketplace sécurisée pour publier et vendre vos produits.",
    url: "https://publik-market.vercel.app",
    siteName: "PublikMarket",
    images: [
      {
        url: "https://publik-market.vercel.app/og-default.png",
        width: 1200,
        height: 630,
        alt: "PublikMarket - Marketplace sécurisée",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@PublikMarket", // si tu as un compte Twitter
    creator: "@PublikMarket",
    title: "PublikMarket",
    description: "Marketplace sécurisée pour publier et vendre vos produits.",
    images: ["https://publik-market.vercel.app/og-default.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
