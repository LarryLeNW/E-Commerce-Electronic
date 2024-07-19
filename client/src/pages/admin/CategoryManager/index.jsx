import { notification } from "antd";
import { deleteUser, getUsers } from "apis";
import withBaseComponent from "hocs";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import Pagination from "pages/user/ListProduct/Pagination";
import { useEffect, useState } from "react";
import { showModal } from "redux/slicers/common.slicer";
import { convertCodeRoleToName } from "utils/helper";
import UserForm from "./UserForm";

function CategoryManager({ dispatch }) {
  const [users, setUsers] = useState({ data: [] });
  const [queries, setQueries] = useState({
    q: "",
    page: 1,
    limit: process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
  });

  const [isLoadingActions, setIsLoadingActions] = useState({
    loading: false,
    uid: null,
  });

  const fetchUsers = async () => {
    const response = await getUsers(queries);
    if (response?.success) setUsers(response);
  };

  const queriesDebounce = useDebounce(queries.q, 500);

  useEffect(() => {
    fetchUsers();
  }, [queries]);

  const handleFilter = (key, value) => {
    setQueries((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangePage = (index) => {
    setQueries({ ...queries, page: index });
  };

  const openFormEdit = (u, index) => {
    dispatch(
      showModal({
        isShowModal: true,
        children: <UserForm userCurrent={u} callbackUpdateAfter={fetchUsers} />,
      })
    );
  };

  const handleDelete = async (uid) => {
    setIsLoadingActions({ loading: true, uid });
    let response;
    try {
      response = await deleteUser(uid);
      if (response.success) fetchUsers();
      notification.success({ message: response.message });
    } catch (error) {
      notification.error({ message: "Delete failed..." });
    }
    console.log("🚀 ~ handleDelete ~ response.success:", response);
    setIsLoadingActions({ loading: false, uid: null });
  };

  return (
    <div className="w-full p-4 flex flex-col  overflow-auto ">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        Manager categories
      </div>
      <div className="p-4 ">
        <div className="flex justify-end gap-2 items-center p-4 text-black  ">
          <input
            type="text"
            value={queries.q}
            placeholder="search by username or email..."
            onChange={(e) =>
              setQueries((prev) => ({ ...prev, q: e.target.value }))
            }
            className="p-4 w-[50%]  outline-main"
          />
          <button
            className=" text-white cursor-pointer border bg-green-600"
            onClick={() => openFormEdit()}
          >
            Create User
          </button>
        </div>

        <div className="flex flex-col border justify-between overflow-auto">
          <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
            <thead className="font-bold bg-gray-700 text-[13px] text-center border border-blue-300   ">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email address</th>
                <th className="px-4 py-2">FullName</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">UpdateAt</th>
                <th className="px-4 py-2">status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((u, index) => (
                <tr key={u._id} className="hover-row">
                  <td className="px-4 py-2 border border-slate-500  ">
                    {index}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{u.email}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{u.username}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{convertCodeRoleToName(u?.role)}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{u?.mobile || "Chưa xác thực"}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{moment(u?.updatedAt).format("DD/MM/YYYY")}</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <span>{u?.isBlocked ? "Blocked" : "Active"}</span>
                  </td>
                  <td className="px-4 py-2  flex justify-around border border-slate-500 ">
                    <button
                      className="px-2 bg-blue-600  cursor-pointer border  "
                      onClick={() => openFormEdit(u, index)}
                    >
                      edit
                    </button>
                    <button
                      className="px-2 text-light  cursor-pointer border bg-red-600 "
                      disabled={isLoadingActions.loading}
                      onClick={() => handleDelete(u?._id)}
                    >
                      {isLoadingActions.uid == u?._id ? "Loading..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full text-right ">
            <Pagination
              currentPage={queries?.page}
              totalCount={users?.counts}
              handleChangePage={handleChangePage}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(CategoryManager);
