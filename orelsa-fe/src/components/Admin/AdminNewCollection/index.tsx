"use client";

import { Button, Checkbox, Image, Input } from "@nextui-org/react";
import axios from "axios";
import React, { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const AdminAddNewCollection: React.FC<{
  onProductAdded: () => void;
  setModalOpen: (open: boolean) => void;
}> = ({ onProductAdded, setModalOpen }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [active, setActive] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length > 0) {
      setPhotos(validFiles);
      setFileNames(validFiles.map((file) => file.name));
      setError(null);
    } else {
      setError("Please upload valid image files.");
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title || description) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      photos.forEach((photo) => {
        formData.append("photo", photo);
      });

      try {
        await axios.post(
          "http://localhost:9089/admin/dashboard/homeNewCollection",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Product added successfully!");
        onProductAdded();
      } catch (error) {
        console.error("Error submitting form:", error);
        setError("An error occurred while submitting the form.");
      }
    } else {
      setError("Category is required.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
  });

  return (
    <div className="max-w-xl mx-auto">
      <h3 className="bg-[#3FBE5B] text-white text-center py-3 text-2xl">
        Yeni kolleksiya yarat
      </h3>
      <form
        onSubmit={handleSubmit}
        className="bg-[#4A954912] p-6 rounded-md flex flex-col gap-6"
      >
        <Input
          placeholder="Ad"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-[#FAFAFA]"
        />
        <Input
          placeholder="Haqqında"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full bg-[#FAFAFA]"
        />
        <div className="flex flex-col gap-4">
          <Checkbox
            isSelected={active}
            onChange={(e) => setActive(e.target.checked)}
            color="warning"
            className="mb-5"
          >
            Aktiv
          </Checkbox>
        </div>
        <div
          {...getRootProps()}
          className="bg-white w-full h-[195px] flex flex-col justify-around items-center border-dashed border-2 border-[#CBD0DC] rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <Image src="/Cloud/cloud-add.svg" alt="cloud" />
          <p className="text-center font-medium text-sm text-[#A9ACB4]">
            JPEG, PNG formatlarında şəkillər seçim edin. Həcmi 2 mb dan yüksək
            olmasın.
          </p>
          <div className=" w-[214px] h-[30px] border-solid border-2 border-[#383F4F] bg-[#3F64E5] rounded-[16px] text-white text-center">
            Şəkil yüklə
          </div>
          {fileNames.length > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {fileNames.map((name, index) => (
                <li className="list-none" key={index}>
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full flex justify-center items-center">
          <Button
            type="submit"
            disabled={photos.length === 0}
            className="flex justify-center items-center bg-[#34C759] rounded-md py-3 px-4 text-white"
          >
            Əlavə et
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AdminAddNewCollection;
