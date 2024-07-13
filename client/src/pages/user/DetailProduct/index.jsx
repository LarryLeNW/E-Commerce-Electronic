import { getProducts } from "apis/product";
import BreadCrumb from "components/BreadCrumb";
import Button from "components/Form/Button";
import SliderCustom from "components/SliderCustom";
import { ProductExtraInformation } from "constant";
import * as DOMPurify from "dompurify";
import withBaseComponent from "hocs";
import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { getProductDetailRequest } from "redux/slicers/product.slicer";
import { formatMoney, renderStars } from "utils/helper";
import SelectQuantity from "../../../components/Form/SelectQuantity";
import TabDescription from "./TabDescription";
import { updateCartRequest } from "redux/slicers/auth.slicer";

function DetailProduct({
  dispatch,
  useSelector,
  params,
  checkLoginBeforeAction,
}) {
  const { productDetail } = useSelector((state) => state.product);
  const { id, title, category } = params;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const fetchRelatedProducts = async () => {
    const response = await getProducts({ category });
    if (response.success) setRelatedProducts(response.data);
  };

  useEffect(() => {
    if (id) dispatch(getProductDetailRequest({ id }));
    if (category) fetchRelatedProducts(category);
    window.scrollTo(0, 0);
  }, [category, id]);

  const handleQuantity = useCallback(
    (input) => {
      if (!Number(input) || Number(input) < 1) return;
      setQuantity(+input);
    },
    [quantity]
  );

  const handleClickQuantity = (flag) => {
    if (flag == "minus") {
      if (quantity <= 1) return;
      setQuantity((prev) => prev - 1);
    }
    if (flag == "plus") {
      if (quantity > productDetail?.data.quantity) return;
      setQuantity((prev) => prev + 1);
    }
  };

  let handleAddCart = () => {
    checkLoginBeforeAction(() =>
      dispatch(
        updateCartRequest({
          data: {
            pid: productDetail?.data?._id,
            title: productDetail?.data?.title,
            quantity: quantity,
            price: productDetail?.data?.price,
          },
        })
      )
    );
  };

  return (
    <div className="w-full">
      <div className="bg-gray-200 mx-auto h-[81px] flex justify-center items-center">
        <div className="w-main">
          <h3>Sản phẩm {title}</h3>
          <BreadCrumb title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto bg-white flex">
        {/* image product review */}
        <div className="w-2/5 border border-red-300">
          <div className=" h-[458px] flex justify-center items-center w-full">
            {productDetail?.data?.thumb && (
              <img
                src={productDetail?.data?.thumb}
                alt="sub-img"
                className=" w-full h-full object-contain "
              />
            )}
          </div>
          <div className="w-full ">
            <Slider
              {...{
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                pauseOnHover: true,
              }}
              className="image-slider"
            >
              {productDetail?.data?.images?.map((el) => (
                <div className="p-2  w-1/3 " key={el}>
                  <img
                    src={el}
                    alt="sub-img"
                    className=" h-[143px] w-full border object-contain "
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* info product */}
        <div className="w-2/5 border border-blue-400 p-4">
          <div className="flex justify-between">
            <h2 className="text-[30px] font-semibold ">
              {formatMoney(productDetail?.data?.price)} VNĐ
            </h2>
            <span className="text-yellow-600">
              Còn {productDetail?.data?.quantity} cái
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex">
              {renderStars(productDetail?.data?.totalRatings).map(
                (el, index) => (
                  <span key={index}>{el}</span>
                )
              )}
            </div>
            <span className="text-red-400">
              (Đã bán {productDetail?.data?.sold} cái)
            </span>
          </div>
          <ul className="p-2 text-gray-500 ">
            {productDetail?.data?.description?.map((el) => (
              <li className="leading-6 list-square" key={el}>
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(el) }}
                ></div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity : </span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleClickQuantity={handleClickQuantity}
              />
            </div>
            <Button
              name={"Add to cart"}
              fw={true}
              handleClick={handleAddCart}
            />
          </div>
        </div>

        {/* extra info */}
        <div className="w-1/5 border border-yellow-300 p-4 flex flex-col gap-3">
          {ProductExtraInformation.map((el) => (
            <div key={el.id} className="flex items-center gap-2 border p-2">
              <span className="p-4 text-white bg-gray-800 rounded-full flex justify-center items-center">
                {el.icon}
              </span>
              <div className="flex flex-col ">
                <span className="font-medium">{el.title}</span>
                <span className="text-sm">{el.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* more description */}
      <div className="w-main m-auto mt-8">
        <TabDescription
          ratings={productDetail?.data?.ratings}
          totalRatings={productDetail?.data?.totalRatings}
          product={productDetail?.data}
        />
      </div>
      <div className="w-main m-auto mt-8">
        <h3 className="text-[20px] mb-2 font-semibold py-[15px] border-b-2 border-main">
          Sản phẩm liên quan
        </h3>
        <SliderCustom
          products={relatedProducts}
          settings={{
            ...{
              dots: true,
              infinite: true,
              slidesToShow: 4,
              slidesToScroll: 2,
              autoplay: true,
              autoplaySpeed: 2000,
              pauseOnHover: true,
            },
          }}
          normal={true}
        />
      </div>

      <div className="h-[400px]"></div>
    </div>
  );
}

export default withBaseComponent(DetailProduct);
