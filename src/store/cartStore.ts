import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === newItem.productId,
          );

          if (existingItemIndex !== -1) {
            // Update quantity if item already exists
            const updatedItems = [...state.items];
            if (updatedItems[existingItemIndex]) {
              updatedItems[existingItemIndex].quantity += newItem.quantity;
            }
            return { items: updatedItems };
          }
          // Add new item
          return { items: [...state.items, newItem] };
        }),

      updateItemQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === id ? { ...item, quantity } : item,
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== id),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "seedbloom-cart",
    },
  ),
);
