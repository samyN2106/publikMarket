import Link from "next/link";
import Image from "next/image";
import HeaderProduits from "@/composants/HeaderProduits";
import { notFound } from "next/navigation";
import { getProduits } from "@/app/getProduits";

export const metadata = {
  title: "MarketEspace | PublikMarket",
};

export default async function EspaceVente({ params }) {
  const AllProduits = await getProduits();
  const { IdBoutiqueVendeur } = await params;
  const boutiqueId = parseInt(IdBoutiqueVendeur);

  const verifBoutique = AllProduits.find((pd) => pd.boutiqueId == boutiqueId);
  if (!verifBoutique) {
    return notFound();
  }

  const produits = await AllProduits.filter(
    (pd) => pd.boutiqueId === boutiqueId
  );

  return (
    <>
      <HeaderProduits />

      <div className="mb-[30px]">
        <h1 className="text-6xl max-[430px]:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-500 text-center py-6 drop-shadow-lg">
          Bienvenue chez {produits[0].boutique.name}
        </h1>
      </div>

      <article className="max-w-[1400px]  mx-auto  max-[600px]:mx-[5px]   grid grid-cols-4 max-[1000px]:grid-cols-3 max-[600px]:grid-cols-2  gap-3   ">
        {produits.map((pd) => {
          return (
            <Link
              key={pd.id}
              href={`/MarketEspace/${pd.boutiqueId}/${pd.id}`}
            >
              <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm overflow-hidden mx-auto mt-4">
                <span className="absolute bg-white right-0 top-0  z-10 font-bold text-full text-red-600">
                  <p className="px-[5px]">{pd.price} FCFA</p>
                </span>
                <div className="aspect-[3/2] ">
                  <Image src={pd.image} alt={pd.nomProduit} fill />
                </div>
              </div>
            </Link>
          );
        })}
      </article>
    </>
  );
}
