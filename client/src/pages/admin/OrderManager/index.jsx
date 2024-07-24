import withBaseComponent from "hocs";

function OrderManager({ dispatch }) {
  const fetchOrders = async () => {};

  return (
    <div className="w-full p-4 flex flex-col  overflow-auto ">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        Manager orders
      </div>
    </div>
  );
}

export default withBaseComponent(OrderManager);
