import Button from "components/Form/Button";
import withBaseComponent from "hocs";
import QueryString from "qs";
import { useEffect, useMemo } from "react";
import {
  clearFilterParams,
  setFilterParams,
} from "redux/slicers/common.slicer";
import { getProductListRequest } from "redux/slicers/product.slicer";
import path from "utils/path";
import FilterPanel from "./FilterPanel";
import Pagination from "../../../components/Pagination";
import Product from "./Product";
import { Breadcrumb, Space } from "antd";
import ICONS from "utils/icons";
import { Link } from "react-router-dom";
import NotFound from "components/NotFound";

function ListProduct({ navigate, dispatch, useSelector }) {
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
    window.scrollTo(0, 0);
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

  const renderProductList = useMemo(() => {
    if (productList?.data.length === 0)
      return <NotFound message={"Không tìm thấy sản phẩm"} />;

    return (
      <>
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
      </>
    );
  }, [productList?.data]);

  return (
    <div>
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
                title: "Danh sách sản phẩm",
              },
            ]}
          />
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
          {renderProductList}
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(ListProduct);
