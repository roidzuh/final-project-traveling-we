import Link from "next/link";
import ButtonIcon from "./ButtonIcon";
import ButtonLink from "./ButtonLink";
import { navLinks } from "@/utils/data";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpen } from "@/features/slices/navbarSlice";
import { useEffect, useRef } from "react";
import { HiMiniBars3, HiXCircle } from "react-icons/hi2";

export default function Navbar() {
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const dispatch = useDispatch();
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch(setIsOpen(false));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <nav className="tw-bg-white tw-flex tw-items-center tw-justify-between tw-px-12 tw-py-2 tw-z-50 tw-mx-auto tw-max-w[1440px] tw-shadow-xl tw-rounded-full tw-fixed tw-w-[95%] tw-top-4 tw-left-[2.5%]">
      <Link
        href="/"
        className="tw-text-black tw-text-3xl tw-font-bold tw-no-underline"
      >
        TravelGo
      </Link>
      <ul className="tw-hidden tw-m-0 md:tw-flex tw-gap-4">
        {navLinks.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            className="tw-flex tw-items-center tw-gap-2 tw-no-underline tw-relative tw-text-black tw-group"
          >
            <link.icon />
            {link.title}
            <span className="tw-inline-block tw-absolute tw-h-[2px] tw-w-0 tw-bg-black tw-top-6 tw-transition-all tw-duration-500 group-hover:tw-w-full"></span>
          </Link>
        ))}
      </ul>
      <div className="tw-hidden md:tw-flex tw-space-x-4">
        <ButtonLink title="Log In" href="/login" />
        <ButtonLink title="Sign In" href="/signup" />
      </div>
      <div className="md:tw-hidden" ref={menuRef}>
        <ButtonIcon onClick={() => dispatch(setIsOpen(!isOpen))}>
          {isOpen ? <HiXCircle /> : <HiMiniBars3 />}
        </ButtonIcon>

        <ul
          className={
            isOpen
              ? `tw-bg-slate-100 tw-p-0 tw-shadow-md tw-flex tw-flex-col tw-absolute tw-top-14 tw-right-0 tw-rounded-lg  tw-py-2 tw-opacity-1 tw-visible tw-translate-y-0 tw-transition-all tw-ease-in tw-duration-300`
              : `tw-bg-slate-100 tw-p-0 tw-shadow-md tw-flex tw-flex-col tw-absolute tw-top-14 tw-right-0 tw-rounded-lg tw-py-2 tw-opacity-0 tw-invisible tw-translate-y-0 tw-transition-all tw-ease-in tw-duration-300`
          }
        >
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="tw-flex tw-gap-2 tw-no-underline tw-text-black hover:tw-bg-slate-300 tw-p-4 tw-transition-all tw-ease-in tw-duration-300"
            >
              <link.icon />
              {link.title}
            </Link>
          ))}

          <div className="tw-flex tw-gap-4 tw-m-2">
            <ButtonLink title="Log In" href="/login" />
            <ButtonLink title="Sign In" href="/signup" />
          </div>
        </ul>
      </div>
    </nav>
  );
}
