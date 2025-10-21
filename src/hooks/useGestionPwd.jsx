"use client";
import { useState } from "react";

function useGestionPwd() {
  const [password, setPassword] = useState("");
  const [messageVerifyPassword, setMessageVerifyPassword] = useState("");

  function verifyPassword(value) {
    setPassword(value);

    // Tests de complexité avec regex
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[@$!%*?&]/.test(value);
    const minLength = value.length >= 8;

    let score = 0;
    if (hasLower) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;
    if (minLength) score++;

    if (value.length === 0) {
      setMessageVerifyPassword("");
    } else if (score <= 3) {
      setMessageVerifyPassword("Faible");
    } else if (score <= 4) {
      setMessageVerifyPassword("Moyen");
    } else if (score == 5) {
      setMessageVerifyPassword("Fort");
    }
  }

  // Couleurs selon la force
  const getBarColor = () => {
    switch (messageVerifyPassword) {
      case "Faible":
        return "bg-red-500 w-1/3 h-[4px]";
      case "Moyen":
        return "bg-yellow-500 w-2/3 h-[4px]";
      case "Fort":
        return "bg-green-500 w-full h-[4px]";
      default:
        return "bg-gray-200 w-0";
    }
  };

  return { verifyPassword, password, messageVerifyPassword, getBarColor };
}

export default useGestionPwd;
