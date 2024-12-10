"use client";

import {
  deleteHomeBrowseRange,
  getBrowseRangeList,
  updatehomeBrowseRange,
} from "@/api/admin";
import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosSave } from "react-icons/io";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { EditIcon } from "../../Icons/EditIcon";
import { columns } from "./data";

interface INewCollection {
  _id: string;
  name: string;
  description: string;
  browseRangePhoto: string;
}

const Favorites = () => {
  const [newCollection, setNewCollection] = useState<INewCollection[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (id: any, key: any, value: any) => {
    const _newProducts = newCollection.map((product: any) => {
      if (product._id === id) {
        product[key] = value;
      }
      return product;
    });
    setNewCollection(_newProducts);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getBrowseRangeList();
        setNewCollection(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteHomeBrowseRange(productId);
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

  const onSubmit = async (index: number) => {
    await updatehomeBrowseRange(newCollection[index]).then((data) => {
      toast.success("successfully");
    });
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
          ({ _id, description, browseRangePhoto }, index: number) => {
            return (
              <TableRow key={_id}>
                <TableCell>
                  <Image
                    className="bg-white"
                    width={100}
                    height={100}
                    alt={"photo"}
                    src={browseRangePhoto}
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="bg-white"
                    value={description}
                    disabled={editingId !== _id}
                    onChange={(e) => {
                      handleChange(_id, "description", e.target.value);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative flex items-start gap-2 justify-start">
                    <span className="text-lg cursor-pointer active:opacity-50 text-[#34C759]">
                      {editingId === _id ? (
                        <IoIosSave
                          onClick={() => {
                            setEditingId(null);
                            onSubmit(index);
                          }}
                        />
                      ) : (
                        <EditIcon onClick={() => setEditingId(_id)} />
                      )}
                    </span>
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50 "
                      onClick={() => handleDelete(_id)}
                    >
                      <DeleteIcon />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};

export default Favorites;
