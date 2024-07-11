import { message } from "antd";
import InputForm from "components/InputForm";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("🚀 ~ Profile ~ userInfo:", userInfo?.data);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      username: userInfo.data?.username,
      email: userInfo.data?.email,
      mobile: userInfo.data?.mobile,
      title: userInfo.data?.title,
    });
  }, [userInfo.data]);

  const handleUpdateInfo = (data) => {
    console.log("🚀 ~ handleUpdateInfo ~ data:", data);
  };

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-main text-blue-600 text-center">
        Profile
      </header>
      <div className="w-3/5 mx-auto py-8 ">
        <form
          onSubmit={handleSubmit(handleUpdateInfo)}
          className="flex flex-col gap-5"
        >
          <div className="ml-auto">
            <span className="font-medium">Account status: </span>
            <span>{userInfo.data?.isBlocked ? "Blocked" : "Active"}</span>
          </div>
          <div className="ml-auto">
            <span className="font-medium">Updated at: </span>
            <span>{moment(userInfo?.data?.createdAt).fromNow()}</span>
          </div>
          <InputForm
            errors={errors}
            id={"username"}
            register={register}
            fullWidth
            validate={{
              required: `Require this field`,
            }}
          />
          <InputForm
            errors={errors}
            id={"email"}
            register={register}
            fullWidth
            validate={{
              required: `Require this field`,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm,
                message: "Email invalid...",
              },
            }}
          />
          <InputForm
            errors={errors}
            id={"mobile"}
            register={register}
            fullWidth
            validate={{
              required: `Require this field`,
              pattern: {
                value: /(0[3|5|7|8|9])+([0-9]{8})\b/gm,
                message: "Phone invalid...",
              },
            }}
          />
          <div className="w-full flex justify-end">
            <button type="submit" className="bg-main text-white p-2 w-full">
              Update your info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
