import { notification } from "antd";
import { getCategories } from "apis";
import { deleteProduct, getProducts } from "apis/product";
import DOMPurify from "dompurify";
import moment from "moment";
import Pagination from "pages/user/ListProduct/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "utils/helper";
import path from "utils/path";

function ProductManager() {
  const navigate = useNavigate();
  const [products, setProducts] = useState({ data: [] });
  const [categories, setCategories] = useState({ data: [] });

  const [params, setParams] = useState({
    keyword: "",
    page: 1,
    limit: process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
  });

  const [isLoadingActions, setIsLoadingActions] = useState({
    loading: false,
    pid: null,
  });
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const fetchProducts = async () => {
    const response = await getProducts(params);
    if (response?.success) setProducts(response);
  };

  const fetchCategories = async () => {
    const response = await getCategories();
    if (response?.success) setCategories(response);
  };

  const refetchProducts = async () => {
    const response = await getProducts();
    if (response) setProducts(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [params]);

  const handleFilter = (key, value) => {
    const newFilterParams = {
      ...params,
      [key]: value,
      page: 1,
      limit: +process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
    };
    setParams(newFilterParams);
  };

  const handleChangePage = (index) => {
    setParams({ ...params, page: index });
  };

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleDelete = async (pid) => {
    setIsLoadingActions({ loading: true, pid });
    let response;
    try {
      response = await deleteProduct(pid);
      if (response.success) refetchProducts();
      notification.success({ message: "Delete product successfully" });
    } catch (error) {
      notification.error({ message: "Delete failed..." });
    }
    setIsLoadingActions({ loading: false, pid: null });
  };

  return (
    <div className="w-full p-4 flex flex-col  overflow-auto ">
      <div className="h-[75px] flex gap-2 items-center justify-between p-2 border-b border-blue-300">
        <div className=" text-3xl font-bold">Manager Product</div>
        <div className="flex gap-4">
          <div className="border border-main p-2 rounded h-full flex flex-col gap-2 ">
            <span className="text-white">Search By Category :</span>
            <select
              name="sort"
              id=""
              // onChange={(e) => handleFilter("sort", e.target.value)}
              className="w-full text-black"
              onChange={(e) => {
                if (e.target.value === "all") {
                  const { category, prevParams } = params;
                  setParams(prevParams);
                  return;
                }
                handleFilter("category", e.target.value);
              }}
            >
              <option className=" p-2" value="all">
                all categories
              </option>
              {categories?.data?.map((el) => (
                <option className=" p-2" key={el?.title} value={el?.title}>
                  {el?.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-around gap-2 items-center h-[15vh]  text-black p-2">
          <div className="border border-main p-2 rounded h-full flex flex-col gap-2 ">
            <span className="text-white">SORT BY :</span>
            <select
              name="sort"
              id=""
              onChange={(e) => handleFilter("sort", e.target.value)}
              className="w-full text-black"
            >
              <option className=" p-2" value="" disabled>
                Option
              </option>
              <option className=" p-2" value="price">
                Low To High Price
              </option>
              <option className=" p-2" value="-price">
                High To Low Price
              </option>
              <option className=" p-2" value="-totalRatings">
                Appreciate
              </option>
              <option className=" p-2" value="-sold">
                Most Purchases
              </option>
              <option className=" p-2" value="-quantity">
                High To Low Quantity
              </option>
              <option className=" p-2" value="quantity">
                Low To Hight Quantity
              </option>
            </select>
          </div>
          <div className="border border-main p-4 rounded h-full">
            <span className="text-white">Filter Price :</span>
            <div className="flex gap-1">
              <input
                type="number"
                placeholder="Price From"
                onChange={(e) => handleFilter("priceFrom", e.target.value)}
                className="p-2  outline-main"
              />
              <input
                type="number"
                placeholder="Price To"
                onChange={(e) => handleFilter("priceTo", e.target.value)}
                className="p-2  outline-main"
              />
            </div>
          </div>
          <div className="border border-main p-4 rounded h-full flex justify-around items-center gap-2">
            <input
              type="text"
              value={params?.keyword}
              placeholder="search products by key ..."
              onChange={(e) => handleFilter("keyword", e.target.value)}
              className="p-2 flex-2 outline-main"
            />
            <button
              className="text-white flex-1 cursor-pointer border text-sm  bg-green-600 "
              onClick={() => navigate(path.ADMIN.UPDATE_PRODUCT)}
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
      <div className="w-full text-right">
        <Pagination
          currentPage={params?.page}
          totalCount={products?.counts}
          handleChangePage={handleChangePage}
        ></Pagination>
      </div>
      <div className="flex flex-col border justify-between">
        <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
          <thead className="font-bold bg-gray-700 text-[13px] text-center border border-blue-300">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Sold</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Star Average</th>
              <th className="px-4 py-2">UpdateAt</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.data?.map((p, index) => (
              <tr
                key={p._id}
                className="hover-row relative"
                onMouseEnter={() => handleMouseEnter(p._id)}
                onMouseLeave={handleMouseLeave}
              >
                <td className="px-4 py-1 border border-slate-500">{index}</td>
                <td className="px-4 py-1 border border-slate-500">
                  <span>{p?.title}</span>
                </td>
                <td className="px-4 py-1 border border-slate-500">
                  <span>{formatMoney(p?.price)}</span>
                </td>
                <td className="px-4 py-1 border border-slate-500">
                  <span>{p?.quantity}</span>
                </td>
                <td className="px-4 py-1 border border-slate-500">
                  <span>{p?.sold}</span>
                </td>
                <td className="px-4 py-1 border border-slate-500 text-sm">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(p?.description.toString()),
                    }}
                  ></span>
                </td>
                <td className="px-4 py-1 border border-slate-500 text-sm">
                  <span>{p?.totalRatings != 0 || "No Review"}</span>
                </td>
                <td className="px-4 py-1 border border-slate-500 text-sm">
                  <span>{moment(p?.updatedAt).format("DD/MM/YYYY")}</span>
                </td>
                <td className="px-4 py-8 h-full flex flex-col gap-4 items-center justify-between border border-slate-500">
                  <button
                    className="px-2 bg-blue-600 cursor-pointer border"
                    onClick={() =>
                      navigate({
                        pathname: path.ADMIN.UPDATE_PRODUCT,
                        search: `?edit=true&pid=${p?._id}`,
                      })
                    }
                  >
                    edit
                  </button>
                  <button
                    className="px-2 text-light cursor-pointer border bg-red-600"
                    disabled={isLoadingActions.loading}
                    onClick={() => handleDelete(p?._id)}
                  >
                    {isLoadingActions.pid === p._id ? "Loading..." : "Delete"}
                  </button>
                </td>
                {hoveredProductId === p._id && (
                  <div className="absolute w-[200px] h-[200px] rounded top-[-180px] transition ease-in  left-0 bg-gray-200 z-20 border-2 border-main shadow-md p-4">
                    <img
                      src={p?.thumb}
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

export default ProductManager;
