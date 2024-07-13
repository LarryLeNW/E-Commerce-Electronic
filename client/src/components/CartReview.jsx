import withBaseComponent from "hocs";
import { removeCartRequest } from "redux/slicers/auth.slicer";
import { showModal } from "redux/slicers/common.slicer";
import { formatMoney } from "utils/helper";
import ICONS from "utils/icons";
import Button from "./Form/Button";
import path from "utils/path";

function CartReview({ navigate, dispatch, useSelector }) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-full flex justify-end ">
      <div
        className=" w-[30%]  h-full overflow-y-auto bg-black text-white p-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className=" py-4 border-b border-gray-300 font-bold text-2xl flex justify-between items-center">
          <span>Your cart</span>
          <ICONS.IoIosCloseCircleOutline
            color="orange"
            className="cursor-pointer"
            onClick={() => dispatch(showModal({ isShowModal: false }))}
          />
        </header>
        <div className="flex-4 overflow-y-auto flex flex-col gap-3 py-2">
          {userInfo.data?.cart?.map((el) => (
            <div className="flex p-2" key={el?.product?._id}>
              <img
                src={el?.product?.thumb}
                alt=""
                className="w-16 h-16 object-cover"
              />
              <div className="p-2 text-sm">
                <div className="text-main">{el?.product?.title}</div>
                <div className="text-green-700">
                  {formatMoney(el?.product?.price)} vnđ
                </div>
              </div>
              <ICONS.IoMdRemoveCircleOutline
                className="ml-auto text-red-500 cursor-pointer "
                size={24}
                onClick={() =>
                  dispatch(removeCartRequest({ pid: el?.product?._id }))
                }
              />
            </div>
          ))}
        </div>
        <div className="mt-auto flex-1  border-t border-gray-200 ">
          <div className="flex justify-between p-2">
            <span>Subtotal : </span>
            <span className="font-bold text-green-700">
              {formatMoney(
                userInfo.data?.cart?.reduce(
                  (sum, el) => (sum += el?.product?.price),
                  0
                )
              )}
              vnđ
            </span>
          </div>
          <Button
            fw
            name={"Detail cart"}
            handleClick={() => {
              navigate(path.DETAIL_CART);
              dispatch(showModal({ isShowModal: false }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(CartReview);
