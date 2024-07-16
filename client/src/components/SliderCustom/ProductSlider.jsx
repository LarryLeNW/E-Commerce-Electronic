import lable from "assets/label.png";
import SelectOption from "./SelectOption";
import ICONS from "utils/icons";
import { useState } from "react";
import { formatMoney, renderStars } from "utils/helper";
import { generatePath } from "react-router-dom";
import path from "utils/path";
import withBaseComponent from "hocs";
import { showModal } from "redux/slicers/common.slicer";
import QuickViewProduct from "components/Modal/QuickViewProduct";
import { updateCartRequest } from "redux/slicers/auth.slicer";
import { notification } from "antd";

function Product({
  data,
  isNew,
  normal,
  dispatch,
  navigate,
  useSelector,
  checkLoginBeforeAction,
  style,
}) {
  const [isShowOption, setShowOption] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const handleClickOptions = (e, type) => {
    e.stopPropagation();
    switch (type) {
      case "AddCart":
        checkLoginBeforeAction(() =>
          dispatch(
            updateCartRequest({
              data: {
                pid: data?._id,
                title: data?.title,
                quantity: 1,
                price: data?.price,
                color: data?.color,
                thumb: data?.thumb,
              },
              callback: () => {
                notification.success({
                  message: `Cập nhật ${data?.title} vào giỏ hàng thành công ...`,
                  duration: 1,
                });
              },
            })
          )
        );
        break;
      case "QuickView":
        dispatch(
          showModal({
            isShowModal: true,
            children: <QuickViewProduct productData={data} />,
          })
        );
        console.log("QuickView");
        break;
      case "WishList":
        console.log("WishList");
        break;
    }
  };

  return (
    <div className={style || "w-full text-base mx-auto  pr-5 px-10"}>
      <div
        className="w-full border  p-[15px] flex flex-col items-center cursor-pointer"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setShowOption(false);
        }}
        onClick={() =>
          navigate(
            generatePath(path.DETAIL_PRODUCT, {
              category: data?.category.toLowerCase(),
              title: data?.title,
              id: data?._id,
            })
          )
        }
      >
        <div className="w-full relative ">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex gap-2 justify-center animate-slide-top animate-slide-topsm">
              <span
                title="Quick View"
                onClick={(e) => handleClickOptions(e, "QuickView")}
              >
                <SelectOption icon={<ICONS.AiFillEye />} />
              </span>
              <span
                title="Add to cart"
                onClick={(e) => handleClickOptions(e, "AddCart")}
              >
                <SelectOption
                  icon={
                    userInfo.data?.cart?.some(
                      (el) => el.product == data?._id
                    ) ? (
                      <ICONS.BsFillCartCheckFill color="green" />
                    ) : (
                      <ICONS.FaCartArrowDown />
                    )
                  }
                />
              </span>
              <span
                title="Add wishlist"
                onClick={(e) => handleClickOptions(e, "WishList")}
              >
                <SelectOption icon={<ICONS.BsFillSuitHeartFill />} />
              </span>
            </div>
          )}
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
      </div>
    </div>
  );
}

export default withBaseComponent(Product);
