"use client";

import AdminNewProduct from "@/components/Admin/AdminNewProduct";
import AdminTable from "@/components/Admin/AdminTable";
import AdminHeader from "@/components/Admin/Header";
import { Modal, ModalContent } from "@nextui-org/react";
import { useState } from "react";

const AdminProducts = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleProductAdded = () => {
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <AdminHeader
        title="Məhsul paneli"
        button={() => (
          <>
            <button
              onClick={() => setModalOpen(true)}
              className="p-1 rounded-lg text-white border-none cursor-pointer bg-[#34C759] px-2"
            >
              Yeni Məhsul
            </button>
          </>
        )}
      />
      <AdminTable />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <ModalContent className="scrollbar-hidden">
          <AdminNewProduct
            onProductAdded={handleProductAdded}
            setModalOpen={setModalOpen}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminProducts;
