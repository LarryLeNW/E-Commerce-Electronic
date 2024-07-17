import withBaseComponent from "hocs";
import moment from "moment";
import { useEffect } from "react";
import { getOrderDetailRequest } from "redux/slicers/order.slicer";
import { formatMoney } from "utils/helper";
import ICONS from "utils/icons";

function ShowBill({ params, dispatch, useSelector }) {
  const { oid } = params;
  const { data } = useSelector((state) => state.order.detail);
  console.log("🚀 ~ ShowBill ~ orderDetail:", data);

  useEffect(() => {
    dispatch(getOrderDetailRequest({ oid }));
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className=" border-2 flex flex-col min-h-[80%] p-4 gap-2 bg-gray-800 rounded text-white">
        <h2 className="text-green-700 font-bold flex items-center gap-2 mx-auto">
          <ICONS.IoMdCheckmarkCircleOutline size={90} />
          <span className="text-3xl">{data?.status}</span>
        </h2>
        <div className="font-bold flex gap-2">
          <span>Mã hóa đơn: </span>
          <span className="text-main ">{data?.code}</span>
        </div>
        <div className="font-bold flex gap-2">
          <span>Hình thức thanh toán:</span>
          <span className="text-main ">
            {data?.typePayment === "Direct"
              ? "Thanh toán khi nhận hàng"
              : "Paypal"}
          </span>
        </div>
        <div className="font-bold flex gap-2">
          <span>Địa chỉ giao hàng: </span>
          <span className="text-main ">{data?.numberPhone}</span>
        </div>

        <div className="font-bold flex gap-2">
          <span>Số điện thoại sẽ được gọi khi hàng đến nơi: </span>
          <span className="text-main ">{data?.address}</span>
        </div>
        {data?.note && (
          <div className="font-bold flex gap-2">
            <span>Ghi chú: </span>
            <span className="text-main ">{data?.note}</span>
          </div>
        )}
        <div className="flex flex-col  justify-between overflow-auto w-main mx-auto mt-2">
          <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
            <thead className="font-bold bg-main text-[13px] text-center border border-blue-300  text-white ">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Sản phẩm</th>
                <th className="px-4 py-2">Số lượng</th>
                <th className="px-4 py-2">Màu sắc</th>
                <th className="px-4 py-2">Đơn giá</th>
                <th className="px-4 py-2">Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((p, index) => (
                <tr
                  className="hover-row font-semibold cursor-pointer"
                  key={p?._id}
                >
                  <td className="px-4 py-2 border border-slate-500 text-orange-700  ">
                    {index}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{p.title}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{p.quantity}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{p.color}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{formatMoney(p.price)}vnđ</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{moment(p.createdAt).format("DD/MM/YYYY")}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col justify-center items-end gap-3 ">
            <span className="font-bold  mt-2">
              <span>Tổng tiền : </span>
              <span className="font-bold text-blue-700">
                {formatMoney(
                  data?.products?.reduce(
                    (sum, c) => (sum += c.price * c.quantity),
                    0
                  )
                )}
                vnđ
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(ShowBill);
