import React from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "../utils/constants";

import icons from "../utils/icons";
import logo from "../assets/logo.png";

const { BsCart3, BsSearch, BsSuitHeart } = icons;

const Header = () => {
  // const handleClick = () => {};

  return (
    <div className="header sticky top-0 w-full bg-[#FFFFFF] ">
      <div className="container flex h-[100px] items-center justify-center">
        <span className="w-[25%] flex-auto text-3xl font-bold">
          {/* Eshop Digital */}
          <img src={logo} alt="logo" className="w-[220px] object-contain" />
        </span>
        <div className=" flex w-[75%] flex-auto items-center justify-between gap-5 ">
          <div className="flex items-center justify-center gap-14">
            {navigation.map((el) => (
              <NavLink
                to={el.path}
                key={el.id}
                className={({ isActive }) =>
                  isActive
                    ? "border-b border-black text-xl font-medium text-main"
                    : "text-xl font-medium duration-200 hover:text-main"
                }
              >
                {el.value}{" "}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center justify-center rounded-md bg-[#eee] px-4 py-2">
              <input
                type="text"
                className="flex-auto bg-[#eee] font-medium outline-none"
                placeholder="Tìm kiếm..."
              />
              <span className="cursor-pointer hover:text-main">
                <BsSearch fontSize={"22"} />
              </span>
            </div>
            <span className="cursor-pointer">
              <BsSuitHeart
                fontSize={"22"}
                className="duration-200 hover:text-main"
              />
            </span>
            <span className="cursor-pointer hover:text-main">
              <BsCart3 fontSize={"22"} />
            </span>
            {/* <span
            className="cursor-pointer hover:text-main"
            onClick={handleClick}
          >
            <LuUser fontSize={"26"} />
          </span> */}
          </div>
        </div>
      </div>
      <div className=" w-full border-b-2"></div>
    </div>
  );
};

export default Header;
