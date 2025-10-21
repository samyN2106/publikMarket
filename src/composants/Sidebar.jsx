import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#494646] text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="text-xl">
        <li className="mb-3">
          <Link href="/dashboard" className="hover:underline">
            Acceuil
          </Link>
        </li>

        <li className="mb-3">
          <Link href="/dashboard/produits" className="hover:underline">
            Produits
          </Link>
        </li>

        <li className="mb-3">
          <Link href="/dashboard/ajouterProduit" className="hover:underline">
            Ajouter un produit
          </Link>
        </li>
        <li className="mb-3">
          <Link href="#" className="hover:underline">
            Paiements
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:underline">
            Retour au site
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
