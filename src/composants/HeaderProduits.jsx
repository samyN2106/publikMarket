"use client";
import Button from "@/composants/Button";
import { useState, useEffect } from "react";

export default function HeaderProduits({ children }) {
  const [session, setSession] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function getSession() {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();
        if (data) setSession(data.session);
      } catch (err) {
        console.error("Erreur lors de la récupération de la session:", err);
      }
    }
    getSession();
  }, []);

  const espaceUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/MarketEspace/${
    session ? session : ""
  }`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(espaceUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset après 2s
    } catch (err) {
      console.error("Erreur lors de la copie :", err);
    }
  };

  return (
    <header className="mb-[50px]" style={{ borderBottom: "1px solid #c6c6c6" }}>
      <nav className="flex justify-around items-center max-[816px]:flex-col-reverse py-[20px] gap-4 mx-[20px]">
        {children}
        <div className="max-[816px]:w-full flex justify-end">
          {session ? (
            <div className="flex flex-col  gap-1.5 justify-end">
              <Button href="/dashboard">Publier un produit</Button>
              {copied ? (
                <div
                  onClick={copyToClipboard}
                  className=" text-center border border-[1px] border-black cursor-pointer  text-black font-black py-[10px] px-[15px] block text-[17px] rounded-[50px]"
                >
                  <span>Lien copié !</span>
                </div>
              ) : (
                <div
                  onClick={copyToClipboard}
                  className="bg-[#9e86ba] text-center cursor-pointer  text-white font-black py-[12px] px-[15px] block text-[17px] rounded-[50px]"
                >
                  <span className="flex gap-1 items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                        />
                      </svg>
                    </span>
                    <span>Copier le lien de mon espace</span>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <Button href="/">Publier un produit</Button>
          )}
        </div>
      </nav>
    </header>
  );
}
