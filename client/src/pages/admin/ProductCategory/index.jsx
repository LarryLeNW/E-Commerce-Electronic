import { notification } from "antd";
import { deleteCategory } from "apis";
import withBaseComponent from "hocs";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCategoriesRequest } from "redux/slicers/category.slicer";
import { showModal } from "redux/slicers/common.slicer";
import CategoryForm from "./CategoryForm";

function ProductCategory({ dispatch, useSelector }) {
  const { data, loading } = useSelector((state) => state.category);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [params, setParams] = useState({
    keyword: "",
  });
  const [keyword, setKeyword] = useState("");

  const [isLoadingActions, setIsLoadingActions] = useState({
    loading: false,
    cid: null,
  });

  const keywordParamDebounce = useDebounce(keyword, 500);

  const handleMouseEnter = (productId) => {
    setHoveredCategoryId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredCategoryId(null);
  };

  const fetchCategory = () => {
    dispatch(showModal({ isShowModal: true, isAction: true }));
    dispatch(
      getCategoriesRequest({
        params,
      })
    );
    dispatch(showModal({ isShowModal: false }));
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [params]);

  useEffect(() => {
    handleFilter("keyword", keywordParamDebounce);
  }, [keywordParamDebounce]);

  const handleFilter = (key, value) => {
    const newFilterParams = {
      ...params,
      [key]: value,
    };
    setParams(newFilterParams);
  };

  const openFormEdit = (c, index) => {
    dispatch(
      showModal({
        isShowModal: true,
        children: (
          <CategoryForm
            categoryCurrent={c}
            callbackUpdateAfter={fetchCategory}
          />
        ),
      })
    );
  };

  const handleDelete = async (cid) => {
    setIsLoadingActions({ loading: true, cid });
    let response;
    try {
      response = await deleteCategory(cid);
      if (response.success) fetchCategory();
      notification.success({
        message: "delete category successfully",
        duration: 1,
      });
    } catch (error) {
      notification.error({ message: "Delete failed..." });
    }
    setIsLoadingActions({ loading: false, cid: null });
  };

  return (
    <div className="w-full p-4 flex flex-col  overflow-x-auto min-h-full ">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        Manager categories
      </div>
      <div className="p-4 ">
        <div className="flex justify-end gap-2 items-center p-4 text-black  ">
          <input
            type="text"
            value={keyword}
            placeholder="search by keyword..."
            onChange={(e) => setKeyword(e.target.value)}
            className="p-4 w-[70%]  outline-main rounded"
          />
          <button
            className=" text-white cursor-pointer border bg-green-600"
            onClick={() => openFormEdit()}
          >
            Create New
          </button>
        </div>

        <div className="flex flex-col border justify-between ">
          <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
            <thead className="font-bold bg-gray-700 text-[13px] text-center border border-blue-300   ">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Total Product</th>
                <th className="px-4 py-2">UpdateAt</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((c, index) => (
                <tr
                  key={c._id}
                  onMouseEnter={() => handleMouseEnter(c._id)}
                  onMouseLeave={handleMouseLeave}
                  className="hover-row relative"
                >
                  <td className="px-4 py-2 border border-slate-500  ">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{c.title}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <ul className=" ">
                      {c?.brands?.map((el) => (
                        <li key={el} className="list-square ml-2">
                          {el}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    {c?.totalProduct || 0}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{moment(c?.updatedAt).format("DD/MM/YYYY")}</span>
                  </td>
                  <td className="px-4 py-2  flex justify-around flex-wrap gap-5">
                    <button
                      className="px-2 bg-blue-600 w-full  cursor-pointer border  "
                      onClick={() => openFormEdit(c, index)}
                    >
                      edit
                    </button>
                    <button
                      className="px-2 text-light w-full cursor-pointer border bg-red-600 "
                      disabled={isLoadingActions.loading}
                      onClick={() => handleDelete(c?._id)}
                    >
                      {isLoadingActions.cid == c?._id ? "Loading..." : "Delete"}
                    </button>
                  </td>
                  {hoveredCategoryId == c?._id && (
                    <div className="absolute w-[200px] h-[200px] rounded top-[-100px] transition ease-in  left-0 bg-gray-200 z-50 border-2 border-main shadow-md p-4">
                      <img
                        src={c?.thumb}
                        alt="thumb image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(ProductCategory);
