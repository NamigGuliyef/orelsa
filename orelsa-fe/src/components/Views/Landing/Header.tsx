"use client";

import { useBoolean } from "ahooks";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import LandingContainer from "./LandingContainer";
import menu from "./menu";
import SearchBar from "@/components/shared/Search/SearchBar";

type NavLink = {
  id: string;
  link: string;
  name: string;
};

const Header: FC = () => {
  const navLinks: NavLink[] = menu();
  const [state, { toggle, setFalse }] = useBoolean(false);

  return (
    <header className="py-6 px-6 bg-transparent">
      <LandingContainer>
        <nav className="flex justify-between items-center w-full max-w-[1280px] mx-auto relative bg-transparent gap-3">
          <div className="flex justify-start items-center space-x-4" id="logo">
            <Link href="/" className="cursor-pointer flex items-center gap-2">
              <Image
                src="/NavbarLogo/LogoIcon.svg"
                alt="icon"
                width={50}
                height={32}
              />
              <h1 className="font-bold text-4xl text-black hidden md:block">
                ORELSA
              </h1>
            </Link>
          </div>

          <ul className="hidden lg:flex justify-between items-center space-x-8 bg-transparent">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.link}
                  className="text-black font-medium text-base leading-6 hover:text-primary transition duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="lg:block">
              <SearchBar />
            </div>

          <button
            className="lg:hidden flex items-center text-center"
            onClick={toggle}
          >
            {state ? (
              <IoCloseCircle size={30} />
            ) : (
              <GiHamburgerMenu size={30} />
            )}
          </button>

          {state && (
              <div className="absolute top-40 right-2 w-35 z-30 bg-transparent shadow-lg">
                <ul className="flex flex-col items-start space-y-4 p-4">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.link}
                        className="text-black font-medium text-base hover:text-primary transition duration-200"
                        onClick={setFalse}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </div> 
        </nav>
      </LandingContainer>
    </header>
  );
};

export default Header;
