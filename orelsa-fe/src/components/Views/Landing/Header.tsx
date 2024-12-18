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

          {/* Logo və Başlıq */}
          <div className="flex justify-start items-center space-x-0" id="logo">
            <Link href="/" className="cursor-pointer flex items-center gap-0">
              <div className="relative">
                <Image
                  src="/NavbarLogo/logoicon.jpeg"
                  alt="icon"
                  width={160}
                  height={142}
                  className="object-cover rounded-full" // Burada kənarları oval etmək üçün `rounded-full` əlavə etdik
                />
                <Image
                  src="/HomePage/santa-hat.png"
                  alt="Santa Hat"
                  width={40}
                  height={40}
                  className="absolute top-[-14px] left-3.5 opacity-100"
                />
              </div>
            </Link>
          </div>



          {/* Navigasiya Links */}
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

            {/* Mobil Menu Button */}
            <button
              className="lg:hidden flex items-center text-center"
              onClick={toggle}
            >
              {state ? (
                <IoCloseCircle size={35} />
              ) : (
                <GiHamburgerMenu size={35} />
              )}
            </button>

            {/* Mobil Menu */}
            {state && (
              <div className="absolute top-full left-40 w-50 bg-white/70 backdrop-blur-md shadow-lg z-30 lg:hidden">
                <ul className="flex flex-col items-start space-y-4 p-4">
                  {navLinks.map((link) => (
                    <li key={link.id} className="w-full">
                      <Link
                        href={link.link}
                        className="text-black font-medium text-base hover:text-primary transition duration-200 block w-full"
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
