import "../globals.css";
import Footer from "@/composants/Footer";



export default function MarketEspaceLayout({ children }) {
  return (
    <section>
      {children}
      <Footer />
    </section>
  );
}
