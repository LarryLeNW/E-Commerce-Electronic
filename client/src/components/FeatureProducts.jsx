import { useEffect, useState } from "react";
import { getProducts } from "../apis/product";
import { ProductCard } from "./";

function FeatureProducts() {
  const [featureProducts, setFeatureProducts] = useState([]);
  console.log("🚀 ~ FeatureProducts ~ featureProducts:", featureProducts);

  const fetchProducts = async () => {
    const response = await getProducts({
      limit: 9,
      totalRatings: 5,
    });
    if (response.success) setFeatureProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURE PRODUCTS
      </h3>
      <div className="flex flex-wrap mx-[-10px] mt-2">
        {featureProducts.map((el) => (
          <ProductCard key={el._id} data={el} />
        ))}
      </div>
      <div className="flex justify-between gap-2">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt="1"
          className="w-[50%] object-contain "
        />
        <div className="flex flex-col justify-between w-[24%]   gap-2 ">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt="2"
          />
          <img
            src="	https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt="3"
          />
        </div>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt="4"
          className="w-[24%]  object-contain"
        />
      </div>
    </div>
  );
}

export default FeatureProducts;
