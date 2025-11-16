import "./globals.css";

export const metadata = {
  title: "PublikMarket",
  description:
    "Publiez et vendez vos produits en toute simplicité grâce à notre système d’abonnement sécurisé.",
  openGraph: {
    title: "PublikMarket",
    description: "Marketplace sécurisée pour publier et vendre vos produits.",
    url: "https://publik-market.vercel.app",
    siteName: "PublikMarket",
    images: [{ url: "https://publik-market.vercel.app/og-default.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PublikMarket",
    description: "Marketplace sécurisée pour publier et vendre vos produits.",
    images: ["https://publik-market.vercel.app/og-default.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <meta charSet="UTF-8" />
      <body>{children}</body>
    </html>
  );
}
