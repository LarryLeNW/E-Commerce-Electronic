import { useCallback, useState } from "react";
import InputField from "./InputField";
import Button from "components/Button";
import { Link, useNavigate } from "react-router-dom";
import path from "utils/path";
import { login, register } from "apis";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginRequest } from "redux/slicers/auth.slicer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    });
  };

  const handleSubmit = useCallback(async () => {
    const { lastname, firstname, ...dataLogin } = payload;
    if (isRegister) {
      const response = await register(payload);
      const { success, message } = response;
      if (!!success)
        Swal.fire("Congratulation!", message, "success")
          .then(setIsRegister(false))
          .then(resetPayload());
      else Swal.fire("Oops!", message, "error");
      return;
    }
    dispatch(
      loginRequest({
        dataLogin,
        callback: () => {
          Swal.fire("Congratulation!", "Login successfully...", "success");
          navigate(path.HOME);
        },
      })
    );
  }, [payload, isRegister]);

  return (
    <div className="w-screen h-screen bg-login flex justify-center items-center">
      <div className="w-[500px] bg-white min-h-[400px]  p-10 rounded-lg flex flex-col gap-4 items-center relative mx-2">
        <Link
          className=" absolute top-2 left-2 cursor-pointer text-main"
          to={path.HOME}
        >
          Trở lại trang chủ
        </Link>
        <h1 className="text-main text-center font-bold  text-2xl mb-5  ">
          {isRegister ? "Đăng kí" : "Đăng nhập"}
        </h1>
        {isRegister && (
          <>
            <InputField
              value={payload.firstname}
              nameKey={"firstname"}
              setValue={setPayload}
            />
            <InputField
              value={payload.lastname}
              nameKey={"lastname"}
              setValue={setPayload}
            />
          </>
        )}
        <InputField
          value={payload.email}
          nameKey={"email"}
          type={"email"}
          setValue={setPayload}
        />
        <InputField
          value={payload.password}
          nameKey={"password"}
          type={"password"}
          setValue={setPayload}
        />
        <Button
          name={isRegister ? "Đăng kí" : "Đăng nhập"}
          handleClick={handleSubmit}
          fw={true}
        />
        <div className="flex justify-between w-full items-center mt-2 text-sm">
          <span className="hover:text-main cursor-help">Quên mật khẩu ?</span>
          <span
            className="hover:text-main cursor-pointer select-none text-sm"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Đăng nhập ngay." : "Đăng kí tài khoản mới."}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
