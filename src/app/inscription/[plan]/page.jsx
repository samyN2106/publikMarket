import FormInscripFree from "@/composants/FormInscripFree";
import FormInscripPayant from "@/composants/FormInscripPayant";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { plan } = await params;
  return {
    title: `${plan} | inscription | PublikMarket`,
  };
}

export default async function Inscription({ params }) {
  const { plan } = await params;

  if (
    !plan ||
    (plan !== "gratuit" && plan !== "standart" && plan !== "premium")
  ) {
    return notFound();
  }

  if (plan === "gratuit") {
    return <FormInscripFree />;
  } else {
    if (plan === "standart" || plan === "premium") {
      return <FormInscripPayant offre={plan} />;
    }
  }
}
