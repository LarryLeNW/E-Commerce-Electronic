import { getUsers } from "apis";
import InputField from "components/InputField";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import Pagination from "pages/user/ListProduct/Pagination";
import { useCallback, useEffect, useState } from "react";
import ICONS from "utils/icons";

function UserManager() {
  const [users, setUsers] = useState({ data: [] });
  const [queries, setQueries] = useState({
    q: "",
    page: 1,
    limit: process.env.REACT_APP_LIMIT_PRODUCT_PAGE,
  });

  const fetchUsers = async (params) => {
    const response = await getUsers(params);
    if (response?.success) setUsers(response);
  };

  const queriesDebounce = useDebounce(queries.q, 500);

  useEffect(() => {
    fetchUsers(queries);
  }, [queries]);

  const handleFilter = (key, value) => {
    setQueries((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangePage = (index) => {
    setQueries({ ...queries, page: index });
  };

  return (
    <div className="w-full p-4 flex flex-col">
      <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
        Manager users
      </div>
      <div className="p-4 ">
        <div className="flex justify-end p-4 text-black  ">
          <input
            type="text"
            value={queries.q}
            placeholder="search by username or email..."
            onChange={(e) =>
              setQueries((prev) => ({ ...prev, q: e.target.value }))
            }
            className="p-4 w-[50%]  outline-main"
          />
        </div>

        <div className="min-h-[77vh] flex flex-col border justify-between ">
          <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400   ">
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
                    {u.email}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    {u.username}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    {u?.roleInfo[0]?.name}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    {u?.mobile || "Chưa xác thực"}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    {moment(u?.updatedAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    {u?.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="px-4 py-2 border border-slate-500 ">
                    <button className="px-2 text-orange-500 hover:underline cursor-pointer">
                      edit
                    </button>
                    <button className="px-2 text-orange-500 hover:underline cursor-pointer">
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full text-right ">
            <Pagination
              totalCount={users?.counts}
              handleChangePage={handleChangePage}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManager;
