"use client";

import { useState } from "react";
export default function useGestionPaiement() {
  const [moyenPayment, setMoyenPayment] = useState("");

  // gestion de numero de paiement
  function verifyNumPayment(e) {
    const input = e.target;
    const value = input.value;
    // Empêche la saisie tant qu'aucun moyen n’est sélectionné
    if (moyenPayment == "") {
      input.setCustomValidity(
        "Veuillez d'abord sélectionner un moyen de paiement."
      );
      input.reportValidity();
    }
    let regex;
    let message = "";
    switch (moyenPayment) {
      case "moov":
        regex = /^(01)\d{8}$/;
        message =
          "Le numéro Moov doit commencer par 01 et contenir 10 chiffres au total.";
        break;
      case "mtn":
        regex = /^(05)\d{8}$/;
        message =
          "Le numéro MTN doit commencer par 05 et contenir 10 chiffres au total.";
        break;
      case "wave":
        regex = /^(01|05|07)\d{8}$/;
        message =
          "Le numéro Wave doit commencer par 01, 05 ou 07 et contenir 10 chiffres au total.";
        break;
      default:
        regex = null;
    }
    if (regex && !regex.test(value)) {
      input.setCustomValidity(message);
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity();
  }

  return {
    setMoyenPayment,
    verifyNumPayment,
  };
}
