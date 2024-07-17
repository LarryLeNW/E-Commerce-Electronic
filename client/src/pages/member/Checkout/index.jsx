import { notification } from "antd";
import paymentSvg from "assets/payment.svg";
import Button from "components/Form/Button";
import withBaseComponent from "hocs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { orderRequest } from "redux/slicers/order.slicer";
import Swal from "sweetalert2";
import { formatMoney } from "utils/helper";
import path from "utils/path";

function Checkout({ useSelector, checkLoginBeforeAction, dispatch }) {
  const { userInfo, isLogged } = useSelector((state) => state.auth);
  const [address, setAddress] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [typePayment, setTypePayment] = useState("");
  const [note, setNote] = useState("");
  let [total, setTotal] = useState(0);

  useEffect(() => {
    if (userInfo.data) {
      setAddress(userInfo.data?.address);
      setNumberPhone(userInfo.data?.mobile);
      setTotal(
        userInfo.data?.cart?.reduce(
          (sum, c) => (sum += c?.quantity * c?.price),
          0
        )
      );
    }
  }, [userInfo.data]);

  // if (!userInfo?.data) return <Navigate to={path.HOME} replace={true} />;

  // Handler for radio button change
  const handlePaymentTypeChange = (e) => {
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
            address,
            numberPhone,
            typePayment,
            note,
          },
          callback: () => {
            Swal.fire(
              "Tech Shop",
              "Cảm ơn sự tin tưởng của bạn ...",
              "success"
            );
          },
        })
      );
    });
  };

  let tokenUser = Cookies.get("refreshToken");
  if (tokenUser && userInfo.loading) {
    return;
  } else if (!userInfo?.data?._id) {
    <Navigate to={path.HOME} replace={true} />;
  }

  return (
    <div className="p-4 flex justify-center">
      <div className="w-[40%] h-full">
        <img src={paymentSvg} alt="payment" className="object-cover" />
      </div>
      <div className="border rounded h-full p-4 w-[50%]">
        <h2 className="text-2xl font-bold">Kiểm tra đơn hàng của bạn</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="border border-gray-200">
              <th className="p-2 text-left">Sản phẩm</th>
              <th className="text-center p-2">Số lượng</th>
              <th className="text-right p-2">Giá</th>
            </tr>
          </thead>
          <tbody>
            {userInfo?.data?.cart.map((item, index) => (
              <tr key={index} className="border">
                <td className="p-2 text-left">{item.title}</td>
                <td className="text-center p-2">{item.quantity}</td>
                <td className="text-right p-2">{formatMoney(item.price)}vnđ</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 justify-end font-bold">
          <span>Tổng tiền:</span>
          <span className="text-green-800">{formatMoney(total)} vnđ</span>
          <span className="text-blue-800">~ {total / 25000} USD </span>
        </div>

        <div className="p-2 flex flex-col gap-2">
          <span className="font-bold">Địa chỉ</span>
          <input
            type="text"
            placeholder="Vui lòng nhập địa chỉ muốn giao đến..."
            className="border border-main p-1"
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
              Thanh toán qua paypal
            </label>
            <input
              id="online"
              type="radio"
              name="typePayment"
              value="Paypal"
              checked={typePayment === "Paypal"}
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
    </div>
  );
}

export default withBaseComponent(Checkout);
