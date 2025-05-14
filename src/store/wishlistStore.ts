import { create } from "zustand";
import { Product } from "../types";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (!existingItem) {
          set({ items: [...items, product] });
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "wishlist-storage", // unique name for localStorage
    },
  ),
);
