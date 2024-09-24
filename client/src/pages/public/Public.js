import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";

const Public = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex h-[40px] w-full items-center justify-center bg-black font-main2 font-extralight text-white">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <span className="cursor-pointer pl-2 font-medium">Shop Now</span>
      </div>
      <Header />
      <div className="container min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
