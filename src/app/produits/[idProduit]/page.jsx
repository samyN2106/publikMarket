import Button from "@/composants/Button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduits } from "@/lib/getProduits";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }) {
  const { idProduit } = await params;
  const AllProduits = await getProduits();
  const Currentproduit = AllProduits.find((pd) => pd.id == idProduit);
  return {
    title: `${Currentproduit.nomProduit} | PublikMarket`,
    description: `Achetez ${Currentproduit.nomProduit} au meilleur prix sur PublikMarket.`,
  };
}

export default async function produitId({ params }) {
  const { idProduit } = await params;

  const AllProduits = await getProduits();

  const Currentproduit = AllProduits.find((pd) => pd.id == idProduit);

  if (!Currentproduit) return notFound();

  const boutiqueId = Currentproduit?.boutiqueId;

  const Nomboutique = await prisma.boutique.findUnique({
    where: { id: boutiqueId },
    select: { name: true },
  });

  return (
    <>
      <header>
        <nav className="flex justify-end p-[20px]">
          <div>
            <Button
              href={`/MarketEspace/${boutiqueId}-${encodeURIComponent(
                Nomboutique.name
              )}`}
            >
              Voir tous les produits de ce vendeur
            </Button>
          </div>
        </nav>
      </header>

      <main className="max-w-[1200px] mx-auto  mt-[30px] max-[1300px]:mx-[50px]">
        <section className="mb-[100px]">
          <h2 className="text-center text-[30px] font-bold mb-[30px]">
            {Currentproduit.nomProduit}
          </h2>
          {
            <div className="flex max-[760px]:flex-col ">
              <div className="w-[50%] max-[760px]:w-full h-[450px] mr-[30px] relative">
                <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
                  {Currentproduit.price}FCFA
                </span>
                <Image
                  fill
                  src={Currentproduit.image}
                  alt={Currentproduit.nomProduit}
                />
              </div>
              <div className="w-[50%] max-[760px]:w-full text-2xl flex flex-col max-[760px]:flex-col-reverse justify-center gap-[50px]">
                <div>
                  <p>
                    <strong style={{ textDecoration: "underline" }}>
                      Numero(s) a contacter
                    </strong>
                    : {Currentproduit.numAContacter}
                  </p>
                  <p>
                    <strong style={{ textDecoration: "underline" }}>
                      Point(s) de livraison
                    </strong>
                    : {Currentproduit.pointLivraison}
                  </p>
                </div>
                <p className=" font-black ">
                  Contactez le vendeur pour echanger par rapport a ce produit
                </p>

                <div>
                  <strong style={{ textDecoration: "underline" }}>
                    Description
                  </strong>

                  <p className="text-xl">{Currentproduit.description}</p>
                </div>
              </div>
            </div>
          }
        </section>
      </main>
    </>
  );
}
