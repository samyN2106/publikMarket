import Link from "next/link";
export default function Button({ children, href }) {
  return (
    <button>
      <Link
        href={href}
        className="bg-[#9e86ba]  text-white font-black py-[12px] px-[15px] block text-[17px] rounded-[50px]"
      >
        {children}
      </Link>
    </button>
  );
}
