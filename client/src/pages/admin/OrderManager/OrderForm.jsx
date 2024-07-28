import { Input, notification } from "antd";
import { createUser, getUsers, updateUser } from "apis";
import logo from "assets/logo.png";
import InputForm from "components/Form/InputForm";
import SelectForm from "components/Form/SelectForm";
import { ROLE } from "constant/roleUser";
import withBaseComponent from "hocs";
import useDebounce from "hooks/useDebounce";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showModal } from "redux/slicers/common.slicer";
import defaultAvatar from "assets/default-avatar.png";

function OrderForm({ userCurrent, callbackUpdateAfter, dispatch }) {
  const [keyword, setKeyword] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  console.log("🚀 ~ OrderForm ~ foundUser:", foundUser);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm();

  useEffect(() => {
    // if (userCurrent) {
    //   setValue("email", userCurrent["email"]);
    //   setValue("mobile", userCurrent["mobile"]);
    //   setValue("username", userCurrent["username"]);
    //   setValue("role", userCurrent["role"]);
    //   setValue("isBlocked", "" + userCurrent["isBlocked"]);
    // }
  }, []);

  const searchUserDebounce = useDebounce(keyword, 300);

  useEffect(() => {
    const handleFindUser = async () => {
      const queries = {
        q: searchUserDebounce,
        limit: 1,
        fields: "username,avatar,email,mobile",
      };

      const response = await getUsers(queries);
      if (response.success) setFoundUser(response?.data[0]);
    };

    if (searchUserDebounce) handleFindUser();
  }, [searchUserDebounce]);

  const handleUpdate = async (data) => {
    try {
      let response;
      if (userCurrent?._id) {
        response = await updateUser(userCurrent._id, data);
        notification.success({
          message: "User updated successfully",
        });
      } else {
        try {
          response = await createUser(data);
          notification.success({
            message: "User created successfully",
          });
        } catch (error) {
          notification.error({
            message: "User created successfully",
          });
        }
      }
      callbackUpdateAfter();
      dispatch(showModal({ isShow: false }));
    } catch (error) {
      console.error("Error in handleUpdate:", error);
      const errorMessage = userCurrent?._id
        ? "User update failed"
        : "Create failed";
      notification.error({
        message: `${errorMessage}: ${error.message}`,
      });
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-[80%] flex flex-col justify-center items-center  bg-white rounded  z-40 border-main border p-4 gap-2 text-black "
    >
      <div className="flex flex-col   w-full">
        <img src={logo} alt="logo" className="w-[100px] object-contain" />
        <h2 className="text-center mx-auto border border-y-main w-full text-3xl font-bold text-blue-600">
          {userCurrent ? `Form Edit Order` : "Form Create Order"}
        </h2>
      </div>

      <form
        // onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col w-full gap-2"
      >
        <div className="flex min-h-[50vh]">
          <div className="flex-1 flex flex-col gap-2">
            <Input
              placeholder="Search user by keyword ...."
              className="text-3xl font-bold"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="h-full border rounded p-2 bg-gray-300 flex flex-col  items-center ">
              <div className=" h-2/3 w-1/2 border-2 ">
                <img
                  src={defaultAvatar}
                  alt="not found this avatar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-xl text-gray-600">
                Username :
                <span className="font-bold">{foundUser?.username}</span>
              </div>
              <div className="text-xl text-gray-600">
                Email : <span className="font-bold">{foundUser?.email}</span>
              </div>
              {foundUser?.mobile && (
                <div className="text-xl text-gray-600">
                  Sdt : {foundUser?.mobile}
                </div>
              )}
            </div>
          </div>
          <div className="flex-2 "></div>
        </div>

        <button className="w-full p-2 bg-main text-white" type="submit">
          {userCurrent ? `Update` : "Create"}
        </button>
      </form>
    </div>
  );
}

export default withBaseComponent(OrderForm);
