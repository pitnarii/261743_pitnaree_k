import { useCart } from "../context/cartContext";

export default function ProductCard({ item }) {
    const { dispatch } = useCart();
  return (
    <div className="w-fit border border-gray-300 p-4 rounded-xl flex flex-col items-center">
      <div>
        <h3 className="font-bold pb-4">{item.name}</h3>
      </div>
      <div>{item.img && <img src={item.img} alt={item.name} />}</div>
      <div>
        <span>Size: </span>
        <span>{item.size}</span>
      </div>
      <div>
        <span>Color: </span>
        <span>{item.color}</span>
      </div>
      <div>
        <span>Price: </span>
        <span>฿{item.price}</span>
      </div>
      <button
        className="mt-3 cursor-pointer bg-black px-4 py-2 text-white rounded-xl"
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}
      >
        Add to cart
      </button>
    </div>
  );
}
