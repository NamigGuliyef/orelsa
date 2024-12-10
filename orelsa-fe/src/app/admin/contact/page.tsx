"use client";

import Contacts from "@/components/Admin/Contacts";
import AdminHeader from "@/components/Admin/Header";
import AdminSideBar from "@/components/Admin/Sidebar";

const FavoritesPanel = () => {
  return (
    <div className="grid grid-cols-[0fr_1fr]">
      <AdminSideBar />
      <div className="p-5 ">
        <AdminHeader title="Bizimlə əlaqə" />
        <div className="py-4 px-4 w-full rounded">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default FavoritesPanel;
