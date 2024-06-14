import React from "react";

const Button = ({ name, handleOnclick, className, iconBefore, iconAfter }) => {
  return (
    <button
      type="button"
      className={
        className
          ? className
          : "w-full rounded-md bg-main px-4 py-2 font-semibold text-white"
      }
      onClick={() => {
        handleOnclick && handleOnclick();
      }}
    >
      {iconBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default Button;
