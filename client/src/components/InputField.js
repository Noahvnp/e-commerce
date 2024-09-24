import React from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  placeholder,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="w-full">
      <input
        type={type || "text"}
        className="w-full border-b-2 px-4 py-2 focus:outline-none"
        placeholder={
          placeholder &&
          placeholder.slice(0, 1).toUpperCase() + placeholder.slice(1)
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  );
};

export default InputField;
