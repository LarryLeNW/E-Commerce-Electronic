import withBaseComponent from "hocs";
import moment from "moment";
import { useEffect } from "react";
import { getOrderRequest } from "redux/slicers/order.slicer";
import { formatMoney } from "utils/helper";

function History({ useSelector, dispatch }) {
  const { userInfo } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.order.data);

  useEffect(() => {
    if (userInfo?.data?._id) dispatch(getOrderRequest());
  }, []);

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-main text-blue-600 text-center">
        Lịch sử đơn hàng
      </header>
      <div className="flex flex-col  justify-between overflow-y-auto  mx-auto mt-2">
        <table className=" mb-1 text-left w-full border-separate border border-slate-400">
          <thead className="font-bold bg-main text-[13px] text-center border border-blue-300  text-white ">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Mã Hóa Đơn</th>
              <th className="px-4 py-2">Tổng tiền</th>
              <th className="px-4 py-2">Địa chỉ giao</th>
              <th className="px-4 py-2">Số điện thoại </th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2">Ngày đặt</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                className="hover-row font-semibold cursor-pointer"
                key={order?._id}
              >
                <td className="px-4 py-2 border border-slate-500 text-blue-500  ">
                  {index}
                </td>
                <td className="px-4 py-2 border border-slate-500 ">
                  <span>{order.code}</span>
                </td>
                <td className="px-4 py-2 border border-slate-500 ">
                  <span>{formatMoney(order.total)}đ</span>
                </td>
                <td className="px-4 py-2 border border-slate-500  overflow-hidden max-w-7 ">
                  <span>{order.address}</span>
                </td>
                <td className="px-4 py-2 border border-slate-500 ">
                  <span>{order.numberPhone}</span>
                </td>
                <td className="px-4 py-2 border border-slate-500 ">
                  <span>{order.status}</span>
                </td>
                <td className="px-4 py-2 border border-slate-500 ">
                  <span>{moment(order.createdAt).format("DD/MM/YYYY")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withBaseComponent(History);
