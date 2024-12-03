import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/services/productsApiSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import { Product } from "@/interfaces/interface";
import Cart from "./Cart";

// import LoadingSpinner from '@/components/LoadingSpinner'; // Custom loading spinner component
// import ErrorComponent from '@/components/ErrorComponent'; // Custom error component

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // Get the product id from the URL
  const productId = Number(id); // Convert id to a number

  // Use RTK Query's hook to fetch the product details by ID
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500 text-3xl">
        Error: Something went wrong!
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <img
          src={product?.image}
          alt={product?.title}
          className="aspect-[2/1] object-contain px-4"
        />
        <div className="flex flex-col justify-center gap-4 px-4">
          <span>
            <strong>Title: </strong>
            {product?.title}
          </span>
          <span>
            <strong>Category: </strong>
            {product?.category}
          </span>
          <span>
            <strong>Price: </strong>
            <span className="text-[#40bfff] font-bold">$ {product?.price}</span>
          </span>
          <span>
            <strong>Reviews: </strong>
            {product?.rating.count}
          </span>
          <span>
            <strong>Rating: </strong>
            {product?.rating.rate}/5
          </span>
          <span className="text-justify">
            <strong>Description: </strong>
            {product?.description}
          </span>
          <span className="flex justify-center">
            <button
              onClick={() => product && handleAddToCart(product)}
              className="bg-[#40bfff] hover:bg-red-500 text-white text-center py-2 w-1/2 rounded-full">
              Add to Cart
            </button>
          </span>
        </div>
      </div>
      <Cart />
    </>
  );
};

export default ProductDetail;
