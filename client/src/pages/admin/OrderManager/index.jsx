import { notification } from "antd";
import { deleteOrder, getOrdersByAdmin } from "apis";
import Pagination from "components/Pagination";
import withBaseComponent from "hocs";
import moment from "moment";
import { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import { showModal } from "redux/slicers/common.slicer";
import { formatMoney } from "utils/helper";

function OrderManager({ dispatch }) {
  const [orders, setOrders] = useState([]);
  console.log("🚀 ~ OrderManager ~ orders:", orders);

  const [queries, setQueries] = useState({
    page: 1,
    limit: process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
  });

  const [isLoadingActions, setIsLoadingActions] = useState({
    loading: false,
    oid: null,
  });

  const fetchOrders = async () => {
    const response = await getOrdersByAdmin(queries);
    if (response.success) setOrders(response);
  };

  useEffect(() => {
    fetchOrders();
  }, [queries]);

  const handleChangePage = (index) => {
    setQueries({ ...queries, page: index });
  };

  const openFormEdit = (u, index) => {
    dispatch(
      showModal({
        isShowModal: true,
        children: (
          <OrderForm userCurrent={u} callbackUpdateAfter={fetchOrders} />
        ),
      })
    );
  };

  const handleDelete = async (oid) => {
    setIsLoadingActions({ loading: true, oid });
    let response;
    try {
      response = await deleteOrder(oid);
      if (response.success) fetchOrders();
      console.log("🚀 ~ handleDelete ~ response.message:", response.message);
      notification.success({ message: response.message });
    } catch (error) {
      notification.error({ message: error.message });
    }
    setIsLoadingActions({ loading: false, oid: null });
  };

  return (
    <div className="w-full p-4 flex flex-col  overflow-auto ">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        Manager orders
      </div>
      <div className="p-4 ">
        <div className="flex justify-end gap-2 items-center p-4 text-black  ">
          <button
            className=" text-white cursor-pointer border bg-green-600 px-2 w-fit"
            onClick={() => openFormEdit()}
          >
            Create Order
          </button>
        </div>
        <div className="w-full text-right ">
          <Pagination
            currentPage={queries?.page}
            totalCount={orders?.counts}
            handleChangePage={handleChangePage}
          ></Pagination>
        </div>
        <div className="flex flex-col border justify-between overflow-auto">
          <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
            <thead className="font-bold bg-gray-700 text-[13px] text-center border border-blue-300   ">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Type Payment</th>
                <th className="px-4 py-2">Create At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.data?.map((o, index) => (
                <tr key={o._id} className="hover-row">
                  <td className="px-4 py-2 border border-slate-500  ">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{o.code}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{o.orderBy.username}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{formatMoney(o.total)} vnđ </span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{o.status}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{o.typePayment}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{moment(o?.createdAt).format("DD/MM/YYYY")}</span>
                  </td>
                  <td className="px-4 py-2  flex justify-around border border-slate-500 ">
                    <button
                      className="px-2 bg-blue-600  cursor-pointer border  "
                      // onClick={() => openFormEdit(o, index)}
                    >
                      edit
                    </button>
                    <button
                      className="px-2 text-light  cursor-pointer border bg-red-600 "
                      disabled={isLoadingActions.loading}
                      onClick={() => handleDelete(o?._id)}
                    >
                      {isLoadingActions.oid == o?._id ? "Loading..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(OrderManager);
