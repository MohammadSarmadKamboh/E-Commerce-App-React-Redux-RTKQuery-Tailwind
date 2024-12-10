import NavBar from "@/components/custom/NavBar";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <NavBar />

      <Outlet />
    </>
  );
};

export default DefaultLayout;
