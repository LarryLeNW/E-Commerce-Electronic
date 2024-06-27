import { formatMoney } from "../utils/helper";
import lable from "../assets/label.png";

function Product({ data, isNew }) {
  return (
    <div className="w-full text-base pr-5 px-10">
      <div className="w-full border p-[15px] flex flex-col items-center">
        <div className="w-full relative ">
          <img
            src={
              data?.thumb ||
              "https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg"
            }
            alt={data.title}
            className="w-[243px] h-[243px]  object-cover"
          />
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
        </div>

        {/* info */}
        <div className="flex flex-col gap-2 mt[15px] items-start w-full">
          <span className="line-clamp-1">{data?.title}</span>
          <span>{formatMoney(data?.price)} VNĐ</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
