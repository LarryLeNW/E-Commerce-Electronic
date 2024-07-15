import { deleteVariant, getProduct } from "apis/product";
import withBaseComponent from "hocs";
import { useEffect, useState } from "react";
import VariantForm from "./VariantForm";
import { showModal } from "redux/slicers/common.slicer";
import { formatMoney } from "utils/helper";
import DOMPurify from "dompurify";
import moment from "moment";
import { notification } from "antd";

function VariantProductManager({ params, dispatch }) {
  const { pid } = params;
  const [product, setProduct] = useState(null);
  const [hoveredVariantId, setHoveredVariantId] = useState(null);
  console.log("🚀 ~ VariantProductManager ~ product:", product);
  const [isLoadingActions, setIsLoadingActions] = useState({
    loading: false,
    vid: null,
  });

  useEffect(() => {
    // fetch product by pid
    const fetchProduct = async () => {
      const response = await getProduct(pid);
      if (response?.success) setProduct(response.data);
    };

    if (pid) {
      fetchProduct();
    }
  }, [pid]);

  const callbackUpdateAfter = (variants) => {
    setProduct((prev) => ({ ...prev, variants }));
  };

  const openFormEdit = (p, v, index) => {
    dispatch(
      showModal({
        isShowModal: true,
        children: (
          <VariantForm
            productCurrent={p}
            variantCurrent={v}
            callbackUpdateAfter={callbackUpdateAfter}
          />
        ),
      })
    );
  };

  const handleDelete = async (vid) => {
    console.log("🚀 ~ handleDelete ~ vid:", vid);
    setIsLoadingActions({ loading: true, vid });
    let response;
    try {
      response = await deleteVariant(pid, vid);
      if (response.success)
        setProduct((prev) => ({ ...prev, variants: response.data }));
      notification.success({ message: response.message, duration: 1 });
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
      notification.error({ message: "Delete failed...", duration: 1 });
    }
    setIsLoadingActions({ loading: false, vid: null });
  };

  console.log("🚀 ~ VariantProductManager ~ pid:", pid);

  const handleMouseEnter = (productId) => {
    setHoveredVariantId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredVariantId(null);
  };

  return (
    <div className="w-full p-4 flex flex-col  overflow-auto ">
      <div className="h-[75px] flex gap-2 items-center justify-between p-2 border-b border-blue-300">
        <div className=" text-3xl font-bold">Manager Variants </div>
        <div className=" text-3xl font-bold">{product?.title} </div>
        <button
          className="w-[20%] font-bold bg-green-700"
          onClick={() => openFormEdit(product)}
        >
          Create Variants
        </button>
      </div>
      <div className="flex flex-col border justify-between">
        <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
          <thead className="font-bold bg-gray-700 text-[13px] text-center border border-blue-300">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">UpdateAt</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {product?.variants?.map((v, index) => (
              <tr
                key={v._id}
                className="hover-row relative"
                onMouseEnter={() => handleMouseEnter(v._id)}
                onMouseLeave={handleMouseLeave}
              >
                <td className="px-4 py-1 border border-slate-500">{index}</td>
                <td className="px-4 py-1 border border-slate-500 text-sm">
                  <span>{v?.title}</span>
                </td>
                <td className="px-4 py-1 border border-slate-500">
                  <span>{formatMoney(v?.price)}</span>
                </td>
                <td className="px-4 py-1 border border-slate-500">
                  <span>{v?.quantity}</span>
                </td>
                <td className="px-4 py-1 border border-slate-500">
                  <span>{v?.color}</span>
                </td>
                <td className="px-4 py-1 border border-slate-500 text-sm ">
                  <span
                    className="line-clamp-4"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(v?.description),
                    }}
                  ></span>
                </td>
                <td className="px-4 py-1 border border-slate-500 text-sm">
                  <span>{moment(v?.updatedAt).format("DD/MM/YYYY")}</span>
                </td>
                <td className="px-4 py-8 h-full flex flex-col gap-4 items-center justify-between border border-slate-500">
                  <button
                    className="px-2 bg-blue-600 cursor-pointer border"
                    // onClick={() =>
                    //   navigate({
                    //     pathname: path.ADMIN.UPDATE_PRODUCT,
                    //     search: `?edit=true&pid=${p?._id}`,
                    //   })
                    // }
                  >
                    edit
                  </button>
                  <button
                    className="px-2 text-light cursor-pointer border bg-red-600"
                    disabled={isLoadingActions.loading}
                    onClick={() => handleDelete(v?._id, index)}
                  >
                    {isLoadingActions.vid === v._id ? "Loading..." : "Delete"}
                  </button>
                </td>
                {hoveredVariantId === v._id && (
                  <div className="absolute w-[200px] h-[200px] rounded top-[-180px] transition ease-in  left-0 bg-gray-200 z-20 border-2 border-main shadow-md p-4">
                    <img
                      src={v?.thumb}
                      alt="thumb image"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withBaseComponent(VariantProductManager);
