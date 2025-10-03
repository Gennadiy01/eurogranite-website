/**
 * Products Store (Zustand)
 *
 * Manages products state and API interactions
 */

import { create } from 'zustand';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api/productsApi';

export const useProductsStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllProducts();
      set({ products: data.data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Failed to fetch products:', error);
    }
  },

  // Add new product
  addProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const data = await createProduct(productData);
      set((state) => ({
        products: [...state.products, data.data],
        loading: false,
      }));
      return data.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Failed to create product:', error);
      throw error;
    }
  },

  // Update existing product
  updateProduct: async (id, productData) => {
    set({ loading: true, error: null });
    try {
      const data = await updateProduct(id, productData);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? data.data : p)),
        loading: false,
      }));
      return data.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Failed to update product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Failed to delete product:', error);
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
