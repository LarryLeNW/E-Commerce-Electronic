import { memo } from "react";

function Button({ name, handleClick, style, iconBefore, iconAfter, fw }) {
  return (
    <div
      type="button"
      className={
        style ||
        `px-4 p-2 rounded-md text-white bg-main font-semibold cursor-pointer text-center ${
          fw ? "w-full" : "w-fit"
        }`
      }
      onClick={() => {
        handleClick && handleClick();
      }}
    >
      {iconBefore}
      <span> {name}</span>
      {iconAfter}
    </div>
  );
}

export default memo(Button);
