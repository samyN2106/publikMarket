"use client";

import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
export default function Navbar() {
  const [afficherNavbar, setAfficherNavbar] = useState(false);

  return (
    <nav className="font-semibold flex justify-between text-[17px] py-[15px] px-[50px] items-center">
      <div className=" flex justify-between w-full items-center max-[900px]:hidden">
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
      </div>

      <div
        style={{ boxShadow: "-1px 1px 12px 0px" }}
        className={`${"bg-white  fixed  top-0 right-0 z-10"} ${
          !afficherNavbar ? "hidden" : "block"
        }`}
      >
        <div className="w-full flex justify-end px-[10px] pt-[10px]">
          <span
            className="cursor-pointer"
            onClick={() => setAfficherNavbar(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.6}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
        </div>
        <div className="flex flex-col items-center gap-3 p-[30px]">
          <Link href="">Acceuil</Link>
          <Link className="mx-[30px]" href="">
            Contact
          </Link>
          <Link href="">Notre blog</Link>

          <Button href="/produits">Se connecter</Button>
          <Button href="/produits">Voir les produits</Button>
        </div>
      </div>

      <span
        onClick={() => setAfficherNavbar(true)}
        className={
          "cursor-pointer hidden max-[900px]:block max-[900px]:my-0 max-[900px]:mr-0 max-[900px]:ml-auto"
        }
      >
        <svg
          className={`size-9 ${afficherNavbar ? "hidden" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.9}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </span>
    </nav>
  );
}
