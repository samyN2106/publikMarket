import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/crypto";
import Image from "next/image";
import { getProduits } from "@/lib/getProduits";

export default async function Produit() {
  const setCookies = await cookies();
  const session = setCookies.get("myapp_session")?.value;
  if (!session) redirect("/");
  const AllProduits = await getProduits();
  const boutiqueId = await decrypt(session);
  const produitsAdd = AllProduits.filter(
    (pd) => pd.boutiqueId === parseInt(boutiqueId)
  );

  return (
    <main className="flex-1 p-[30px] min-[1100px]:ml-64">
      <h2 className="text-3xl font-bold mb-8">Produits</h2>
      <div className="grid grid-cols-3 max-[840px]:grid-cols-2  max-[418px]:grid-cols-1 gap-3 ">
        {produitsAdd.map((produit) => {
          return (
            <Link key={produit.id} href={`/dashboard/produits/modifierProduit/${produit.id}`}>
              <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="aspect-[3/2] ">
                  <Image src={produit.image} alt={produit.nomProduit} fill />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
