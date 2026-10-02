import { useCart } from "../context/cartContext";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <>
    <div className="w-full max-w-sm border border-gray-300 rounded-xl p-4">
      <h3 className="font-bold">{item.name}</h3>
      <p>Price: ฿{item.price}</p>
      <div className="flex items-center gap-3 mt-2 my-2">
        <button className="bg-transparent hover:bg-blue-500 font-bold hover:text-white py-1 px-3 border border-black hover:border-transparent rounded" onClick={() => dispatch({ type: "DECREMENT", payload: item.id })}>-</button>
        <span>{item.quantity}</span>
        <button className="bg-transparent hover:bg-blue-500 font-bold hover:text-white py-1 px-3 border border-black hover:border-transparent rounded" onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}>+</button>
      </div>
      <p>Total: ฿{item.price * item.quantity}</p>
      <button className="mt-3 cursor-pointer bg-black px-4 py-2 text-white rounded-xl" onClick={() => dispatch({ type: "REMOVE_CART_ITEMS", payload: item.id })}>
        Remove
      </button>
    </div>
    </>
  )
}