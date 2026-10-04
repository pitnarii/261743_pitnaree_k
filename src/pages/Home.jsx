import { Products } from "../data/Product";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/cartContext";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

export default function Home() {
  const { state } = useCart();

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6 px-6">
        {Products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
      <h2 className="font-bold flex items-center justify-center pt-6 pb-4">Cart Items</h2>
      <div className="flex flex-col items-center gap-4 px-6 mt-8">
        {state.cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <CartSummary />
      </div>
    </div>
  );
}