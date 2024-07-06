import { useEffect, useRef } from "react";
import ICONS from "utils/icons";

function VoteBar({ number, ratingCount, ratingTotal }) {
  const percentRef = useRef();

  useEffect(() => {
    percentRef.current.style.cssText = `right : ${
      100 - Math.round((ratingCount * 100) / ratingTotal) || 0
    }%`;
  }, [ratingCount, ratingTotal]);

  return (
    <div className="flex  gap-2 text-sm items-center text-gray-500 ">
      <div className="flex  items-center justify-center gap-1 text-sm ">
        <span>{number}</span>
        <ICONS.AiFillStar color="orange"></ICONS.AiFillStar>
      </div>
      <div className="flex-4">
        <div className="w-full relative  h-[6px] bg-gray-200 rounded-full ">
          <div ref={percentRef} className="absolute inset-0 bg-red-600 " />
        </div>
      </div>
      <div className="flex-1 flex justify-end text-sky-400 font-semibold fz">
        {ratingCount || 0} đánh giá
      </div>
    </div>
  );
}

export default VoteBar;
