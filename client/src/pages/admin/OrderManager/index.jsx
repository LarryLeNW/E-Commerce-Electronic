import { getOrdersByAdmin } from "apis";
import withBaseComponent from "hocs";
import { useEffect, useState } from "react";

function OrderManager({ dispatch }) {
  const [orders, setOrders] = useState([]);
  console.log("🚀 ~ OrderManager ~ orders:", orders);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrdersByAdmin();
      if (response.success == true) setOrders(response.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full p-4 flex flex-col  overflow-auto ">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        Manager orders
      </div>
    </div>
  );
}

export default withBaseComponent(OrderManager);
