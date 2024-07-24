import { updateInfoUserCurrent } from "apis";
import Fieldset from "components/Form/Fieldset";
import InputForm from "components/Form/InputForm";
import withBaseComponent from "hocs";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { changeInfoRequest } from "redux/slicers/auth.slicer";

function Profile({ useSelector, dispatch }) {
  const { userInfo } = useSelector((state) => state.auth);

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
      address: userInfo.data?.address,
    });
  }, [userInfo.data]);

  const handleUpdateInfo = async (data) => {
    dispatch(changeInfoRequest(data));
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
            <span>
              {userInfo.data?.isBlocked ? (
                <span className="text-red-600">Blocked</span>
              ) : (
                <span className="text-green-600">Active</span>
              )}
            </span>
          </div>
          <div className="ml-auto ">
            <span className="font-medium">Updated at: </span>
            <span className="text-green-600">
              {moment(userInfo?.data?.createdAt).fromNow()}
            </span>
          </div>
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
            disabled
          />
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
          <InputForm
            errors={errors}
            id={"address"}
            register={register}
            fullWidth
            validate={{
              required: `Require this field`,
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

export default withBaseComponent(Profile);
