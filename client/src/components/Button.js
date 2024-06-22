import React from "react";

const Button = ({
  name,
  handleOnclick,
  bgColor,
  textColor,
  font,
  iconBefore,
  iconAfter,
  fw,
}) => {
  return (
    <button
      type="button"
      className={`${bgColor} ${textColor} ${font} ${fw ? "w-full" : "w-fit"} flex w-full items-center justify-center gap-6
      rounded-md border-2 p-4 duration-200`}
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
