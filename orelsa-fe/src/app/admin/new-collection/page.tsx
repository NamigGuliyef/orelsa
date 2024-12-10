"use client";

import AdminAddNewCollection from "@/components/Admin/AdminNewCollection";
import AdminHeader from "@/components/Admin/Header";
import NewCollectionTable from "@/components/Admin/NewCollectionTable";
import AdminSideBar from "@/components/Admin/Sidebar";
import { Modal, ModalContent } from "@nextui-org/react";
import { useState } from "react";

const AdminNewCollection = () => {
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
          title="Yeni kolleksiya paneli"
          button={() => (
            <button
              onClick={() => setModalOpen(true)}
              className="p-1 rounded-lg text-white border-none cursor-pointer bg-[#34C759] px-2"
            >
              Yeni kolleksiya
            </button>
          )}
        />
        <div className="py-4 px-4 w-full rounded">
          <NewCollectionTable />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <ModalContent className="scrollbar-hidden">
          <AdminAddNewCollection
            onProductAdded={handleProductAdded}
            setModalOpen={setModalOpen}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminNewCollection;
