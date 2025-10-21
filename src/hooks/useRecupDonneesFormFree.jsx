import { useState } from "react";

function useRecupDonneesFormFree() {
  const [NomComplet, setRecupNomComplet] = useState("");
  const [Email, setRecupEmail] = useState("");
  const [password, setPassword] = useState("");

  // async function submitForm(e) {
  //   e.preventDefault();
  //   if (NomComplet != "" && Email != "" && password != "") {
  //     const res = await fetch("@/app/api/registerUserFree", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ NomComplet, Email, password }),
  //     });

  //     const data = await res.json();
  //     console.log(data);
  //   }
  // }

  return { setRecupNomComplet, setRecupEmail, setPassword };
}

export default useRecupDonneesFormFree;
