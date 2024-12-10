import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllProducts = async () => {
  const { data } = await axios.get(BASE_URL + "/product");
  return data;
};

export const getDetailsById = async (id: string) => {
  const { data } = await axios.get(BASE_URL + `/product/${id}`);
  return data;
};

export const getRelatedProductsById = async (id: string) => {
  const { data } = await axios.get(
    `http://localhost:9089/guest/product-category/${id}`
  );
  return data;
};

export const getHomeNewCollection = async (id: string) => {
  const { data } = await axios.get(BASE_URL + `/homeNewCollection`);
  return data;
};
