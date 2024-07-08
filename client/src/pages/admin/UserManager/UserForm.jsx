import { notification } from "antd";
import { updateUser } from "apis";
import logo from "assets/logo.png";
import InputForm from "components/InputForm";
import SelectForm from "components/SelectForm";
import { ROLE } from "constant/roleUser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function UserForm({ userCurrent, callbackUpdateAfter }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (userCurrent) {
      setValue("email", userCurrent["email"]);
      setValue("mobile", userCurrent["mobile"]);
      setValue("username", userCurrent["username"]);
      setValue("role", userCurrent["role"]);
      setValue("isBlocked", "" + userCurrent["isBlocked"]);
    }
  }, []);

  const handleUpdate = async (data) => {
    if (userCurrent?._id) {
      try {
        const response = await updateUser(userCurrent?._id, data);
        if (response.success) {
          notification.success({
            message: "User updated successfully",
          });
          callbackUpdateAfter();
        }
      } catch (error) {
        notification.error({
          message: "User update failed" + error.message,
        });
      }
      return;
    }

    console.log("created user data");
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-[50%] flex flex-col justify-center items-center  bg-white rounded  z-40 border-main border p-4 gap-2 text-black"
    >
      <div className="flex flex-col justify-center  w-full items-center">
        <img src={logo} alt="logo" className="w-[300px] object-contain" />
        <h2 className="text-center border border-y-main w-full">
          {userCurrent ? `Form Edit User` : "Form Create User"}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col w-full gap-2"
      >
        <InputForm
          errors={errors}
          id={"email"}
          register={register}
          fullWidth
          validate={{
            required: `Require this field`,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
        />
        <InputForm
          errors={errors}
          id={"username"}
          register={register}
          validate={{ required: `Require this field` }}
          fullWidth
        />
        <InputForm
          errors={errors}
          id={"mobile"}
          register={register}
          validate={{ required: `Require this field` }}
          fullWidth
        />
        <SelectForm
          errors={errors}
          id={"role"}
          register={register}
          validate={{ required: `Require this field` }}
          fullWidth
          options={ROLE}
        />
        <SelectForm
          errors={errors}
          id={"isBlocked"}
          register={register}
          validate={{ required: `Require this field` }}
          fullWidth
          options={{ active: "false", block: "true" }}
        />
        <button className="w-full p-2 bg-main text-white" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
