"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HeaderProduits from "@/composants/HeaderProduits";
import { Search } from "@/composants/Search";

export default function Produit() {
  const [produits, setProduits] = useState([]);
  const [produitsSearch, setProduitsSearch] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [pageSearch, setPageSearch] = useState(null);
  const haveMore = useRef(null);
  const [chargerment, setChargement] = useState(true);

  useEffect(() => {
    async function recupProduits() {
      const res = await fetch(`/api/AllProduits?page=${page}&limit=5`);
      const rep = await res.json();
      setProduits((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const nouveaux = rep.produits.filter((p) => !ids.has(p.id));
        return [...prev, ...nouveaux];
      });

      if (page >= rep.totalPages) {
        setChargement(false);
      }
    }
    recupProduits();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!query) {
          setPage((p) => p + 1);
        } else {
          setPageSearch((p) => p + 1);
        }
      }
    });

    if (haveMore.current) observer.observe(haveMore.current);

    return () => observer.disconnect();
  }, []);

  function handleSearch(q) {
    setProduitsSearch([]);
    setPageSearch(1);
    setQuery(q);
    setChargement(true);
  }

  useEffect(() => {
    if (!query) return;

    async function search() {
      const res = await fetch(
        `/api/search?q=${query}&page=${pageSearch}&limit=5`
      );
      const rep = await res.json();
      setProduitsSearch([...rep.produits]);

      if (pageSearch >= rep.totalPages) {
        setChargement(false);
      }
    }
    search();
  }, [query, pageSearch]);

  useEffect(() => {
    if (query) return; // si recherche active, ne pas charger AllProduits

    async function recupProduits() {
      const res = await fetch(`/api/AllProduits?page=${page}&limit=5`);
      const rep = await res.json();

      setProduits((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const nouveaux = rep.produits.filter((p) => !ids.has(p.id));
        return [...prev, ...nouveaux];
      });

      if (page >= rep.totalPages) {
        setChargement(false);
      }
    }
    recupProduits();
  }, [page, query]);




  return (
    <>


      <HeaderProduits>
        <Search onSearch={handleSearch} />
      </HeaderProduits>


      <article className="max-w-[1400px] mx-auto max-[1460]:mx-[20px]  grid grid-cols-4 max-[1000px]:grid-cols-3 max-[600px]:grid-cols-2 max-[418px]:grid-cols-1 gap-4 ">
        {(query ? produitsSearch : produits).map((pd) => {
          return (
            <Link key={pd.id} href={`/produits/${pd.id}`}>
              <div className="bg-white border border-gray-200 shadow-md relative  w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="absolute bg-white right-0 top-0 px-[15px] z-10 font-bold text-[23px] text-red-600">
                  {pd.price} FCFA
                </div>
                <div className="aspect-[3/2] ">
                  <Image src={pd.image} alt={pd.nomProduit} fill />
                </div>
              </div>
            </Link>
          );
        })}
      </article>



      {chargerment ? (
        <div
          ref={haveMore}
          className="text-center
      "
        >
          chargement ...........
        </div>
      ) : (
        ""
      )}

      
    </>
  );
}
