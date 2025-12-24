"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import useVerifierPwd from "../../hooks/useVerifierPwd";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const { setValuePwd, niveauPwd, getBarColor } = useVerifierPwd();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) alert(error.message);
    else {
      alert("Mot de passe mis à jour !");
      window.location.href = "/connexion";
    }
  };

  useEffect(() => {
    setValuePwd(password);
  }, [password]);

  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <form
        className="flex gap-3 items-center justify-center flex-col"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-gray-700 p-2 outline-0 min-[520px]:w-[500px] max-[520px]:w-[350px]  rounded-md "
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {niveauPwd != "" ? (
          <div className="flex items-center justify-between">
            <span
              style={{ transition: "all 0.5s ease" }}
              className={`${getBarColor()}`}
            ></span>
            <small className="ml-[5px]">{niveauPwd}</small>
          </div>
        ) : (
          ""
        )}
        <button
          disabled={niveauPwd !== "Fort"}
          type="submit"
          className="cursor-pointer mt-[10px] py-2.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium transition-colors"
        >
          {niveauPwd !== "Fort"
            ? "Veuillez choisir un mot de passe fort"
            : "Changer le mot de passe"}
        </button>
      </form>
    </div>
  );
}
