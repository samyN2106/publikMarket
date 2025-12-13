import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduits } from "@/app/getProduits";

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

  const produits = await AllProduits.filter(
    (pd) => pd.boutiqueId == produit.boutiqueId
  );

  return (
    <>
      <header>
        <h1 className="ml-[10px] text-3xl max-[430px]:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-500  py-6 drop-shadow-lg">
          Espace {produit.boutique.name}
        </h1>
      </header>

      <main className="max-w-[1200px] min-[760px]:mx-auto mt-[30px]">
        <section className="mb-[100px]">
          <h2 className="text-center text-[30px] font-bold mb-[30px]">
            {produit.nomProduit}
          </h2>
          {
            <div className="flex max-[760px]:flex-col items-center max-[1300px]:mx-[50px] max-[900px]:mx-[20px]">
              <div className="w-[50%] max-[760px]:w-full mb-[20px] min-[760px]:h-[450px] max-[760px]:h-[350px] min-[760px]:mr-[30px] relative">
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

        <section className="max-w-[1400px]  mx-auto max-[600px]:mx-[5px]   grid grid-cols-4 max-[1000px]:grid-cols-3 max-[600px]:grid-cols-2  gap-3">
          {produits.map((pd) => {
            return (
              <Link
                key={pd.id}
                href={`/MarketEspace/${produit.boutiqueId}-${produit.boutique.name}/${pd.id}`}
              >
                <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm  overflow-hidden mx-auto">
                  <span className="absolute bg-white right-0 top-0  z-10 font-bold min-[1000px]:text-xl text-red-600">
                    <p className="px-[10px]">{pd.price} FCFA</p>
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
