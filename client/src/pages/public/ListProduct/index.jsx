import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import qs from "qs";
import { useEffect, useState } from "react";
import { getProducts } from "apis/product";
import BreadCrumb from "components/BreadCrumb";
import Button from "components/Button";
import Product from "./Product";
import path from "utils/path";
import FilterPanel from "./FilterPanel";

function ListProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [filterParams, setFilterParams] = useState({});
  const { category } = useParams();
  const { search } = useLocation();
  console.log("🚀 ~ ListProduct ~ search:", search);

  const convertToPriceQueryMongo = ({ from, to }) => {
    if (from && to) {
      return {
        $and: [{ price: { gte: from } }, { price: { lte: to } }],
      };
    }
    if (from) return { price: { gte: from } };
    if (to) return { price: { lte: to } };
  };

  useEffect(() => {
    let searchParams = qs.parse(search, { ignoreQueryPrefix: true });
    let priceQuery = convertToPriceQueryMongo(searchParams);
    delete searchParams.from;
    delete searchParams.to;

    const newFilterParams = {
      ...searchParams,
      sort: searchParams.sort,
      page: parseInt(searchParams.page) || 0,
      category,
    };

    setFilterParams(newFilterParams);
    fetchProducts({ ...newFilterParams, ...priceQuery });
  }, [search]);

  const handleSort = (key) => {
    navigate({
      pathname: generatePath(path.PRODUCTS, { category }),
      search: qs.stringify({
        ...filterParams,
        sort: key,
      }),
    });
  };

  const fetchProducts = async (params) => {
    const response = await getProducts(params);
    if (response?.success) setProducts(response.data);
  };

  return (
    <div>
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3>{category}</h3>
          <BreadCrumb category={category} />
        </div>
      </div>
      <div className="w-main border p-4 flex justify-between mt-8 m-auto">
        <div className="w-1/5 flex-auto">
          <FilterPanel filterParams={filterParams} />
        </div>
        <div className="w-4/5 flex-auto">
          <div className="flex bg-gray-300 justify-between items-center p-2">
            <div className="flex gap-2 justify-center items-center">
              <span>Sắp xếp theo : </span>{" "}
              <button
                className="bg-main text-white p-2"
                onClick={() => handleSort("-totalRatings")}
              >
                Phổ biến
              </button>
              <button
                className="bg-main text-white p-2"
                onClick={() => handleSort("-createAt")}
              >
                Mới nhất
              </button>
              <button
                className="bg-main text-white p-2"
                onClick={() => handleSort("-sold")}
              >
                Bán chạy
              </button>
              <select
                name="Giá"
                id=""
                defaultValue={"default"}
                onChange={(e) => handleSort(e.target.value)}
                className="p-2"
              >
                <option value="default" disabled>
                  Sắp xếp theo giá
                </option>
                <option value="price">Giá : thấp đến cao</option>
                <option value="-price">Giá : cao đến thấp</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-main">1/9</span>
              <div>
                <button className="p-2 w-[40px] rounded-none bg-gray-400 border-r">
                  {"<"}
                </button>
                <button className="p-2 w-[40px] bg-gray-400 rounded-none">
                  {">"}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 m-auto flex flex-wrap  gap-1">
            {products?.map((el) => (
              <div className="w-[45%] sm:w-[24%] border" key={el._id}>
                <Product data={el} normal={true} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[400px]"></div>
    </div>
  );
}

export default ListProduct;
