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
      toast.error("Xahiş edirik düzgün email daxil edin.");
      return;
    }

    setLoading(true);
    const success = await postSubscribeGuest({ email });

    if (success) {
      toast.success("Abunəlik uğurla tamamlandı!");
      setEmail("");
    } else {
      toast.error("Abunəlik alınmadı. Xahiş edirik, yenidən cəhd edin.");
    }
    setLoading(false);
  };

  const validateEmail = (email: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <footer className="bg-[#FCF8F3] text-gray-900 py-12">
      <LandingContainer>
        <div className="flex flex-wrap justify-between items-start gap-12">
          {/* Şirkət Məlumatları */}
          <div className="flex flex-col space-y-4 w-full sm:w-1/3">
            <h3 className="text-2xl font-bold text-gray-900">
              ORELSA COSMETICS
            </h3>
            <p className="text-sm text-gray-700">
              Bakı şəhəri, Nizami rayonu
              <br />
              Bəhruz Nuriyev
            </p>
            <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-lg border border-gray-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.427885112121!2d49.865217615326355!3d40.409261379364004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403063aa81791273%3A0xa0b012034fbd9a3!2sBaku!5e0!3m2!1sen!2saz!4v1697890000000!5m2!1sen!2saz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>

          {/* Keçidlər */}
          <div className="flex flex-col space-y-4 w-full sm:w-1/4">
            <h4 className="text-lg font-semibold text-gray-800">Keçidlər</h4>
            <Link
              href="/"
              className="text-sm text-gray-700 hover:text-pink-600 transition"
            >
              Ana səhifə
            </Link>
            <Link
              href="/shop"
              className="text-sm text-gray-700 hover:text-pink-600 transition"
            >
              Mağaza
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-700 hover:text-pink-600 transition"
            >
              Əlaqə
            </Link>
          </div>

          {/* Abunə Forması */}
          <div className="flex flex-col space-y-4 w-full sm:w-1/3">
            <h4 className="text-lg font-semibold text-gray-800">
              Məhsullardan xəbərdar olun
            </h4>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Email daxil edin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 text-gray-700 bg-gray-100 focus:ring focus:ring-pink-400 focus:outline-none"
              />
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg font-medium text-white transition ${
                  loading
                    ? "bg-pink-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-400"
                }`}
                disabled={loading}
              >
                {loading ? "Yüklənir..." : "Göndər"}
              </button>
            </form>
          </div>
        </div>
      </LandingContainer>

      <div className="mt-12">
        <Rights />
      </div>
    </footer>
  );
};

export default Footer;

