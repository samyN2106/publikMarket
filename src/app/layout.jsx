import "./globals.css";

export const metadata = {
  title: "PublikMarket",
  description:
    "Publiez et vendez vos produits en toute simplicité grâce à notre système d’abonnement sécurisé.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="">{children}</body>
    </html>
  );
}
