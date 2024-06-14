import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { createSlug } from "../utils/helpers";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="flex flex-col justify-start gap-5 px-4 pb-10 pt-4">
      {categories?.map((category) => (
        <NavLink
          key={createSlug(category.title)}
          to={createSlug(category.title)}
          className={({ isActive }) =>
            isActive
              ? ""
              : "text-xl font-medium duration-200 hover:text-primary"
          }
        >
          {category.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
