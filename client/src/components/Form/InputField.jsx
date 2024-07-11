import { memo, useEffect, useState } from "react";

function InputField({
  value,
  setValue,
  nameKey,
  type = "text",
  inValidFields,
}) {
  const [isDisplayMess, setIsDisplayMess] = useState(false);

  return (
    <div className="w-full relative ">
      {!!value?.trim() && (
        <label
          htmlFor={nameKey}
          className="text-[12px] absolute top-[-12px] left-[12px] block bg-white px-1 animate-slide-topsm"
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}

      <input
        type={type}
        className={`px-6 py-4 rounded-sm w-full border placeholder:text-sm placeholder:italic outline-main border-2 ${
          inValidFields[nameKey] && "border-red-700 "
        }`}
        placeholder={
          "Enter your " +
          nameKey?.slice(0, 1).toUpperCase() +
          nameKey?.slice(1) +
          "..."
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onKeyDown={() => setIsDisplayMess(true)}
      />
      {isDisplayMess && inValidFields[nameKey] && (
        <div className="text-sm text-red-500 italic">
          {inValidFields[nameKey]}
        </div>
      )}
    </div>
  );
}

export default memo(InputField);
