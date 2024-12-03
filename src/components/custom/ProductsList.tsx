import { useGetProductsQuery } from "@/services/productsApiSlice";
import { Link } from "react-router-dom";
import { paths } from "@/routes/paths";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";
import { PopoverArrow } from "@radix-ui/react-popover";

const ProductsList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl">
        Loading products...
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
      <h1 className="text-4xl text-center font-bold pt-16">Products List</h1>
      <ul className="grid grid-cols-5 gap-4 px-10 py-10">
        {products?.map((product) => (
          <li
            key={product.id}
            className="p-4 flex flex-col items-center gap-4 border-2 border-gray-200 rounded-lg hover:scale-[.97] transition-transform will-change-transform"
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
                  className="flex flex-col gap-4">
                  <h3 className="font-bold text-xs text-center">
                    {product.title}
                  </h3>
                  <p className="text-xs">
                    <strong>Description: </strong>
                    {product.description}
                  </p>
                  <p className="text-xs">
                    <strong>Category: </strong>
                    {product.category}
                  </p>
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
              to={`${paths.productDetail.replace(":id", String(product.id))}`}
              className="bg-[#40bfff] hover:bg-red-500 text-white text-center py-2 w-full rounded-full">
              Product Detail
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsList;
