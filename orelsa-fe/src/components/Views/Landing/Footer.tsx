"use client";

import { postSubscribeGuest } from "@/api/admin";
import Rights from "@/components/UI/AllRights/Rights";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import LandingContainer from "./LandingContainer";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const success = await postSubscribeGuest({ email });

    if (success) {
      toast.success("Subscription successful!");
      setEmail("");
    } else {
      toast.error("Subscription failed. Please try again.");
    }
    setLoading(false);
  };

  const validateEmail = (email: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <footer className="border-t-2 bg-white-50 py-10">
      <LandingContainer>
        <div className="h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20 gap-[50px]">
          
          {/* Company Information */}
          <div className="flex flex-col md:mb-0">
            <h3 className="text-3xl font-bold text-black pb-[20px]">ORELSA COSMETICS</h3>
            <p className="font-normal text-gray-600">
              400 University Drive Suite 200 <br />
              Coral Gables, <br />
              FL 33134 USA
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:gap-6 items-center md:items-start">
            <p className="text-base font-medium text-gray-700 mb-2">Keçidlər</p>
            {["Ana səhifə", "Mağaza", "Əlaqə"].map((item, index) => (
              <Link
                key={index}
                href={`/${item === "Ana səhifə" ? "" : item.toLowerCase()}`}
                className="text-base font-medium hover:text-black transition-all"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Subscription Form */}
          <div className="flex flex-col gap-6 md:items-start mt-4 md:mt-0">
            <p className="font-bold text-gray-800">Məhsullardan xəbərdar olun</p>

            <form className="flex gap-2 mt-2" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email adresi daxil edin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 bg-white shadow focus:outline-none transition-all"
              />
              <button
                type="submit"
                className={`py-2 px-4 rounded-lg font-medium transition-all ${loading ? "bg-blue-500 text-white" : "bg-black text-white"}`}
                disabled={loading}
              >
                {loading ? "Loading..." : "OK"}
              </button>
            </form>
          </div>

        </div>
      </LandingContainer>

      {/* Rights Component */}
      <Rights />
    </footer>
  );
};

export default Footer;
