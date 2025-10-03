/**
 * Products API Client
 *
 * Handles all API calls related to products CRUD operations
 */

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get(`${API_BASE}/products`);
  return response.data; // { success: true, count: 12, data: [...] }
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await axios.get(`${API_BASE}/products/${id}`);
  return response.data; // { success: true, data: {...} }
};

// Create new product
export const createProduct = async (productData) => {
  const response = await axios.post(`${API_BASE}/products`, productData);
  return response.data; // { success: true, message: "...", data: {...} }
};

// Update product
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_BASE}/products/${id}`, productData);
  return response.data; // { success: true, message: "...", data: {...} }
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE}/products/${id}`);
  return response.data; // { success: true, message: "...", data: {...} }
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
