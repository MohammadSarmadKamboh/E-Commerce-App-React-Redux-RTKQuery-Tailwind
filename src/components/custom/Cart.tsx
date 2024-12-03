import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="mt-4 text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="mt-6">
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="border-b border-gray-200 py-4 flex items-center space-x-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-24 object-contain"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Category: {item.category}
                  </p>
                  <p className="text-sm text-gray-900 mt-2">
                    Price: ${item.price.toFixed(2)}
                  </p>

                  <div className="mt-3 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-700">Quantity:</label>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 text-white bg-gray-500 rounded-full hover:bg-gray-600 focus:outline-none">
                        -
                      </button>
                      <span className="text-lg text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 text-white bg-gray-500 rounded-full hover:bg-gray-600 focus:outline-none">
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-sm text-[#40bfff] hover:text-red-500 focus:outline-none">
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-lg font-semibold text-gray-900">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
