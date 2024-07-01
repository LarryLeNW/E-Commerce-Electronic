import { memo } from "react";

function Button({
  name,
  handleClick,
  style,
  iconBefore,
  iconAfter,
  fw,
  disabled,
}) {
  return (
    <div
      type="button"
      className={
        style ||
        `px-4 p-2 rounded-md text-white bg-main font-semibold cursor-pointer text-center ${
          fw ? "w-full" : "w-fit"
        } ${!!disabled && "opacity-30 cursor-not-allowed"}
        `
      }
      onClick={() => {
        !disabled && handleClick && handleClick();
      }}
    >
      {iconBefore}
      <span> {name}</span>
      {iconAfter}
    </div>
  );
}

export default memo(Button);
