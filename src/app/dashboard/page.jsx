
export default function Dashboard() {
  // const [AfficherAcceuil, setAfficherAcceuil] = useState(true);
  // const [AfficherProduits, setAfficherProduits] = useState(false);
  // const [addProduit, setAddProduit] = useState(false);

  return (
    <main className="flex-1 p-[30px]">
      <h2 className="text-3xl font-bold mb-8">Acceuil</h2>
      <div className="flex justify-center">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: "30px",
          }}
        >
          <div className="text-center bg-white p-[30px]">
            <h4 className="text-2xl font-bold">
              Nombre de jours restant avant la fin de l'abonnement
            </h4>
            <span className="text-5xl font-bold">0 J</span>
          </div>

          <div className="text-center bg-white p-[30px]">
            <h4 className="text-2xl font-bold">Nombre de produits ajoutes</h4>
            <span className="text-5xl font-bold">0</span>
          </div>

          <div className="text-center bg-white p-[30px]">
            <h4 className="text-2xl font-bold">
              Nombre de produits restants a ajoutez
            </h4>
            <span className="text-5xl font-bold">0</span>
          </div>
        </div>
      </div>
    </main>
  );
}
