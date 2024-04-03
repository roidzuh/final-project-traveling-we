import Link from "next/link";
import ButtonIcon from "./ButtonIcon";
import { useEffect, useRef, useState } from "react";
import { HiMiniBars3, HiXCircle, HiHome, HiMap } from "react-icons/hi2";
import ButtonLink from "./ButtonLink";

const navLinks = [
  { title: "Home", href: "/", icon: HiHome },
  { title: "Destinations", href: "/", icon: HiMap },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white flex items-center justify-between px-12 py-2 z-50 mx-auto max-w[1440px] shadow-xl rounded-full fixed w-[95%] top-4 left-[2.5%]">
      <Link href="/" className="text-black text-3xl font-bold no-underline">
        Travelo
      </Link>
      <ul className="hidden md:flex gap-4">
        {navLinks.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            className="flex gap-2 no-underline relative text-black group"
          >
            <link.icon />
            {link.title}
            <span className="inline-block absolute h-[2px] w-0 bg-black top-5 transition-all duration-500 group-hover:w-full"></span>
          </Link>
        ))}
      </ul>
      <div className="hidden md:flex space-x-4">
        <ButtonLink title="Log In" href="/login" />
        <ButtonLink title="Sign In" href="/signin" />
      </div>
      <div className="md:hidden" ref={menuRef}>
        <ButtonIcon onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiXCircle /> : <HiMiniBars3 />}
        </ButtonIcon>

        <ul
          className={
            isOpen
              ? `bg-slate-100 shadow-md flex flex-col absolute top-14 right-0 rounded-lg py-2 opacity-1 visible translate-y-0 transition-all ease-in duration-300`
              : `bg-slate-100 shadow-md flex flex-col absolute top-14 right-0 rounded-lg py-2 opacity-0 invisible translate-y-0 transition-all ease-in duration-300`
          }
        >
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="flex gap-2 no-underline text-black hover:bg-slate-300 p-4 transition-all ease-in duration-300"
            >
              <link.icon />
              {link.title}
            </Link>
          ))}

          <div className="flex gap-4 m-2">
            <ButtonLink title="Log In" href="/login" />
            <ButtonLink title="Sign In" href="/signin" />
          </div>
        </ul>
      </div>
    </nav>
  );
}