import Link from "next/link";

export default function Produit() {
  return (
    <main className="flex-1 p-[30px]">
      <h2 className="text-3xl font-bold mb-8">Produits</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "30px",
        }}
      >
        <Link href="">
          <div class="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
            <div className="aspect-[3/2] ">
              <img
                className="object-center w-full h-full"
                src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
                alt="Picture of the author"
              />
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
