"use client";
import Button from "@/composants/Button";
import { useState, useEffect } from "react";

export default function HeaderProduits({ children }) {
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    async function getSession() {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();
        setSession(data.session);
      } catch (err) {
        console.error("Erreur lors de la récupération de la session:", err);
      }
    }
    getSession();
  }, []);

  return (
    <header className="mb-[50px]" style={{ borderBottom: "1px solid #c6c6c6" }}>
      <nav className="flex justify-around items-center max-[816px]:flex-col-reverse py-[20px] gap-4 mx-[20px]">
        {children}
        <div className="max-[816px]:w-full flex justify-end">
          {session ? (
            <Button href="/dashboard">Publier un produit</Button>
          ) : (
            <Button href="/">Publier un produit</Button>
          )}
        </div>
      </nav>
    </header>
  );
}
