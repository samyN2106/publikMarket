import "../globals.css";
import Footer from "@/composants/Footer";

export const metadata = {
  title: "produits | PublikMarket",
};

export default function LayoutProduit({ children }) {
  return (
    <section>
      {children}
      <Footer />
    </section>
  );
}
