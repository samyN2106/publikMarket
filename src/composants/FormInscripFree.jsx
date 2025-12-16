"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import useVerifierPwd from "../hooks/useVerifierPwd";

export default function FormInscripFree() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [errorServeur, setErrorServeur] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setValuePwd, niveauPwd, getBarColor } = useVerifierPwd();
  const passwordValue = watch("password", "");

  useEffect(() => {
    setValuePwd(passwordValue);
  }, [passwordValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const reponse = await fetch("/api/inscriptionFree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await reponse.json();

      if (reponse.ok) {
        setLoading(false);
        router.push("/produits");

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
      }

      if (!reponse.ok) {
        setLoading(false);
        setErrorServeur(result.message);
      }

      if (reponse.status === 500) {
        console.error("Erreur du serveur:", result.erreur);
      }
    } catch (error) {
      console.error("erreur lors du transfere des donnees:", error);
    }
  };

  return (
    <div className="h-screen  flex flex-col bg-[#0000007a] justify-center relative">
      <div>
        <div
          className="max-w-xl mx-auto bg-white rounded-xl max-[630px]:mx-[20px]"
          style={{ boxShadow: "0px 0px 20px 0px" }}
        >
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

          {errorServeur && (
            <div className="flex items-center px-[10px] py-[5px]">
              <Image
                src="/message-derreur.png"
                alt="icone Erreur formualire"
                width={50}
                height={50}
              ></Image>
              <p className="text-red-500 text-xl ml-[10px]">{errorServeur}</p>
            </div>
          )}

          <div className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Completez avec votre paiement
                </h2>
                <p className="text-sm text-slate-100 mt-2">
                  Processus facile, rapide et securise
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold text-white">Gratuit</p>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-slate-900 text-sm font-medium mb-2">
                    Entrez le nom de votre boutique
                  </label>
                  <input
                    {...register("boutique", {
                      required: "Champs requis",
                    })}
                    type="text"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                  />
                  {errors.boutique && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.boutique.message}
                    </p>
                  )}
                </div>

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
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                        message:
                          "Min. 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 symbole (@$!%*?&)",
                      },
                    })}
                    type="password"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  {niveauPwd != "" ? (
                    <div className="flex items-center justify-between">
                      <span
                        style={{ transition: "all 0.5s ease" }}
                        className={`${getBarColor()} `}
                      ></span>
                      <small className="ml-[5px]">{niveauPwd}</small>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-slate-900 text-sm font-medium mb-2">
                    Confirmez le mot de pass
                  </label>
                  <input
                    {...register("passwordConfirm", {
                      required: "confirmez le mot de pass",
                      validate: (value) =>
                        value === watch("password") ||
                        "Le mot de passe ne correspondent pas",
                    })}
                    type="password"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                  />
                  {errors.passwordConfirm && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-4">
                  <button
                    type="submit"
                    className="cursor-pointer w-full py-2.5 px-4 rounded-md flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium transition-colors"
                  >
                    Commencer Gratuitement
                  </button>
                  <div className="flex items-center justify-center text-slate-500 text-sm">
                    <span>Processus facile, rapide et securise</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
