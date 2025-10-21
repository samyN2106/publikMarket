import Link from "next/link";
import Button from "./Button";
export default function Footer() {
  return (
    <footer className="mt-20 xl:mt-32 mx-auto w-full relative text-center bg-gray-200 text-[#646464]">
      <div className="px-6 py-8 md:py-14 xl:pt-20 xl:pb-12">
        <h2 className="font-bold text-3xl xl:text-4xl leading-snug mb-[40px]">
          Rejoignez notre communauté de vendeurs et acheteurs passionnés !
        </h2>
        <Button href="">Publier un produit</Button>
        <div className="mt-[40px] xl:mt-20">
          <nav className="flex flex-wrap justify-center text-lg font-medium">
            <div className="px-5 py-2">
              <Link href="#">Acceuil</Link>
            </div>
            <div className="px-5 py-2">
              <Link href="#">Notre blog</Link>
            </div>
            <div className="px-5 py-2">
              <Link href="#">Contact</Link>
            </div>
          </nav>
          <p className="mt-7 text-base">© 2025 XYZ, LLC</p>
        </div>
      </div>
    </footer>
  );
}
