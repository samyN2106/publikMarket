import Link from "next/link";
import Button from "@/composants/Button";
export default function Produit() {
  return (
    <>
      <header style={{ borderBottom: "1px solid #c6c6c6" }}>
        <nav className="flex justify-around items-center max-[816px]:flex-col-reverse py-[20px] gap-4 mx-[20px]">
          <form className="flex w-[70%]  max-[816px]:w-full" action="">
            <input
              style={{
                borderLeft: "1px solid gray",
                borderTop: " 1px solid gray",
                borderBottom: "1px solid gray",
                borderBottomLeftRadius: " 50px",
                borderTopLeftRadius: "50px",
              }}
              className="w-full h-[50px] outline-0 px-[20px] "
              type="search"
              placeholder="Rechercher un produit ..........."
            />

            <span
              className="flex items-center px-[10px]"
              style={{
                borderRight: "1px solid gray",
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
                borderTopRightRadius: "50px",
                borderBottomRightRadius: "50px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
          </form>
          <div className="max-[816px]:w-full flex justify-end">
            <Button href="">Publier un produit</Button>
          </div>
        </nav>
      </header>

      <article className=" max-w-[1400px] mx-[30px] grid grid-cols-4 max-[1000px]:grid-cols-3 max-[550px]:grid-cols-2 max-[380px]:grid-cols-1 gap-4 ">
        <Link href="/produits/2">
          <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
            <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
              30$
            </span>
            <div className="aspect-[3/2] ">
              <img
                className="object-center w-full"
                src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
                alt="Picture of the author"
              />
            </div>
          </div>
        </Link>
        <Link href="/produits/2">
          <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
            <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
              30$
            </span>
            <div className="aspect-[3/2] ">
              <img
                className="object-center w-full"
                src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
                alt="Picture of the author"
              />
            </div>
          </div>
        </Link>
        <Link href="/produits/2">
          <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
            <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
              30$
            </span>
            <div className="aspect-[3/2] ">
              <img
                className="object-center w-full"
                src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
                alt="Picture of the author"
              />
            </div>
          </div>
        </Link>
        <Link href="/produits/2">
          <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
            <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
              30$
            </span>
            <div className="aspect-[3/2] ">
              <img
                className="object-center w-full"
                src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
                alt="Picture of the author"
              />
            </div>
          </div>
        </Link>
        <Link href="/produits/2">
          <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
            <span className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-xl text-red-600">
              30$
            </span>
            <div className="aspect-[3/2] ">
              <img
                className="object-center w-full"
                src="https://d2aabgjce9enf.cloudfront.net/main/media/content/5/d/5d85c6fc71a6f180e10da000287864e185249b21.jpg"
                alt="Picture of the author"
              />
            </div>
          </div>
        </Link>
      </article>
    </>
  );
}
