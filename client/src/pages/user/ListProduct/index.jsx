import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import BreadCrumb from "components/BreadCrumb";
import Product from "./Product";
import path from "utils/path";
import FilterPanel from "./FilterPanel";
import Pagination from "./Pagination";
import {
  clearFilterParams,
  setFilterParams,
} from "redux/slicers/common.slicer";
import { useDispatch, useSelector } from "react-redux";
import QueryString from "qs";
import { getProductListRequest } from "redux/slicers/product.slicer";
import Button from "components/Button";

function ListProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterParams } = useSelector((state) => state.common);
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: +process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
      })
    );

    return () => dispatch(clearFilterParams());
  }, []);

  const handleFilter = (key, value) => {
    const newFilterParams = {
      ...filterParams,
      [key]: value,
      page: 1,
      limit: +process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
    };

    dispatch(setFilterParams(newFilterParams));

    dispatch(getProductListRequest(newFilterParams));

    navigate({
      pathname: path.PRODUCTS,
      search: QueryString.stringify(newFilterParams),
    });
  };

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: +process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
        more: true,
      })
    );
  };

  const handleChangePage = (type) => {
    let targetPage;
    if (Number(type)) targetPage = type;
    if (type === "next")
      targetPage =
        productList.meta?.page === productList.meta?.totalPage
          ? 1
          : productList.meta?.page + 1;

    if (type === "prev")
      targetPage =
        productList.meta?.page === 1
          ? productList.meta?.totalPage
          : productList.meta?.page - 1;

    dispatch(
      getProductListRequest({
        ...filterParams,
        page: targetPage,
        limit: +process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
      })
    );
  };

  return (
    <div>
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          {/* <h3>{category}</h3> */}
          {/* <BreadCrumb category={category} /> */}
        </div>
      </div>
      <div className="w-main border p-4 flex justify-between mt-8 m-auto">
        <div className="w-1/5 flex-auto">
          <FilterPanel handleFilter={handleFilter} />
        </div>
        <div className="w-4/5 flex-auto">
          <div className="flex bg-gray-300 justify-between items-center p-2">
            <div className="flex gap-2 justify-center items-center">
              <span>Sắp xếp theo : </span>{" "}
              <button
                className="bg-main text-white p-2"
                onClick={() => handleFilter("sort", "-totalRatings")}
              >
                Phổ biến
              </button>
              <button
                className="bg-main text-white p-2"
                onClick={() => handleFilter("sort", "-createAt")}
              >
                Mới nhất
              </button>
              <button
                className="bg-main text-white p-2"
                onClick={() => handleFilter("sort", "-sold")}
              >
                Bán chạy
              </button>
              <select
                name="Giá"
                id=""
                defaultValue={"default"}
                onChange={(e) => handleFilter("sort", e.target.value)}
                className="p-2"
              >
                <option value="default" disabled>
                  Sắp xếp theo giá
                </option>
                <option value="-price">Giá : thấp đến cao</option>
                <option value="price">Giá : cao đến thấp</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-main">
                {`${productList.meta?.page} / ${productList.meta?.totalPage} `}
              </span>
              <div>
                <button
                  onClick={() => handleChangePage("prev")}
                  className="p-2 w-[40px] rounded-none bg-gray-400 border-r"
                >
                  {"<"}
                </button>
                <button
                  onClick={() => handleChangePage("next")}
                  className="p-2 w-[40px] bg-gray-400 rounded-none"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 m-auto flex flex-wrap  gap-1 max-h-full overflow-auto">
            {productList?.data?.map((el) => (
              <div className="w-[45%] sm:w-[24%] border" key={el._id}>
                <Product data={el} normal={true} />
              </div>
            ))}
          </div>
          <Button
            style={"text-center mt-2 p-2 cursor-pointer"}
            disabled={productList.meta?.page === productList.meta?.totalPage}
            handleClick={handleShowMore}
            name={"Hiển thị thêm"}
          />
          <Pagination
            totalCount={productList.meta.totalProduct}
            currentPage={productList.meta.page}
            handleChangePage={handleChangePage}
          />
        </div>
      </div>

      <div className="h-[400px]"></div>
    </div>
  );
}

export default ListProduct;
