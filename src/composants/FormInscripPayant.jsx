"use client";
import Script from "next/script";
// import useGestionPaiement from "@/hooks/useGestionPaiement";
// import { useState, useEffect } from "react";
// import useGestionPwd from "@/hooks/useGestionPwd";
// import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import useVerifierPwd from "@/hooks/useVerifierPwd";

export default function FormInscripPayant({ offre }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   <Script
  //     src="https://momodeveloper.mtn.com/collection/widget/v1.js"
  //     strategy="afterInteractive"
  //     onLoad={() => {
  //       console.log("Script MTN MoMo chargé avec succès");
  //     }}
  //     onError={(e) => {
  //       console.error("Erreur lors du chargement du script MTN MoMo", e);
  //     }}
  //   />;
    //   const script = document.createElement("script");
    //   script.src = "https://momodeveloper.mtn.com/collection/widget/v1.js";
    //   script.async = true;

    //   script.onload = () => {
    //     console.log("MTN MoMo Widget chargé");
    //   };

    //   document.body.appendChild(script);

    //   return () => {
    //     document.body.removeChild(script);
    //   };
  // }, []);

  // function payWithMomo() {
  //   window.MTNMoMo.pay({
  //     amount: "1000",
  //     currency: "XOF",
  //     externalId: "CMD12345",
  //     payerMessage: "Paiement commande",
  //     payeeNote: "Merci pour votre achat",
  //     subscriptionKey: "23b67bff6bfe4db7b115ea54879f9be8",
  //     redirectUrl: "https://tonsite.com/paiement-success",
  //     callbackUrl: "https://tonsite.com/api/momo-callback",
  //   });
  // }

  const plan = watch("plan");

  const onSubmit = async (data) => {
    if (offre === "standart") data.amount = "1000";
    if (offre === "premium") data.amount = "2500";
    if (data.plan === "mtn") {
      payWithMomo();
    }
  };

  const { setValuePwd, niveauPwd, getBarColor } = useVerifierPwd();
  const passwordValue = watch("password", "");

  useEffect(() => {
    setValuePwd(passwordValue);
  }, [passwordValue]);

  return (
    <div className="h-screen   overflow-y-auto  bg-[#0000007a] ">
      {/* <div> */}
      <div
        className="min-[700px]:w-[600px] my-[70px] mx-auto bg-white rounded-xl max-[630px]:mx-[20px]"
        style={{ boxShadow: "0px 0px 20px 0px" }}
      >
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
              <p className="text-xl font-semibold text-white">
                {offre === "standart" ? "Standart" : "Premium"}
              </p>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-slate-900 text-sm font-medium mb-2"
                  for="NameClient"
                >
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

              <div className="mb-6 ">
                <div
                  className={`${"flex border border-gray-300 rounded-md overflow-hidden"}`}
                >
                  <div className="cursor-pointer flex-1 items-center py-3 px-1 text-sm text-center  text-indigo-600 font-medium">
                    <input
                      value="moov"
                      {...register("plan", { required: "Choisis un plan" })}
                      type="radio"
                    />
                    <span className="ml-[5px]">Moov money</span>
                  </div>

                  <div className="cursor-pointer flex-1 items-center py-3 px-1 text-sm text-center text-indigo-600 hover:bg-gray-50 font-medium">
                    <input
                      value="mtn"
                      {...register("plan", { required: "Choisis un plan" })}
                      type="radio"
                    />
                    <span className="ml-[5px]">MTN money</span>
                  </div>

                  <div className="cursor-pointer flex-1 items-center py-3 px-1 text-sm text-center text-indigo-600 hover:bg-gray-50 font-medium">
                    <input
                      value="wave"
                      {...register("plan", { required: "Choisis un plan" })}
                      type="radio"
                    />
                    <span className="ml-[5px]">Wave</span>
                  </div>
                </div>
                {errors.plan && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.plan.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-slate-900 text-sm font-medium mb-2"
                  for="numberPaiement"
                >
                  Numero de paiement
                </label>
                <div className="relative">
                  <input
                    {...register("phone", {
                      required: "Le numéro est obligatoire",
                      pattern: {
                        value: /^[0-9]{10}$/, // exactement 10 chiffres
                        message:
                          "Le numéro doit comporter exactement 10 chiffres",
                      },
                      validate: (value) => {
                        if (plan === "mtn" && !value.startsWith("05")) {
                          return "Le numéro MTN doit commencer par 05";
                        }
                        if (plan === "moov" && !value.startsWith("01")) {
                          return "Le numéro Moov doit commencer par 01";
                        }
                        if (plan === "wave") {
                          return true;
                        }
                        return true;
                      },
                    })}
                    type="text"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="cursor-pointer w-full py-2.5 px-4 rounded-md flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium transition-colors"
                >
                  {offre === "standart" ? "1000 FCFA" : "2500 FCFA"}
                </button>
                <div className="flex items-center justify-center text-slate-500 text-sm">
                  <span>Processus facile, rapide et securise</span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4 py-[20px]">
          <Image
            src="/logo_wave.webp"
            className="w-12"
            alt="Wave_money"
            width={150}
            height={50}
          />
          <Image
            src="/logo_moov.webp"
            className="w-12"
            alt="Moov_money"
            width={150}
            height={50}
          />
          <Image
            src="/logo_mtn.webp"
            className="w-12"
            alt="MTN_money"
            width={150}
            height={50}
          />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
