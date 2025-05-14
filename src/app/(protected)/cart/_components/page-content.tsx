"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "src/store/cartStore";
import EmptyCart from "./empty";
import CartItemList from "./list";
import OrderSummary from "./summary";
import { useSession } from "@/components/contexts/session";

export default function PageContent() {
  const { items, clearCart } = useCartStore();
  const { isAuthenticated } = useSession();
  const router = useRouter();

  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(30000); // Default shipping fee

  useEffect(() => {
    // Calculate subtotal
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setSubtotal(total);

    // Adjust shipping fee based on subtotal
    if (total >= 300000) {
      setShippingFee(0); // Free shipping for orders above 300,000₫
    } else {
      setShippingFee(30000);
    }
  }, [items]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=checkout");
    } else {
      router.push("/checkout");
    }
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
        Giỏ hàng của bạn
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <CartItemList
            items={items}
            clearCart={clearCart}
          />
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <OrderSummary
            subtotal={subtotal}
            shippingFee={shippingFee}
            handleCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
