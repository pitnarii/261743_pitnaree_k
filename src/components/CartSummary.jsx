import { useState } from "react";
import { useCart } from "../context/cartContext";
import { getDiscount } from "../data/Discount";

export default function CartSummary() {
  const { state, dispatch } = useCart();
  const [code, setCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");

  const { subtotal, discount, total } = getDiscount(
    state.cartItems,
    appliedCode
  );

  return (
    <div className="w-full max-w-sm border border-gray-300 rounded-xl p-4">
      <h3 className="font-bold">Cart Summary</h3>
      <div className="mt-3 flex items-center gap-3">
        <input
          className="w-full border border-black rounded-xl px-3 py-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
        />
        <button
          type="button"
          className="cursor-pointer bg-black px-4 py-2 text-white rounded-xl"
          onClick={() => setAppliedCode(code)}
        >
          Apply
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <p>Subtotal: ฿{subtotal}</p>
        <p>Discount: ฿{discount}</p>
        <p className="font-bold">Total: ฿{total}</p>
      </div>
      <button
        className="mt-4 w-full cursor-pointer bg-black px-4 py-2 text-white rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => dispatch({ type: "CLEAR_CART" })}
        disabled={state.cartItems.length === 0}
      >
        Checkout
      </button>
    </div>
  );
}