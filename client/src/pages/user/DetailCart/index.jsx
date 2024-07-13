import BreadCrumb from "components/BreadCrumb";
import Button from "components/Form/Button";
import withBaseComponent from "hocs";
import { formatMoney } from "utils/helper";

function DetailCart({ location, useSelector }) {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("🚀 ~ DetailCart ~ userInfo:", userInfo.data?.cart);

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
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.data?.cart?.map((c, index) => (
              <tr key={c._id} className="hover-row font-semibold">
                <td className="px-4 py-2 border border-slate-500 text-green-500  ">
                  {index}
                </td>
                <td className="px-4 py-2 border border-slate-500 flex items-center gap-2 justify-center">
                  <span>
                    <img
                      src={c.product.thumb}
                      className="w-[70px] h-[70px] object-cover"
                      alt="img product"
                    />
                  </span>
                  <span>{c.product.title}</span>
                </td>
                <td className="px-4 py-2 border border-slate-500 ">
                  <span>{c.quantity}</span>
                </td>
                <td className="px-4 py-2 border border-slate-500 ">
                  <div className="flex gap-2 justify-between">
                    <span>{formatMoney(c.product.price * c.quantity)} vnđ</span>
                    {c.quantity > 1 && (
                      <span className="text-sm text-green-700 italic">{`  ${formatMoney(
                        c.product.price
                      )} vnđ x1`}</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col justify-center items-end gap-3">
          <span className="font-bold">
            <span>Subtotal: </span>
            <span className="font-bold text-green-700">
              {formatMoney(
                userInfo.data?.cart?.reduce(
                  (sum, c) => (sum += c.product.price * c.quantity),
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
