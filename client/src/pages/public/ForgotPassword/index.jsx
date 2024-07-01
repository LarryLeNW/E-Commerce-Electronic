import { forgotPassword, resetPassword } from "apis";
import Button from "components/Button";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import path from "utils/path";
import InputField from "../Login/InputField";
import { validateForm } from "utils/helper";

function ForgotPassword() {
  const navigate = useNavigate();
  const [inValidFields, setInValidFields] = useState({});
  const [payload, setPayload] = useState({
    password: "",
    confirmPassword: "",
    email: "",
  });

  const { type } = useParams();

  useEffect(() => {
    const { email, ...resetData } = payload;
    if (type === "request")
      validateForm({ email: payload.email }, setInValidFields);
    else validateForm(resetData, setInValidFields);
  }, [payload, type]);

  const clearPayload = () => {
    setPayload({
      password: "",
      confirmPassword: "",
      email: "",
    });
  };

  const handleSubmit = useCallback(() => {
    if (type === "request") {
      handleRequestForgot();
      return;
    }
    handleConfirmReset();
  }, [payload]);

  const handleRequestForgot = async () => {
    try {
      const res = await forgotPassword({ email: payload.email });
      Swal.fire("Congratulation!", res.message, "success").then(() =>
        clearPayload()
      );
    } catch (error) {
      Swal.fire("Oops!", error?.response?.data?.message, "error");
    }
  };

  const handleConfirmReset = async () => {
    try {
      const res = await resetPassword({
        password: payload.password,
        token: type,
      });
      Swal.fire("Congratulation!", res.message, "success");
      navigate(path.LOGIN);
    } catch (error) {
      Swal.fire("Oops!", error?.response?.data?.message, "error");
    }
  };

  return (
    <div className="w-screen h-screen bg-outside flex justify-center items-center">
      <div className="w-[500px] bg-white min-h-[200px]  p-10 rounded-lg flex flex-col gap-4 items-center relative mx-2">
        <Link
          className=" absolute top-2 left-2 cursor-pointer text-red-400"
          to={path.HOME}
        >
          Trở lại 🏡
        </Link>
        <h1 className="text-main text-center font-bold  text-2xl mb-5  ">
          Nhập mật khẩu mới
        </h1>
        {type === "request" && (
          <div className="flex flex-col gap-4 w-full">
            <InputField
              value={payload.email}
              nameKey={"email"}
              type={"email"}
              setValue={setPayload}
              inValidFields={inValidFields}
            />
          </div>
        )}
        {type !== "request" && (
          <>
            <InputField
              value={payload.password}
              nameKey={"password"}
              type={"password"}
              setValue={setPayload}
              inValidFields={inValidFields}
            />
            <InputField
              value={payload.confirmPassword}
              inValidFields={inValidFields}
              nameKey={"confirmPassword"}
              type={"password"}
              setValue={setPayload}
            />
          </>
        )}

        <div className="w-full">
          <Button
            name={"Submit"}
            disabled={Object.values(inValidFields).length !== 0}
            handleClick={handleSubmit}
            fw={true}
          />
        </div>
        <Link to={path.LOGIN} className="text-start text-blue-500 w-full">
          Trở lại đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
