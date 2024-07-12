import { useEffect, useState } from "react";
import { getProducts } from "apis/product";
import ProductCard from "./ProductCard";

function FeatureProducts() {
  const [featureProducts, setFeatureProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await getProducts({
      limit: 9,
      sort: "-totalRatings",
    });
    if (response?.success) setFeatureProducts(response.data);
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
        {featureProducts.map((el, index) => (
          <ProductCard key={index} data={el} />
        ))}
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-2">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt="1"
          className="w-full h-full object-cover col-span-2 row-span-2"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
          alt="2"
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt="4"
          className="w-full h-full object-cover col-span-1 row-span-2"
        />
        <img
          src="	https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
          alt="3"
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
      </div>
    </div>
  );
}

export default FeatureProducts;
