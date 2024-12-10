import logo from "@/assets/logo.png";
import { paths } from "@/routes/paths";
import { useGetProductCategoriesQuery } from "@/services/productsApiSlice";
import {
  Link,
  // useNavigate
} from "react-router-dom";

const NavBar = () => {
  const { data: categories, error, isLoading } = useGetProductCategoriesQuery();
  //   const navigate = useNavigate();
  if (isLoading) return <div>Loading Categories...</div>;
  if (error)
    return <div>Error: Something went wrong loading categories....</div>;

  // const setCategory = (abc: string)=>{
  //     navigate(`/${abc}`)
  // }
  return (
    <nav className="fixed z-50 w-full bg-white flex items-center justify-between border-y-2 border-gray-200 py-2 px-4 hover:shadow-lg">
      <Link
        to="/"
        className="capitalize flex gap-2 font-semibold hover:text-[#40bfff]">
        <img
          src={logo}
          alt="Logo"
          className="size-6 hover:scale-125 transition-transform duration-300"
        />
        e-comm
      </Link>

      <ul className="flex gap-10">
        <li className="font-semibold hover:text-[#40bfff]">
          <Link to={paths.productsFromApi} className="capitalize">
            all products
          </Link>
        </li>
        {categories?.map((category, index) => (
          <li key={index} className=" font-semibold hover:text-[#40bfff] ">
            <Link to={`/products/category/${category}`} className="capitalize">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
