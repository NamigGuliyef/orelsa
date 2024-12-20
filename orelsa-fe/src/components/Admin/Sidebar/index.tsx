"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const links = [
  {
    href: "products",
    title: "Məhsul",
    src: "/AdminPanel-Sidebar/home.png",
  },
  {
    href: "new-collection",
    title: "Yeni kolleksiya",
    src: "/AdminPanel-Sidebar/home.png",
  },
  {
    href: "favorites",
    title: "Məhsula aid seçimlər",
    src: "/AdminPanel-Sidebar/home.png",
  },
  {
    href: "contact",
    title: "Bizimlə əlaqə",
    src: "/AdminPanel-Sidebar/layout.png",
  },
  {
    href: "subscribe",
    title: "Abunələrim",
    src: "/AdminPanel-Sidebar/user.png",
  },
];

const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
};

const AdminSideBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Siz uğurla çıxış etdiniz!");
    router.push("/admin/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[300px] bg-[#2D3748] h-screen flex flex-col justify-between text-white">
        <div>
          <h2 className="text-2xl font-bold text-center py-8">Admin Panel</h2>
          <nav className="flex flex-col">
            {links.map(({ href, title, src }, i) => (
              <Link
                href={href}
                key={i}
                className="flex items-center gap-4 px-6 py-3 hover:bg-gray-700 transition-colors"
              >
                <Image
                  src={src}
                  alt={title}
                  width={30}
                  height={30}
                  className="rounded-md"
                />
                <span>{title}</span>
              </Link>
            ))}
          </nav>
        </div>
        <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 mx-6 my-4"
        >
          Çıxış et
        </Button>
      </div>
    </div>
  );
};

export default AdminSideBar;
