import { getSubscribersList } from "@/api/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { columns } from "./data";

interface ISubscribe {
  _id: string;
  name: string;
  email: string;
  message: string;
  subject: string;
}

const Subscribe = () => {
  const [subscribers, setNewSubscribers] = useState<ISubscribe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getSubscribersList();
        setNewSubscribers(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subscribers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(subscribers.length / itemsPerPage);

  return (
    <div>
      <Table aria-label="Example table with custom cells" className="w-full">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              className="w-1/2"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody>
          {currentItems.map(({ _id, email }, index) => {
            return (
              <TableRow key={_id}>
                <TableCell>
                  <input
                    className="bg-white"
                    value={indexOfFirstItem + index + 1}
                    readOnly
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <input className="bg-white" value={email} readOnly disabled />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            className="w-[40px] h-[40px] rounded-full flex justify-center items-center"
            onClick={() => {
              currentPage > 1 && setCurrentPage((prev) => prev - 1);
            }}
            disabled={currentPage === 1}
          >
            <GrFormPrevious />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`w-[40px] h-[40px] rounded-full mx-2 ${
                currentPage === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="w-[40px] h-[40px] rounded-full flex justify-center items-center"
            onClick={() => {
              currentPage < totalPages && setCurrentPage((prev) => prev + 1);
            }}
            disabled={currentPage === totalPages}
          >
            <GrFormNext />
          </button>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
