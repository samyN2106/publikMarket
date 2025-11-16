// import useGestionPaiement from "@/hooks/useGestionPaiement";
// import { useState, useEffect } from "react";
// import useGestionPwd from "@/hooks/useGestionPwd";
// import Image from "next/image";

// export default function FormInscripPayant({ offre }) {
//   const [modePayement, setModePayement] = useState("");
//   const { setMoyenPayment, verifyNumPayment } = useGestionPaiement();

//   const { verifyPassword, password, messageVerifyPassword, getBarColor } =
//     useGestionPwd();

//   // const [nom, setNom] = useState("");
//   // const [email, setEmail] = useState("");

//   // useEffect(() => {
//   //   setRecupNom(nom);
//   // }, [nom]);

//   // useEffect(() => {
//   //   setRecupEmail(email);
//   // }, [email]);

//   useEffect(() => {
//     if (modePayement !== "") {
//       setMoyenPayment(modePayement);
//     }
//   }, [modePayement]);

//   return (
//     <div className="h-screen  flex flex-col bg-[#0000007a]  justify-center">
//       <div>
//         <div
//           className="max-w-xl mx-auto bg-white rounded-xl max-[630px]:mx-[20px]"
//           style={{ boxShadow: "0px 0px 20px 0px" }}
//         >
//           <div className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-semibold text-white">
//                   Completez avec votre paiement
//                 </h2>
//                 <p className="text-sm text-slate-100 mt-2">
//                   Processus facile, rapide et securise
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xl font-semibold text-white">
//                   {offre === "st" ? "Standart" : "Premium"}
//                 </p>
//               </div>
//             </div>

//             <div className="p-6">
//               <form>
//                 <div className="mb-4">
//                   <label
//                     className="block text-slate-900 text-sm font-medium mb-2"
//                     for="NameClient"
//                   >
//                     Entrez votre nom complet
//                   </label>
//                   <input
//                     onChange={(e) => setNom(e.target.value)}
//                     type="text"
//                     id="NameClient"
//                     className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     className="block text-slate-900 text-sm font-medium mb-2"
//                     for="email"
//                   >
//                     Entrez votre email
//                   </label>
//                   <input
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="email"
//                     id="email"
//                     className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     className="block text-slate-900 text-sm font-medium mb-2"
//                     for="password"
//                   >
//                     Entrez un mot de pass
//                   </label>
//                   <input
//                     value={password}
//                     onChange={(e) => verifyPassword(e.target.value)}
//                     type="password"
//                     id="password"
//                     className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
//                     required
//                   />
//                   {messageVerifyPassword != "" ? (
//                     <div className="flex items-center justify-between">
//                       <span
//                         style={{ transition: "all 0.5s ease" }}
//                         className={`${getBarColor()} `}
//                       ></span>
//                       <span className="ml-[5px]">{messageVerifyPassword}</span>
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </div>

//                 <div
//                   className={`${"flex mb-6 border border-gray-300 rounded-md overflow-hidden"}`}
//                 >
//                   <div className="cursor-pointer flex-1 items-center py-3 px-1 text-sm text-center  text-indigo-600 font-medium">
//                     <input
//                       onClick={() => {
//                         setModePayement("moov");
//                       }}
//                       required
//                       type="radio"
//                       name="moyenPayment"
//                     />
//                     <span className="ml-[5px]">Moov money</span>
//                   </div>
//                   <div className="cursor-pointer flex-1 items-center py-3 px-1 text-sm text-center text-indigo-600 hover:bg-gray-50 font-medium">
//                     <input
//                       onClick={() => {
//                         setModePayement("mtn");
//                       }}
//                       required
//                       type="radio"
//                       name="moyenPayment"
//                     />
//                     <span className="ml-[5px]">MTN money</span>
//                   </div>
//                   <div className="cursor-pointer flex-1 items-center py-3 px-1 text-sm text-center text-indigo-600 hover:bg-gray-50 font-medium">
//                     <input
//                       onClick={() => {
//                         setModePayement("wave");
//                       }}
//                       required
//                       type="radio"
//                       name="moyenPayment"
//                     />
//                     <span className="ml-[5px]">Wave</span>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     className="block text-slate-900 text-sm font-medium mb-2"
//                     for="numberPaiement"
//                   >
//                     Numero de paiement
//                   </label>
//                   <div className="relative">
//                     <input
//                       onChange={verifyNumPayment}
//                       type="text"
//                       id="numberPaiement"
//                       className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex flex-col space-y-4">
//                   <button
//                     type="submit"
//                     className="cursor-pointer w-full py-2.5 px-4 rounded-md flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium transition-colors"
//                   >
//                     {offre === "st" ? "1500 FCFA" : "3000 FCFA"}
//                   </button>
//                   <div className="flex items-center justify-center text-slate-500 text-sm">
//                     <span>Processus facile, rapide et securise</span>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//           <div className="flex justify-center gap-2 mt-4 py-[20px]">
//             <Image
//               src="/logo_wave.webp"
//               className="w-12"
//               alt="Wave_money"
//               width={150}
//               height={50}
//             />
//             <Image
//               src="/logo_moov.webp"
//               className="w-12"
//               alt="Moov_money"
//               width={150}
//               height={50}
//             />
//             <Image
//               src="/logo_mtn.webp"
//               className="w-12"
//               alt="MTN_money"
//               width={150}
//               height={50}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
