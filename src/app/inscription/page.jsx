"use client";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormInscripFree from "@/composants/FormInscripFree";
import FormInscripPayant from "@/composants/FormInscripPayant";

function Payement() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [offre, setOffre] = useState(null);

  useEffect(() => {
    const dataParam = searchParams.get("p");
    if (dataParam === "gt" || dataParam === "st" || dataParam === "pm") {
      setOffre(dataParam);
    } else {
      setOffre(null);
      router.push("/");
    }
  }, [searchParams]);

  if (offre === "gt") {
    return <FormInscripFree />;
  } else {
    if (offre === "st" || offre === "pm") {
      return <FormInscripPayant offre={offre} />;
    }
  }
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Payement />
    </Suspense>
  );
}
