export default function AjouterProduit() {
  return (
    <main className="flex-1 p-[30px]">
      <h2 className="text-3xl font-bold mb-8">Ajouter Produit</h2>
      <form className="bg-white p-6 rounded-xl shadow-md mb-10 mx-auto w-[70%]">
        <input
          type="text"
          name="titre"
          placeholder="Nom du produit"
          className="w-full border p-2 rounded-lg mb-4 outline-0"
          required
        />

        <textarea
          name="description"
          placeholder="Description du produit"
          className="w-full border p-2 rounded-lg mb-4 outline-0"
          required
        ></textarea>

        <input
          type="number"
          name="prix"
          placeholder="Prix du produit en CFA"
          className="w-full border p-2 rounded-lg mb-4 outline-0"
          required
          min="1"
        />

        <input
          type="text"
          name="numeroAcontacter"
          placeholder="Numero a contacter pour le produit"
          className="w-full border p-2 rounded-lg mb-4 outline-0"
          required
        />

        <input
          type="text"
          name="pointDeLivraison"
          placeholder="point de livraison. Ex: tout abidjan"
          className="w-full border p-2 rounded-lg mb-4 outline-0"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="URL de l'image"
          className="w-full border p-2 rounded-lg mb-6 outline-0"
        />

        <button
          type="submit"
          className="bg-[#7a7ad6] text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-700"
        >
          Ajouter le produit
        </button>
      </form>
    </main>
  );
}
