import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "@/services/productsApiSlice";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";
import { PopoverArrow } from "@radix-ui/react-popover";

const ProductsCategoryPage = () => {
  //   const location = window.location.pathname;
  //   const currentPath = location.split("/").pop();
  //   console.log("currentPath====>>>>", currentPath);
  const { category } = useParams<{ category: string }>(); // Get the products category from the URL
  const productsCategory = String(category); // Convert category to a string

  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(productsCategory);
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl">
        Loading {category} products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500 text-3xl">
        Error: Something went wrong loading {productsCategory} products!
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl text-center font-bold pb-8 pt-20 capitalize">
        {productsCategory} products list
      </h1>
      <ul className="grid grid-cols-5 gap-4 p-4">
        {products?.map((product) => (
          <li
            key={product.id}
            className="p-4 flex flex-col items-center gap-4 border-2 border-gray-200 rounded-lg hover:scale-95 transition-transform duration-300 will-change-transform text-sm"
            onMouseEnter={() => setOpenPopover(product.id)}
            onMouseLeave={() => setOpenPopover(null)}>
            <div className="flex flex-col">
              <img
                src={product.image}
                alt={product.title}
                className="aspect-[3/2] object-contain"
              />
              <Popover open={openPopover === product.id}>
                <PopoverTrigger />
                <PopoverContent
                  side="right"
                  align="start"
                  className="flex items-center gap-4 w-[550px]">
                  <div>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col text-xs gap-1">
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
                      <span className="text-[#40bfff] font-bold">
                        $ {product?.price}
                      </span>
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
                  </div>

                  <PopoverArrow fill="#40bfff" width={15} height={10} />
                </PopoverContent>
              </Popover>
            </div>
            <h2 className="text-center mb-auto font-semibold">
              {product.title}
            </h2>
            <div className="flex w-full justify-between text-xs">
              <span className="text-[#40bfff] font-bold">
                $ {product.price}
              </span>
              <span>Reviews: {product.rating.count} </span>
              <span>Rating: {product.rating.rate}/5 </span>
            </div>
            <Link
              to={`/product/${String(product.id)}`}
              className="bg-[#40bfff] hover:bg-red-500 text-white text-center py-2 w-full rounded-full">
              Product Detail
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsCategoryPage;
