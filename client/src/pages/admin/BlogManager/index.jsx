import { notification } from "antd";
import { deleteCategory } from "apis";
import withBaseComponent from "hocs";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCategoriesRequest } from "redux/slicers/category.slicer";
import { showModal } from "redux/slicers/common.slicer";
import FormModal from "./FormModal";
import { deleteBlogCategories, getBlogCategories } from "apis/blogCategory";

function BlogManager({ dispatch, useSelector }) {
  const [data, setData] = useState();
  const [dataRender, setDataRender] = useState([]);

  const [isLoadingActions, setIsLoadingActions] = useState({
    loading: false,
    actionId: null,
  });

  const fetchBlogCategories = async () => {
    dispatch(showModal({ isShowModal: true, isAction: true }));
    const response = await getBlogCategories();
    setData(response?.data || []);
    setDataRender(response?.data || []);
    dispatch(showModal({ isShowModal: false }));
  };

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  const openFormEdit = (c, index) => {
    dispatch(
      showModal({
        isShowModal: true,
        children: (
          <FormModal
            blogCategoryCurrent={c}
            callbackUpdateAfter={fetchBlogCategories}
          />
        ),
      })
    );
  };

  const handleDelete = async (actionId) => {
    setIsLoadingActions({ loading: true, actionId });
    let response;
    try {
      response = await deleteBlogCategories(actionId);
      if (response.success) fetchBlogCategories();
      notification.success({
        message: "deleted successfully",
        duration: 1,
      });
    } catch (error) {
      notification.error({ message: "Delete failed..." });
    }
    setIsLoadingActions({ loading: false, actionId: null });
  };

  const handleFilterData = (keyword) => {
    const newData = data.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setDataRender(newData);
  };

  return (
    <div className="w-full p-4 flex flex-col  overflow-x-auto min-h-full ">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        Blog Management
      </div>
      <div className="p-4 ">
        <div className="flex justify-end gap-2 items-center p-4 text-black  ">
          <input
            type="text"
            placeholder="search by keyword..."
            onChange={(e) => handleFilterData(e.target.value)}
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
                <th className="px-4 py-2">Total Blogs</th>
                <th className="px-4 py-2">UpdateAt</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataRender?.map((c, index) => (
                <tr key={c._id} className="hover-row relative">
                  <td className="px-4 py-2 border border-slate-500  ">
                    {index}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{c.title}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{c.totalBlogs}</span>
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
                      {isLoadingActions.actionId == c?._id
                        ? "Loading..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(BlogManager);
