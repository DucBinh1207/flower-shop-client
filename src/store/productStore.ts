import { create } from "zustand";
import { Product } from "../types";
import { persist } from "zustand/middleware";

interface ProductState {
  productImage: string;
  products: Product[];
  addProducts: (products: Product[], productImage: string) => void;
  clearProduct: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      productImage: "",

      addProducts: (products: Product[], productImage: string) => {
        set({ products, productImage });
      },

      clearProduct: () => {
        set({ products: [], productImage: "" });
      },
    }),
    {
      name: "product-storage", 
    }
  )
);
