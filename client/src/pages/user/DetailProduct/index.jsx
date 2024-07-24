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
import { Breadcrumb, notification, Space } from "antd";
import ICONS from "utils/icons";
import { Link } from "react-router-dom";
import path from "utils/path";
import QueryString from "qs";
import { setFilterParams, showModal } from "redux/slicers/common.slicer";
import ModalCheckout from "./ModalCheckout";

function DetailProduct({
  dispatch,
  useSelector,
  params,
  checkLoginBeforeAction,
}) {
  const { productDetail } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.auth);
  const [variantSelected, setVariantSelected] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { id, title, category } = params;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { filterParams } = useSelector((state) => state.common);

  const fetchRelatedProducts = async () => {
    const response = await getProducts({ category });
    if (response.success) setRelatedProducts(response.data);
  };

  useEffect(() => {
    if (id) dispatch(getProductDetailRequest({ id }));
    if (category) fetchRelatedProducts(category);
    window.scrollTo(0, 0);
  }, [category, id]);

  useEffect(() => {
    if (!variantSelected) {
      const { variants, ...currentProduct } = productDetail?.data;
      setCurrentProduct(currentProduct);
      return;
    }
    setCurrentProduct(
      productDetail?.data?.variants?.find((el) => el?._id === variantSelected)
    );
  }, [variantSelected, productDetail]);

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
            pid: currentProduct?._id,
            title: currentProduct?.title,
            quantity: quantity,
            price: currentProduct?.price,
            color: currentProduct?.color,
            thumb: currentProduct?.thumb,
          },
          callback: () => {
            notification.success({
              message: `Cập nhật ${currentProduct?.title} vào giỏ hàng thành công ...`,
              duration: 1,
            });
          },
        })
      )
    );
  };

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={path.HOME}>
                    <Space>
                      <ICONS.AiFillHome />
                      <span>Trang chủ</span>
                    </Space>
                  </Link>
                ),
              },
              {
                title: <Link to={path.PRODUCTS}>Danh sách sản phẩm</Link>,
              },
              {
                title: (
                  <Link
                    to={{
                      pathname: path.PRODUCTS,
                      search: QueryString.stringify({
                        ...filterParams,
                        category: productDetail?.data.category,
                      }),
                    }}
                  >
                    {productDetail.data.category}
                  </Link>
                ),
                onClick: () =>
                  dispatch(
                    setFilterParams({
                      ...filterParams,
                      category: productDetail?.data.category,
                    })
                  ),
              },
              {
                title: productDetail.data.title,
              },
            ]}
            style={{ marginBottom: 8 }}
          />
        </div>
      </div>
      <div className="w-main m-auto bg-white flex">
        {/* image product review */}
        <div className="w-2/5 ">
          <div className=" h-[458px] flex justify-center items-center w-full">
            {currentProduct?.thumb && (
              <img
                src={currentProduct?.thumb}
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
              {currentProduct?.images?.map((el) => (
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
        <div className="w-2/5  p-4">
          <div className="flex justify-between">
            <h2 className="text-[30px] font-semibold ">
              {formatMoney(currentProduct?.price)} VNĐ
            </h2>
            <span className="text-yellow-600">
              Còn {currentProduct?.quantity} cái
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
          <div className="my-4 flex flex-col items-start gap-4">
            <span className="font-bold ">Color : </span>
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div
                className={`flex items-center gap-2 p-2 border-2 cursor-pointer ${
                  !variantSelected && "border-3  border-main"
                }`}
                onClick={() => setVariantSelected(null)}
              >
                <img
                  src={productDetail?.data?.thumb}
                  alt="thumb"
                  className="w-8 h-8 rounded-md object-cover"
                />
                <span className="flex flex-col">
                  <span>{productDetail?.data?.color}</span>
                  <span>{formatMoney(productDetail?.data?.price)}đ</span>
                </span>
              </div>
              {productDetail?.data?.variants?.map((variant) => (
                <div
                  className={`
                    flex items-center gap-2 p-2 border-2 cursor-pointer
                    ${
                      variantSelected &&
                      variantSelected == variant?._id &&
                      "border-3 border-main"
                    }`}
                  key={variant?._id}
                  onClick={() => setVariantSelected(variant?._id)}
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
              <Button
                name={"Mua ngay"}
                fw
                handleClick={() => {
                  dispatch(
                    showModal({
                      children: <ModalCheckout dataProduct={currentProduct} />,
                      isShowModal: true,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>

        {/* extra info */}
        <div className="w-1/5 p-4 flex flex-col gap-3">
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Quantity : </span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleClickQuantity={handleClickQuantity}
              />
            </div>
            <Button
              name={"Add"}
              fw={true}
              handleClick={handleAddCart}
              isLoading={cart?.loading}
              iconAfter={<ICONS.FaCartPlus />}
            />
          </div>
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
