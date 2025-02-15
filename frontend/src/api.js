import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // Update this if needed

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const toggleSoldOut = async (id) => {
  await axios.patch(`${API_URL}/${id}`);
};
