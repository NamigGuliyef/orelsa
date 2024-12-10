"use client";

import AdminAddNewFavorites from "@/components/Admin/AdminNewFavorites";
import Favorites from "@/components/Admin/Favorites";
import AdminHeader from "@/components/Admin/Header";
import AdminSideBar from "@/components/Admin/Sidebar";
import { Modal, ModalContent } from "@nextui-org/react";
import { useState } from "react";

const FavoritesPanel = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleProductAdded = () => {
    setModalOpen(false);
    window.location.reload();
  };
  return (
    <div className="grid grid-cols-[0fr_1fr]">
      <AdminSideBar />
      <div className="p-5">
        <AdminHeader
          title="Məhsul kateqoriyasına aid seçilmişlər paneli"
          button={() => (
            <button
              onClick={() => setModalOpen(true)}
              className="p-1 rounded-lg text-white border-none cursor-pointer bg-[#34C759] px-2"
            >
              Əlavə et
            </button>
          )}
        />
        <div className="py-4 px-4 w-full rounded">
          <Favorites />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <ModalContent className="scrollbar-hidden">
          <AdminAddNewFavorites
            onProductAdded={handleProductAdded}
            setModalOpen={setModalOpen}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FavoritesPanel;
