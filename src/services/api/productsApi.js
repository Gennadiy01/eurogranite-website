/**
 * Products API Client
 *
 * Handles all API calls related to products CRUD operations
 */

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE}/products`);
    return response.data; // { success: true, count: 12, data: [...] }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Помилка завантаження продуктів');
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/products/${id}`);
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Помилка завантаження продукту');
  }
};

// Create new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE}/products`, productData);
    return response.data; // { success: true, message: "...", data: {...} }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Помилка створення продукту');
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_BASE}/products/${id}`, productData);
    return response.data; // { success: true, message: "...", data: {...} }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Помилка оновлення продукту');
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/products/${id}`);
    return response.data; // { success: true, message: "...", data: {...} }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Помилка видалення продукту');
  }
};

// Upload image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // { success: true, imageUrl: "..." }
};
