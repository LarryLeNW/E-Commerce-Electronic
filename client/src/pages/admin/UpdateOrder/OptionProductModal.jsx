import logo from "assets/logo.png";
import Button from "components/Form/Button";
import { useEffect, useState } from "react";
import { formatMoney } from "utils/helper";

function OptionProductModal({ product, handleChooseProduct }) {
  const [previewProduct, setPreviewProduct] = useState(null);
  console.log("🚀 ~ OptionProductModal ~ previewProduct:", previewProduct);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    handleChangePreviewProduct(product);
  }, []);

  const handleChangePreviewProduct = (data) => {
    const previewP = {
      thumb: data.thumb,
      pid: data._id,
      price: data.price,
      title: data.title,
      color: data.color,
    };
    setPreviewProduct(previewP);
  };

  console.log("🚀 ~ OptionProductModal ~ product:", product);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-[50%] flex flex-col justify-center items-center  bg-white rounded  z-40 border-main border p-4 gap-2 text-black "
    >
      <div className="flex flex-col justify-center  w-full items-center">
        <img src={logo} alt="logo" className="w-[100px] object-contain" />
        <h2 className="text-center border border-y-main w-full">
          Choose Variants
        </h2>
        <div className="flex gap-2 border w-full mt-2">
          <div className="flex-1 flex flex-col  p-2 border-r  ">
            <div className="w-full">
              <img
                src={previewProduct?.thumb}
                alt=""
                className="h-[200px] w-full object-cover"
              />
            </div>
            <div className="text-green-500">{previewProduct?.title}</div>
            <div className="font-bold">
              {formatMoney(previewProduct?.price)} vnđ
            </div>
          </div>
          <div className="flex-2 h-full ">
            <div className="flex flex-col gap-2">
              <h1 className="p-2 border-b border-main font-bold">Variants</h1>
              <div>
                <div
                  className={`flex items-center gap-2 p-2  border-2 cursor-pointer ${
                    previewProduct?.pid == product._id && "border-3 border-main"
                  }`}
                  onClick={() => setPreviewProduct(product)}
                >
                  <img
                    src={product.thumb}
                    alt="thumb"
                    className="w-8 h-8 rounded-md object-cover"
                  />
                  <span className="flex flex-col">
                    <span>{product.color}</span>
                    <span>{formatMoney(product.price)}vnđ</span>
                  </span>
                </div>
                {product?.variants?.map((variant) => (
                  <div
                    className={`
                    flex items-center gap-2 p-2 border-2 cursor-pointer
                    ${
                      previewProduct?.pid == variant?._id &&
                      "border-3 border-main"
                    }`}
                    key={variant?._id}
                    onClick={() => handleChangePreviewProduct(variant)}
                  >
                    <img
                      src={variant?.thumb}
                      alt="thumb"
                      className="w-8 h-8 rounded-md object-cover"
                    />
                    <span className="flex flex-col">
                      <span>{variant?.color}</span>
                      <span>{formatMoney(variant?.price)}đ</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto">
              <Button name={"Add"} fw />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionProductModal;
