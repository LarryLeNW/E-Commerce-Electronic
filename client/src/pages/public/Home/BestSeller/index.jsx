import { getProducts } from "apis/product";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCustom from "components/SliderCustom";

const tabs = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New Arrivals" },
];

function BestSeller() {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [reviewProducts, setReviewProducts] = useState([]);
  const [activedTab, setActivedTab] = useState(1);

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
        {tabs.map((el, index) => (
          <span
            className={`font-semibold capitalize border-l cursor-pointer px-2 ${
              activedTab === el.id ? "text-main" : "text-gray-900"
            }`}
            key={index}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 ">
        <SliderCustom products={reviewProducts} activedTab={activedTab} />
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
