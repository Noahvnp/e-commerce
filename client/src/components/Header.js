import React from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "../utils/constants";

import icons from "../utils/icons";

const { BsCart3, BsSearch, BsSuitHeart, LuUser } = icons;

const Header = () => {
  return (
    <div className="container flex h-[120px] items-center justify-center py-[35px]">
      <span className="w-[25%] flex-auto text-3xl font-bold">
        Eshop Digital
      </span>
      <div className=" flex w-[75%] flex-auto items-center justify-between gap-5 ">
        <div className="flex items-center justify-center gap-14">
          {navigation.map((el) => (
            <NavLink
              to={el.path}
              key={el.id}
              className={({ isActive }) =>
                isActive
                  ? "text-2xl font-medium text-main"
                  : "text-2xl font-medium hover:text-main"
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
          <span className="cursor-pointer hover:text-main">
            <BsSuitHeart fontSize={"22"} />
          </span>
          <span className="cursor-pointer hover:text-main">
            <BsCart3 fontSize={"22"} />
          </span>
          <span className="cursor-pointer hover:text-main">
            <LuUser fontSize={"26"} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
