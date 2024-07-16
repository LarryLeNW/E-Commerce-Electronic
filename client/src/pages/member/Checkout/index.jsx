import paymentSvg from "assets/payment.svg";
import withBaseComponent from "hocs";
import { Navigate } from "react-router-dom";
import { formatMoney } from "utils/helper";
import path from "utils/path";

function Checkout({ useSelector }) {
  const { userInfo, isLogged } = useSelector((state) => state.auth);
  //   if (!userInfo?.data) return <Navigate to={path.HOME} replace={true} />;

  return (
    <div className="p-4 flex  justify-center ">
      <div className="w-[40%] h-full    ">
        <img src={paymentSvg} alt="payment" className=" object-cover" />
      </div>
      <div className="border rounded h-full p-4 w-[50%]">
        <h2 className="text-2xl font-bold">Kiểm tra đơn hàng của bạn</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="border border-gray-200">
              <th className="p-2 text-left">Products </th>
              <th className="text-center p-2">Quantity</th>
              <th className="text-right p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {userInfo?.data?.cart.map((item, index) => (
              <tr key={index} className="border">
                <td className="p-2 text-left">{item.title}</td>
                <td className="text-center p-2">{item.quantity}</td>
                <td className="text-right p-2">
                  {formatMoney(item.price)}vnđ{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 justify-end font-bold">
          <span>Tổng tiền : </span>
          <span className="text-green-800">
            {formatMoney(
              userInfo?.data?.cart.reduce(
                (sum, c) => (sum += c?.quantity * c?.price),
                0
              )
            )}{" "}
            vnđ
          </span>
        </div>
        <div>Input address</div>
        <div>Payment </div>
      </div>
    </div>
  );
}

export default withBaseComponent(Checkout);
