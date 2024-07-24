import { notification } from "antd";
import Button from "components/Form/Button";
import withBaseComponent from "hocs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generatePath } from "react-router-dom";
import { showModal } from "redux/slicers/common.slicer";
import { orderRequest } from "redux/slicers/order.slicer";
import Swal from "sweetalert2";
import path from "utils/path";

function ModalCheckout({
  checkLoginBeforeAction,
  dispatch,
  navigate,
  dataProduct,
}) {
  const { userInfo, isLogged } = useSelector((state) => state.auth);
  const [address, setAddress] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [typePayment, setTypePayment] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (userInfo.data) {
      setAddress(userInfo.data?.address);
      setNumberPhone(userInfo.data?.mobile);
    }
  }, [userInfo.data]);

  // Handler for radio button change
  const handlePaymentTypeChange = (e) => {
    if (e.target.value === "Online") {
      notification.warning({
        message: "Hệ thống bảo trì, xin cảm ơn",
        duration: 1,
      });
      return;
    }
    setTypePayment(e.target.value);
  };

  const handleOrder = () => {
    if (!(numberPhone && address)) {
      notification.warning({ message: "Vui lòng điền đầy đủ thông tin" });
      return;
    }
    if (!typePayment) {
      notification.warning({ message: "Vui lòng chọn phương thức thanh toán" });
      return;
    }

    checkLoginBeforeAction(() => {
      dispatch(
        orderRequest({
          data: {
            products: [{ ...dataProduct, quantity: 1 }],
            address,
            numberPhone,
            typePayment,
            note,
            total: dataProduct?.price,
          },
          callback: (res) => {
            let url;
            if (res?.data?._id) {
              navigate(path.MEMBER.HISTORY);
              Swal.fire(
                "Tech Shop",
                "Cảm ơn sự tin tưởng của bạn ...",
                "success"
              );
              url = generatePath(path.MEMBER.SHOW_BILL, {
                oid: res?.data?._id,
              });
            } else {
              url = res;
            }
            dispatch(showModal({isShowModal : false}))
            window.open(url, "_blank");
          },
        })
      );
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-1/2 h-fit rounded border-black my-auto p-4 flex flex-col  overflow-x-auto  bg-blue-400"
    >
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        Checkout
      </div>
      <div className="p-2 flex flex-col gap-2  ">
        <span className="font-bold">Địa chỉ</span>
        <input
          type="text"
          placeholder="Vui lòng nhập địa chỉ muốn giao đến..."
          className="border border-main p-1 outline-main py-4 px-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="p-2 flex flex-col gap-2">
        <span className="font-bold">Số điện thoại</span>
        <input
          type="text"
          className="border border-main p-1"
          value={numberPhone}
          onChange={(e) => setNumberPhone(e.target.value)}
        />
      </div>
      <div className="p-2 flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <label htmlFor="Direct" className="font-bold cursor-pointer">
            Thanh toán khi nhận hàng
          </label>
          <input
            id="Direct"
            type="radio"
            name="typePayment"
            value="Direct"
            checked={typePayment === "Direct"}
            onChange={handlePaymentTypeChange}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <label htmlFor="online" className="font-bold cursor-pointer">
            Thanh toán qua banking
          </label>
          <input
            id="online"
            type="radio"
            name="typePayment"
            value="Online"
            checked={typePayment === "Online"}
            onChange={handlePaymentTypeChange}
          />
        </div>
      </div>
      <div className="p-2 flex flex-col gap-2">
        <span className="font-bold">Ghi chú đến shop</span>
        <textarea
          type="text"
          className="border border-main p-1"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <Button fw name={"Đặt hàng ngay"} handleClick={handleOrder} />
    </div>
  );
}

export default withBaseComponent(ModalCheckout);
