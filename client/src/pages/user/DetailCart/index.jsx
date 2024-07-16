import BreadCrumb from "components/BreadCrumb";
import Button from "components/Form/Button";
import withBaseComponent from "hocs";
import { formatMoney } from "utils/helper";
import ItemCart from "./ItemCart";
import path from "utils/path";

function DetailCart({ location, useSelector, navigate }) {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="w-full my-2">
      <div className="bg-gray-200 mx-auto h-[81px] flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold uppercase">My cart</h3>
          <BreadCrumb category={location.pathname} />
        </div>
      </div>
      <div className="flex flex-col  justify-between overflow-auto w-main mx-auto mt-2">
        <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
          <thead className="font-bold bg-main text-[13px] text-center border border-blue-300  text-white ">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.data?.cart?.map((c, index) => (
              <ItemCart data={c} index={index} key={index} />
            ))}
          </tbody>
        </table>
        <div className="flex flex-col justify-center items-end gap-3">
          <span className="font-bold">
            <span>Subtotal: </span>
            <span className="font-bold text-green-700">
              {formatMoney(
                userInfo.data?.cart?.reduce(
                  (sum, c) => (sum += c.price * c.quantity),
                  0
                )
              )}
              vnđ
            </span>
          </span>

          <Button
            name={"Checkout"}
            style={
              "px-6 p-2 rounded-md text-white bg-blue-500 font-semibold cursor-pointer text-center w-[30%]"
            }
            handleClick={() => {
              navigate(path.MEMBER.CHECKOUT);
            }}
          />
          <span className="font-semibold italic text-yellow-600">
            Shipping, taxes and discounts calculated at checkout.
          </span>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(DetailCart);
