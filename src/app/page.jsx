"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/composants/Navbar";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  function handlePlanSelection(plan) {
    router.push("/inscription?p=" + plan);
  }

  return (
    <header className="flex flex-col justify-between h-screen">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-around items-center text-center h-full  max-w-[1200px] my-0">
        <div>
          <h1 className="mb-[50px]">
            <strong className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700  text-6xl to-purple-500">
              Rejoignez notre communauté de vendeurs et acheteurs passionnés !
            </strong>
          </h1>
          <p className="font-semibold text-[#868f9c] text-xl ">
            Faites connaître vos produits à des milliers de visiteurs chaque
            jour. Publiez votre annonce et boostez votre visibilité en ligne.
          </p>
        </div>

        <section className="py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Plan Gratuit */}
            <div
              style={{ borderStyle: "dashed" }}
              className="bg-white shadow-md rounded-2xl p-6 text-center border hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-4">Gratuit</h3>
              <p className="text-3xl font-bold mb-4">0 FCFA</p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>7 annonce</li>
                <li>Durée abonnement: 15 jours</li>
                <li>Visibilité maximale et permanante</li>
              </ul>
              <button
                onClick={() => {
                  handlePlanSelection("gt");
                }}
              >
                <Link
                  href="/inscription"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Commencer
                </Link>
              </button>
            </div>

            {/* Plan Standard */}
            <div
              style={{ borderStyle: "dashed" }}
              className="bg-white shadow-lg rounded-2xl p-6 text-center border-2 border-blue-600 hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                Standard
              </h3>
              <p className="text-3xl font-bold mb-4 text-blue-600">1500 FCFA</p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>15 annonces</li>
                <li>Durée abonnement : 25 jours</li>
                <li>Visibilité maximale et permanante</li>
              </ul>
              <button
                onClick={() => {
                  handlePlanSelection("st");
                }}
              >
                <Link
                  href="/inscription"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Choisir ce plan
                </Link>
              </button>
            </div>

            {/* Plan Premium */}
            <div
              style={{ borderStyle: "dashed" }}
              className="bg-white shadow-md rounded-2xl p-6 text-center border hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-4 text-yellow-600">
                Premium
              </h3>
              <p className="text-3xl font-bold mb-4 text-yellow-600">
                3000 FCFA
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>25 annonces</li>
                <li>Durée abonnement : 40 jours</li>

                <li>Visibilité maximale et permanante</li>
              </ul>
              <button
                onClick={() => {
                  handlePlanSelection("pm");
                }}
              >
                <Link
                  href="/inscription"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Choisir ce plan
                </Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}
