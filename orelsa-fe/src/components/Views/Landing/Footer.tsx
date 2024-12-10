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
      setEmail("");
    }
    setLoading(false);
  };

  const validateEmail = (email: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <footer className="border-y-2">
      <LandingContainer>
        <div className="h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20 gap-[50px]">
          <div className="flex flex-col md:mb-0">
            <h3 className="text-2xl font-bold pb-[30px]">ORELSA COSMETİCS</h3>
            <p className="font-normal text-base">
              400 University Drive Suite 200 Coral <br /> Gables, <br /> FL
              33134 USA
            </p>
          </div>

          <div className="flex justify-between flex-col md:gap-6 items-center md:items-start">
            <p className="text-base font-medium text-[#9F9F9F]">Keçidlər</p>
            <Link href="/" className="text-base font-medium text-[#000]">
              Ana səhifə
            </Link>
            <Link href="/shop" className="text-base font-medium text-[#000]">
              Mağaza
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium text-[#2e2020]"
            >
              Əlaqə
            </Link>
          </div>

          <div className="flex flex-col gap-4 md:gap-6 md:items-start">
            <p>Məhsullardan xəbərdar olun</p>

            <div>
              <form className="flex gap-2" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email adresi daxil edin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-solid border-b-[1px] border-black text-sm font-normal focus:border-0 focus:outline-none"
                />

                <button
                  type="submit"
                  className="border-solid border-b-[1px] border-black font-medium text-sm"
                  disabled={loading}
                >
                  {loading ? "SUBSCRIBING..." : "OK"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </LandingContainer>
      <Rights />
    </footer>
  );
};

export default Footer;
