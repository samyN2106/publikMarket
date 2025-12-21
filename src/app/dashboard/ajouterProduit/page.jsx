"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useTraiterImageProduit } from "@/hooks/useTraiterImageProduit";
import NavbarDashboard from "@/composants/NavbarDashboard";

export default function AjouterProduit() {
  const { setFile, imageUrl, erreurFile } = useTraiterImageProduit();
  const [ficher, setFicher] = useState(null);
  const router = useRouter();
  const [erreurForm, setErreurForm] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // traiter les donnees du formulaire
  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(ficher);

    setLoading(true);

    setFile(ficher);

    if (imageUrl) {
      const reponse = await fetch("/api/addProduit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await reponse.json();
      if (!reponse.ok) {
        setLoading(false);
        setErreurForm({ error: true, message: result.message });
        if (result.detail) console.error(result.detail);
      } else {
        setLoading(false);
        router.push("/dashboard/produits");
      }
    } else {
      setLoading(false);
    }
  };

  if (erreurFile) {
    console.error("erreurFile:", erreurFile);
    return (
      <main className="flex flex-col p-[30px] w-full justify-center  items-center min-[1100px]:ml-64 ">
        <Image
          src="/message-derreur.png"
          width={100}
          height={100}
          alt="icone erreur"
        />
        <p> Erreur lors du chargement de l'image.........</p>
      </main>
    );
  }

  if (erreurForm.error)
    return (
      <main className="flex flex-col p-[30px] w-full justify-center  items-center min-[1100px]:ml-64">
        <Image
          src="/message-derreur.png"
          width={100}
          height={100}
          alt="icone erreur"
        />
        <p>{erreurForm.message}</p>
      </main>
    );

  return (
    <main className="flex flex-col w-full min-[540]:p-[30px] max-[540]:py-[30px] max-[540]:p-[10px] min-[1100px]:ml-64">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Ajouter Produit</h2>
        <NavbarDashboard />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl relative  w-full"
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

        <div className=" mb-4">
          <input
            {...register("nomProduit", {
              required: "Donnez un nom au produit",
            })}
            type="text"
            placeholder="Nom du produit"
            className="w-full border p-2 rounded-lg  outline-0"
          />
          {errors.nomProduit && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nomProduit.message}
            </p>
          )}
        </div>
        <div className=" mb-4">
          <textarea
            {...register("description", {
              required: "Description requise",
            })}
            placeholder="Description du produit"
            className="w-full border p-2 rounded-lg  outline-0"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className=" mb-4">
          <input
            {...register("prixProduit", {
              required: "Prix requis",
            })}
            type="number"
            placeholder="Prix du produit ex:40.000"
            className="w-full border p-2 rounded-lg  outline-0"
            min="1"
          />
          {errors.prixProduit && (
            <p className="text-red-500 text-sm mt-1">
              {errors.prixProduit.message}
            </p>
          )}
        </div>
        <div className=" mb-4">
          <input
            {...register("numeroAcontacter", {
              required: "Entrez un numero a contacter",
            })}
            type="text"
            placeholder="Numero a contacter pour le produit"
            className="w-full border p-2 rounded-lg outline-0"
          />
          {errors.numeroAcontacter && (
            <p className="text-red-500 text-sm mt-1">
              {errors.numeroAcontacter.message}
            </p>
          )}
        </div>
        <div className=" mb-4">
          <input
            {...register("pointDeLivraison", {
              required: "Champ requis",
            })}
            type="text"
            placeholder="point de livraison. Ex: Abidjan,Bouake......"
            className="w-full border p-2 rounded-lg outline-0"
          />
          {errors.pointDeLivraison && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pointDeLivraison.message}
            </p>
          )}
        </div>
        <div className=" mb-6">
          <input
            onChange={(e) => setFicher(e.target.files?.[0])}
            accept="image/*"
            type="file"
            className="w-full border p-2 rounded-lg  outline-0"
          />
          {!ficher && (
            <p className="text-red-500 text-sm mt-1">
              Choisissez une image pour le produit
            </p>
          )}
        </div>
        <button
          // onClick={() => setLoading(true)}
          // disabled={loading}
          type="submit"
          className="bg-[#9e86ba] text-white px-4 py-2 font-semibold rounded-lg hover:bg-[#9d92a8]"
        >
          Ajouter le produit
        </button>
      </form>
    </main>
  );
}
