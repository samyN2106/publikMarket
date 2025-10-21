import Button from "@/composants/Button";
import Link from "next/link";
export default function produitId() {
  return (
    <>
      <header>
        <nav className="flex justify-end p-[20px]">
          <div>
            <Button href="">Voir tous les produits de ce vendeur</Button>
          </div>
        </nav>
      </header>

      <main className="max-w-[1200px] mx-auto  mt-[30px]">
        <section className="mb-[100px]">
          <div className="flex">
            <div className="w-[75%] h-[60vh] mr-[30px] relative">
              <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
                30$
              </span>
              <img
                className="w-full h-full"
                src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
              />
            </div>
            <div className="w-[25%] text-2xl flex flex-col justify-center">
              <p>
                <strong style={{ textDecoration: "underline" }}>
                  Nom du vendeur
                </strong>
                : Samuel nayo
              </p>
              <p>
                <strong style={{ textDecoration: "underline" }}>Contact</strong>
                : 050554706471
              </p>
              <p>
                <strong style={{ textDecoration: "underline" }}>
                  Les points de livraison
                </strong>
                : tout abidjan
              </p>
              <p className="mt-[70px] font-black ">
                Contactez le vendeur pour echanger par rapport a ce produit
              </p>
            </div>
          </div>
          <div>
            <p className="text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum odit
              voluptatem iste earum amet fugit possimus laborum error nisi quis
              omnis obcaecati, necessitatibus dignissimos tenetur magnam
              distinctio blanditiis! Provident, nemo! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aliquam, voluptatum dolorum
              inventore doloribus culpa quia quos qui dolore laudantium
              aspernatur, iure minima distinctio harum voluptate atque maxime
              exercitationem obcaecati saepe? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quam natus sequi rem magni,
              dignissimos odit in eius quis, non nostrum placeat exercitationem
              similique adipisci voluptate debitis consequatur quae quod
              excepturi?
            </p>
          </div>
        </section>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "30px",
          }}
        >
          <Link href="">
            <div class="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
              <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
                30$
              </span>
              <div class="aspect-[3/2] ">
                <img
                  className="object-center w-full"
                  src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
                  alt="Picture of the author"
                  fill
                />
              </div>
            </div>
          </Link>
          <Link href="">
            <div class="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
              <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
                30$
              </span>
              <div class="aspect-[3/2] ">
                <img
                  className="object-center w-full"
                  src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
                  alt="Picture of the author"
                />
              </div>
            </div>
          </Link>
          <Link href="">
            <div class="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
              <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
                30$
              </span>
              <div class="aspect-[3/2] ">
                <img
                  className="object-center w-full"
                  src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
                  alt="Picture of the author"
                />
              </div>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
