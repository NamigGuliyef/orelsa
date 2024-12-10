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
    <div className="flex flex-col justify-between min-h-screen w-[400px] gap-2.5 bg-[#34C759]">
      <div>
        <h2 className="font-black text-3xl text-white py-14 px-7 text-center">
          Admin Panel
        </h2>
        {links.map(({ href, title, src }, i) => (
          <div key={i} className="flex items-center pl-7 min-h-fit">
            <Image
              className="p-[10px] rounded-2xl h-[50px] bg-[orange]"
              width={50}
              height={50}
              src={src}
              alt=""
            />
            <Link
              href={href}
              className="flex justify-start items-center text-2xl font-medium text-white py-4 px-4 text-start"
            >
              {title}
            </Link>
          </div>
        ))}
      </div>
      <Button
        onClick={handleLogout}
        className="bg-green-600 text-white rounded-md py-3 mt-40"
      >
        Çıxış et
      </Button>
      <div className="flex justify-center font-black text-3xl text-white pb-4 items-end h-full">
        <Link href="/admin/products">ORELSA.AZ</Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
