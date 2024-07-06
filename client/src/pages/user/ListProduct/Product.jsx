import lable from "assets/label.png";
import ICONS from "utils/icons";
import { useState } from "react";
import { formatMoney, renderStars } from "utils/helper";
import { Link, generatePath } from "react-router-dom";
import path from "utils/path";

function Product({ data, isNew, normal }) {
  return (
    <div className="w-full  text-base">
      <Link
        className="w-full border f p-[15px] flex flex-col  justify-center cursor-pointer"
        to={generatePath(path.DETAIL_PRODUCT, {
          category: data?.category.toLowerCase(),
          title: data?.title,
          id: data?._id,
        })}
      >
        <div className="w-full relative   flex justify-center items-center">
          <img
            src={
              data?.thumb ||
              "https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg"
            }
            alt={data.title}
            className="w-[243px] h-[243px]  object-cover"
          />
          {!normal && (
            <>
              <img
                src={lable}
                alt="lable"
                className={`absolute top-[-24px] left-[-38px] h-[60px] object-cover ${
                  isNew ? "w-[100px]" : "w-[130px]"
                }`}
              />
              <span className="text-white absolute -rotate-12 top-[-8px] font-semibold left-[-12px]">
                {isNew ? "New" : "Trending"}
              </span>
            </>
          )}
        </div>
        {/* info */}
        <div className="flex flex-col gap-2 mt[15px] items-start w-full">
          <span className="line-clamp-1">{data?.title}</span>
          <span className="flex ">
            {renderStars(data?.totalRatings).map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span>{formatMoney(data?.price)} VNĐ</span>
        </div>
      </Link>
    </div>
  );
}

export default Product;
