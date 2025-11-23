"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTraiterImageProduit } from "@/hooks/useTraiterImageProduit";

export default function MdofifProduit() {
  const { idProduit } = useParams();
  const { setFile, imageUrl, erreurFile } = useTraiterImageProduit();
  const [ficher, setFicher] = useState(null);
  const router = useRouter();
  const [produit, setProduit] = useState(null);
  const [erreurForm, setErreurForm] = useState({ error: false, message: "" });
  const [confirmerSupprimerProduit, setConfirmerSupprimerProduit] =
    useState(false);
  const [loading, setLoading] = useState(false);

  async function deleteProduit() {
    const reponse = await fetch(`/api/${idProduit}`, {
      method: "DELETE",
    });
    const result = await reponse.json();
    if (reponse.ok) {
      router.push("/dashboard/produits");
    } else {
      console.error(result.erreur);
      return <p>{result.message}</p>;
    }
  }

  useEffect(() => {
    async function fetchProduit() {
      const reponse = await fetch(`/api/produit/${idProduit}`);
      const result = await reponse.json();
      if (reponse.ok) {
        setProduit(result.produit);
      }
    }
    if (idProduit) fetchProduit();
  }, [idProduit]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setFile(ficher);
    if (imageUrl) {
      data.image = imageUrl;
      data.id = idProduit;
      const reponse = await fetch("/api/modifierProduit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await reponse.json();

      if (!reponse.ok) {
        setLoading(false);
        setErreurForm({ error: true, message: result.message });
      } else {
        setLoading(false);
        router.push("/dashboard/produits");
      }
    } else {
      setLoading(false);
      if (erreurFile) console.error(erreurFile.message);
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
  };

  if (produit) {
    if (erreurForm.error)
      return (
        <main className="flex flex-col min-[1100px]:ml-64 p-[30px] w-full justify-center  items-center ">
          <Image
            src="/message-derreur.png"
            width={300}
            height={300}
            alt="icone erreur"
          />
          <p>{erreurForm.message}</p>
        </main>
      );

    return (
      <main className="min-[400px]:p-[30px] max-[400px]:p-[20px] relative min-[1100px]:ml-64">
        {confirmerSupprimerProduit ? (
          <div className="fixed w-full inset-0 bg-[#0000006b] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
              <h2 className="text-lg font-semibold mb-4">
                Confirmer la déconnexion
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer ce produit ?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setConfirmerSupprimerProduit(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  onClick={deleteProduit}
                  className="px-4 py-2 bg-[#9e86ba] text-white rounded hover:bg-[#b7b2bd]"
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <h2 className="text-3xl font-bold mb-8">Modifier produit</h2>
        <div className="flex gap-[30px] max-[810px]:flex-col-reverse">
          <div className="">
            <Image
              src={produit.image}
              width={500}
              height={400}
              alt={produit.nomProduit}
            />
          </div>
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-6 rounded-xl relative shadow-md mb-10 mx-auto "
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

              <div className="mb-4">
                <input
                  {...register("nomProduit", {
                    required: "Donnez un nom au produit",
                  })}
                  type="text"
                  defaultValue={produit.nomProduit}
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
                  defaultValue={produit.description}
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
                  defaultValue={produit.price}
                  placeholder="Prix du produit ex:40.000 FCFA "
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
                  defaultValue={produit.numAContacter}
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
                  defaultValue={produit.pointLivraison}
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
                  accept="image/*"
                  onChange={(e) => setFicher(e.target.files?.[0])}
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
                onClick={() => setConfirmerSupprimerProduit(true)}
                className="bg-[#9e86ba] max-[1300px]:mb-[20px] text-white px-4 py-2 font-semibold rounded-lg hover:bg-[#9d92a8] mr-[20px]"
              >
                Supprimer le Produit
              </button>
              <button
                type="submit"
                className="bg-[#9e86ba] text-white px-4 py-2 font-semibold rounded-lg hover:bg-[#9d92a8]"
              >
                Modifier le produit
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
