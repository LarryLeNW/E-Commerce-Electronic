import { getProducts } from "../apis/product";
import { useEffect, useState } from "react";
import { Product } from "../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const tabs = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New Arrivals" },
];

function BestSeller() {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [reviewProducts, setReviewProducts] = useState([]);
  const [activedTab, setActivedTab] = useState(1);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const fetchProducts = async () => {
    const resBestSellerProduct = await getProducts({
      sort: "-sold",
    });

    if (resBestSellerProduct?.success) {
      setBestSellerProducts(resBestSellerProduct.data);
      setReviewProducts(resBestSellerProduct.data);
    }

    const resNewProduct = await getProducts({
      sort: "-createAt",
    });

    if (resNewProduct?.success) setNewProducts(resNewProduct.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activedTab === 1) setReviewProducts(bestSellerProducts);
    if (activedTab === 2) setReviewProducts(newProducts);
  }, [activedTab]);

  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            className={`font-semibold capitalize border-l cursor-pointer px-2 ${
              activedTab === el.id ? "text-main" : "text-gray-900"
            }`}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 ">
        <Slider {...settings}>
          {reviewProducts.map((p) => (
            <Product isNew={activedTab === 2} key={p._id} data={p} />
          ))}
        </Slider>
      </div>
      <div className="w-full flex gap-4 mt-8">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
      </div>
    </div>
  );
}

export default BestSeller;
