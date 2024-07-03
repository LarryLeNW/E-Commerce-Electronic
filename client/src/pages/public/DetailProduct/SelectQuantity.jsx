import { memo } from "react";

function SelectQuantity({ quantity, handleQuantity, handleClickQuantity }) {
  return (
    <div className="flex items-center">
      <span
        className=" p-2 border-r border-black cursor-pointer"
        onClick={() => handleClickQuantity("minus")}
      >
        -
      </span>
      <input
        type="number"
        className="py-2 px-4 outline-none w-[80px]"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <span
        className=" p-2 border-l border-black cursor-pointer"
        onClick={() => handleClickQuantity("plus")}
      >
        +
      </span>
    </div>
  );
}

export default memo(SelectQuantity);
