"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
export default function Connexion() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [erreurConnexion, setErreurConnexion] = useState(false);
  const [erreurServeur, setErreurServeur] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const reponse = await fetch("/api/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await reponse.json();

      if (reponse.ok) {
        router.push("/produits");
        setLoading(false);

        const handleCreateCookie = async () => {
          await fetch("/api/createCookies", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              NomCookies: "myapp_session",
              CookiesValue: result.message,
            }),
          });
        };

        handleCreateCookie();
      } else if (reponse.status === 401) {
        setErreurConnexion(true);
        setLoading(false);
      }

      if (reponse.status === 500) {
        setErreurServeur(true);
        setLoading(false);
        console.error("Erreur serveur:", result.erreur);
      }
    } catch (error) {
      console.error("erreur lors du transfere des donnees:", error);
    }
  };

  return (
    <div className=" p-6 flex h-screen justify-center items-center bg-[#0000007a]">
      <div className="rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-white w-[600px] relative">
        {loading ? (
          <div className="absolute top-[50%] left-[50%] translate-[-50%]">
            <Image
              src="/iconeLoading.gif"
              width={60}
              height={60}
              alt="Loading"
            />
          </div>
        ) : (
          ""
        )}

        <div>
          {erreurServeur ? (
            <div className="flex items-center px-[10px] py-[5px]">
              <Image
                src="/message-derreur.png"
                alt="Erreur formualire"
                width={50}
                height={50}
              />
              <p className="text-red-500 text-xl ml-[10px]">
                Erreur du serveur ressayez plus tard......
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Connexion</h2>
          </div>
        </div>

        {erreurConnexion ? (
          <div>
            <small className="text-red-600 text-[17px] mt-1 p-[20px] ">
              email ou mot de pass incorrect
            </small>
          </div>
        ) : (
          ""
        )}

        <form className="p-[20px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-slate-900 text-sm font-medium mb-2"
              for="email"
            >
              Entrez votre email
            </label>
            <input
              {...register("email", {
                required: "Email requis",
              })}
              type="email"
              id="email"
              className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-900 text-sm font-medium mb-2"
              for="password"
            >
              Entrez un mot de pass
            </label>
            <input
              {...register("password", {
                required: "Mot de passe requis",
              })}
              type="password"
              id="password"
              className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="cursor-pointer w-full py-2.5 px-4 rounded-md flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium transition-colors"
            >
              Se connecter
            </button>
            <div className="flex items-center justify-center text-slate-500 text-sm">
              <span>Processus facile, rapide et securise</span>
            </div>
          </div>
        </form>
      </div>{" "}
    </div>
  );
}
