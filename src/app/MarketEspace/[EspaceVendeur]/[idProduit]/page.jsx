import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getProduits } from "@/lib/getProduits";

export async function generateMetadata({ params }) {
  const { idProduit } = await params;
  const AllProduits = await getProduits();
  const Currentproduit = AllProduits.find((pd) => pd.id == idProduit);
  return {
    title: `${Currentproduit.nomProduit} | PublikMarket`,
    description: `Achetez ${Currentproduit.nomProduit} au meilleur prix sur PublikMarket.`,
  };
}

export default async function Espaceproduit({ params }) {
  const { idProduit } = await params;
  const AllProduits = await getProduits();

  const produit = await AllProduits.find((pd) => pd.id == idProduit);
  if (!produit || produit.lenght === 0) return notFound();

  const boutiqueId = produit?.boutiqueId;

  const boutiqueName = await prisma.Boutique.findUnique({
    where: { id: boutiqueId },
    select: { name: true },
  });

  const produits = await AllProduits.filter(
    (pd) => pd.boutiqueId === boutiqueId
  );

  return (
    <>
      <header>
        <h1 className="ml-[10px] text-3xl max-[430px]:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-500  py-6 drop-shadow-lg">
          Espace {boutiqueName.name}
        </h1>
      </header>

      <main className="max-w-[1200px] mx-auto  mt-[30px] max-[1300px]:mx-[50px]">
        <section className="mb-[100px]">
          {
            <div className="flex max-[760px]:flex-col ">
              <div className="w-[50%] max-[760px]:w-full h-[450px] mr-[30px] relative">
                <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
                  {produit.price} FCFA
                </span>
                <Image fill src={produit.image} alt={produit.nomProduit} />
              </div>
              <div className="w-[50%] max-[760px]:w-full text-2xl flex flex-col max-[760px]:flex-col-reverse justify-center gap-[50px]">
                <div>
                  <p>
                    <strong style={{ textDecoration: "underline" }}>
                      Numero(s) a contacter
                    </strong>
                    : {produit.numAContacter}
                  </p>
                  <p>
                    <strong style={{ textDecoration: "underline" }}>
                      Point(s) de livraison
                    </strong>
                    : {produit.pointLivraison}
                  </p>
                </div>
                <p className=" font-black ">
                  Contactez le vendeur pour echanger par rapport a ce produit
                </p>

                <div>
                  <strong style={{ textDecoration: "underline" }}>
                    Description
                  </strong>

                  <p className="text-xl">{produit.description}</p>
                </div>
              </div>
            </div>
          }
        </section>

        <section className="grid grid-cols-3 max-[1000px]:grid-cols-2  max-[444px]:grid-cols-1 gap-4 ">
          {produits.map((pd) => {
            return (
              <Link
                key={pd.id}
                href={`/MarketEspace/${boutiqueId}-${boutiqueName.name}/${pd.id}`}
              >
                <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                  <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
                    {pd.price} FCFA
                  </span>
                  <div className="aspect-[3/2] ">
                    <Image src={pd.image} alt={pd.nomProduit} fill />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </>
  );
}
