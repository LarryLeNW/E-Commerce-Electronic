import Slider from "react-slick";
import { getProduct, getProducts } from "apis/product";
import BreadCrumb from "components/BreadCrumb";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { formatMoney, renderStars } from "utils/helper";
import Button from "components/Button";
import SelectQuantity from "./SelectQuantity";
import { ProductExtraInformation } from "constant";
import TabDescription from "./TabDescription";
import SliderCustom from "components/SliderCustom";

var settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};

function DetailProduct() {
  const { id, title, category } = useParams();
  const [data, setData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const fetchProductDetail = async () => {
    const response = await getProduct(id);
    if (response.success) setData(response.data);
  };

  const fetchRelatedProducts = async () => {
    const response = await getProducts({ category });
    if (response.success) setRelatedProducts(response.data);
  };

  useEffect(() => {
    if (id) fetchProductDetail();
    if (category) fetchRelatedProducts(category);
  }, []);

  // let numbers = str.match(/\d+/g);

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
      if (quantity > data.quantity) return;
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full ">
      <div className="bg-gray-200 mx-auto h-[81px] flex justify-center items-center">
        <div className="w-main">
          <h3>Sản phẩm {title}</h3>
          <BreadCrumb title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto bg-white flex">
        {/* image product review */}
        <div className="w-2/5 border border-red-300">
          <div className="w-[458px] h-[458px] border">
            {/* {data?.thumb && (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "",
                    isFluidWidth: true,
                    src: data?.thumb,
                  },
                  largeImage: {
                    width: 1800,
                    height: 1500,
                    src: data?.thumb,
                  },
                }}
              />
            )} */}
          </div>
          <div className="w-full ">
            <Slider {...settings} className="image-slider">
              {data?.images?.map((el) => (
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
              {formatMoney(data?.price)} VNĐ
            </h2>
            <span className="text-yellow-600">Còn {data?.quantity} cái</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex">
              {renderStars(data?.totalRatings).map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </div>
            <span className="text-red-400">(Đã bán {data?.sold} cái)</span>
          </div>
          <ul className=" p-2 text-gray-500">
            {data?.description.map((el) => (
              <li className="leading-6 list-square" key={el}>
                {el}
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
            <Button name={"Add to cart"} fw={true} />
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
        <TabDescription />
      </div>
      <div className="w-main m-auto mt-8">
        <h3 className="text-[20px] mb-2 font-semibold py-[15px] border-b-2 border-main">
          Sản phẩm có liên quan
        </h3>
        <SliderCustom products={relatedProducts} normal={true} />
      </div>

      <div className="h-[400px]"></div>
    </div>
  );
}

export default DetailProduct;
