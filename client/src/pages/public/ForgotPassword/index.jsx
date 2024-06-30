import { forgotPassword, resetpassword } from "apis";
import Button from "components/Button";
import { useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import path from "utils/path";
import InputField from "../Login/InputField";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [payload, setPayload] = useState({
    password: "",
    confirmPassword: "",
  });

  const { type } = useParams();

  const handleSubmit = useCallback(() => {
    if (type === "request") {
      handleRequestForgot();
      return;
    }
    handleConfirmReset();
  }, [email, payload]);

  const handleRequestForgot = async () => {
    if (!email.trim())
      Swal.fire("Missing input", "Vui lòng nhập email...", "warning");
    else {
      try {
        const res = await forgotPassword({ email });
        Swal.fire("Congratulation!", res.message, "success").then(() =>
          setEmail("")
        );
      } catch (error) {
        Swal.fire("Oops!", error?.response?.data?.message, "error");
      }
    }
  };

  const handleConfirmReset = async () => {
    try {
      const res = await resetpassword({
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
          Forgot Password
        </h1>
        {type === "request" && (
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="email">Enter your email :</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full p-4 border-2 border-main  outline-none placeholder:text-sm "
              placeholder="Enter your email..."
              required
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
            />
            <InputField
              value={payload.confirmPassword}
              nameKey={"confirmPassword"}
              type={"password"}
              setValue={setPayload}
            />
          </>
        )}

        <div className="w-full">
          <Button name={"Submit"} handleClick={handleSubmit} fw={true} />
        </div>
        <Link to={path.LOGIN} className="text-start text-blue-500 w-full">
          Trở lại đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
