import Link from "next/link";
import Button from "./Button";
export default function Navbar() {
  return (
    <nav className="font-semibold flex justify-between text-[17px] py-[15px] px-[50px]  items-center ">
      <ul>
        <Link href="">Acceuil</Link>
        <Link className="mx-[30px]" href="">
          Contact
        </Link>
        <Link href="">Notre blog</Link>
      </ul>

      <div className="flex gap-5">
        <Button href="/produits">Se connecter</Button>
        <Button href="/produits">Voir les produits</Button>
      </div>
    </nav>
  );
}
