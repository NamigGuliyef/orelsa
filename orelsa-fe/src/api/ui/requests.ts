import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllProducts = async () => {
  const { data } = await axios.get("https://orelsa.vercel.app/guest/product");
  return data;
};

export const getDetailsById = async (id: string) => {
  const { data } = await axios.get(`https://orelsa.vercel.app/guest/product/${id}`);
  return data;
};

export const getRelatedProductsById = async (id: string) => {
  const { data } = await axios.get(
    `https://orelsa.vercel.app/guest/product-category/${id}`
  );
  return data;
};

export const getHomeNewCollection = async () => {
  const { data } = await axios.get("https://orelsa.vercel.app/guest/homeNewCollection");
  return data;
};
