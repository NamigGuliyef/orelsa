"use client";

import {
  deleteNewCollection,
  getHomeNewCollection,
  updateNewCollection,
} from "@/api/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosSave } from "react-icons/io";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { EditIcon } from "../../Icons/EditIcon";
import { EyeIcon } from "../../Icons/EyeIcon";
import { columns } from "./data";

interface INewCollection {
  _id: string;
  description: string;
  newproductPhoto: string;
  active: boolean;
  title: string;
}

const NewCollectionTable = () => {
  const [newCollection, setNewCollection] = useState<INewCollection[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getHomeNewCollection();
        setNewCollection(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (id: string, key: keyof INewCollection, value: any) => {
    const updatedProducts = newCollection.map((product) => {
      if (product._id === id) {
        product[key] = value;
      }
      return product;
    });
    setNewCollection(updatedProducts);
  };

  const onSubmit = async (index: number) => {
    const productToUpdate = {
      id: newCollection[index]._id,
      title: newCollection[index].title,
      description: newCollection[index].description,
      photo: newCollection[index].newproductPhoto,
      active: newCollection[index].active,
    };
    await updateNewCollection(productToUpdate)
      .then(() => {
        toast.success("Successfully updated!");
      })
      .catch((error) => {
        toast.error("Failed to update product.");
        console.error("Error updating product:", error);
      });
  };

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteNewCollection(productId);
        setNewCollection((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleCheckboxChange = (id: string) => {
    const updatedProducts = newCollection.map((product) => {
      product.active = product._id === id;
      return product;
    });
    setNewCollection(updatedProducts);
    setActiveId(id);
  };

  return (
    <Table aria-label="Example table with custom cells" className="w-full">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody>
        {newCollection.map(
          (
            { _id, active, description, newproductPhoto, title },
            index: number
          ) => (
            <TableRow key={_id}>
              <TableCell>
                <Image
                  src={newproductPhoto}
                  width={100}
                  height={100}
                  alt={"photo"}
                  className="shadow-xl"
                />
              </TableCell>
              <TableCell>
                <input
                  disabled={editingId !== _id}
                  className="bg-white"
                  value={title}
                  onChange={(e) => {
                    handleChange(_id, "title", e.target.value);
                  }}
                />
              </TableCell>
              <TableCell>
                <input
                  disabled={editingId !== _id}
                  className="bg-white w-full"
                  value={description}
                  onChange={(e) => {
                    handleChange(_id, "description", e.target.value);
                  }}
                />
              </TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  disabled={editingId !== _id}
                  checked={active || activeId === _id}
                  onChange={() => handleCheckboxChange(_id)}
                />
              </TableCell>
              <TableCell>
                <div className="relative flex items-start gap-2 justify-center">
                  <span className="text-lg cursor-pointer active:opacity-50 text-[#34C759]">
                    {editingId === _id ? (
                      <IoIosSave
                        onClick={() => {
                          onSubmit(index);
                          setEditingId(null);
                        }}
                      />
                    ) : (
                      <EditIcon
                        onClick={() => {
                          setEditingId(_id);
                        }}
                      />
                    )}
                  </span>
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => handleDelete(_id)}
                  >
                    <DeleteIcon />
                  </span>
                  <span className="text-lg text-[#327ceb] cursor-pointer active:opacity-50">
                    <EyeIcon
                      onClick={() => {
                        router.push("/products/" + _id);
                      }}
                    />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default NewCollectionTable;
