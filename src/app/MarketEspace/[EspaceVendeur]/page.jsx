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
  const [id] = await params.EspaceVendeur.split("-");
  const boutiqueId = parseInt(id);



  const produits = await AllProduits.filter(
    (pd) => pd.boutiqueId === boutiqueId
  );

  if (!produits || produits.length === 0) {
    return notFound();
  }

  return (
    <>
      <HeaderProduits />

      <div className="mb-[30px]">
        <h1 className="text-6xl max-[430px]:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-500 text-center py-6 drop-shadow-lg">
          Bienvenue chez {produits[0].boutique.name}
        </h1>
      </div>

      <article className="max-w-[1400px]  mx-auto max-[1460]:mx-[20px]  grid grid-cols-4 max-[1000px]:grid-cols-3 max-[600px]:grid-cols-2 max-[418px]:grid-cols-1 gap-4 ">
        {produits.map((pd) => {
          return (
            <Link
              key={pd.id}
              href={`/MarketEspace/${pd.boutiqueId}-${pd.boutique.name}/${pd.id}`}
            >
              <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-[23px] text-red-600">
                  {pd.price} FCFA
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
