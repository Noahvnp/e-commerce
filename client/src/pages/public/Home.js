import React from "react";
import { Banner, Sidebar, SlickSlider } from "../../components";

const Home = () => {
  return (
    <div className="container flex justify-start">
      <div className="flex h-full w-[20%] flex-auto flex-col gap-2 border-r-2">
        <Sidebar />
      </div>
      <div className="w-[80%] flex-auto gap-2 pl-10 pt-2">
        <Banner />
        <SlickSlider />
      </div>
    </div>
  );
};

export default Home;
