import { useCallback, useEffect, useState } from "react";
import Button from "components/Form/Button";
import { Link, generatePath, useNavigate } from "react-router-dom";
import path from "utils/path";
import { register } from "apis";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "redux/slicers/auth.slicer";
import { validateForm } from "utils/helper";
import InputField from "components/Form/InputField";

function Login() {
  const dispatch = useDispatch();

  const { loading: isLoadingLogin, error } = useSelector(
    (state) => state.auth.loginData
  );

  const [isRegister, setIsRegister] = useState(false);
  const [inValidFields, setInValidFields] = useState({});
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  useEffect(() => {
    if (!!error) {
      Swal.fire("Oops!", error, "error");
    }
  }, [error]);

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    username: "",
  });

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      username: "",
    });
  };

  useEffect(() => {
    const { username, ...dataLogin } = payload;
    isRegister
      ? validateForm(payload, setInValidFields)
      : validateForm(dataLogin, setInValidFields);
  }, [payload, isRegister]);

  const handleSubmit = useCallback(async () => {
    const { username, ...dataLogin } = payload;
    if (isRegister) {
      setIsLoadingRegister(true);
      try {
        const response = await register(payload);
        const { message } = response;
        Swal.fire("Congratulation!", message, "success")
          .then(setIsRegister(false))
          .then(resetPayload());
      } catch (error) {
        Swal.fire("Oops!", error, "error");
      }
      setIsLoadingRegister(false);
      return;
    }
    dispatch(
      loginRequest({
        dataLogin,
      })
    );
  }, [payload, isRegister]);

  return (
    <div className="w-screen h-screen bg-outside flex justify-center items-center">
      <div className="w-[500px] bg-white min-h-[400px]  p-10 rounded-lg flex flex-col gap-4 items-center relative mx-2">
        <Link
          className=" absolute top-2 left-2 cursor-pointer text-red-400"
          to={path.HOME}
        >
          Trở lại 🏡
        </Link>
        <h1 className="text-main text-center font-bold  text-2xl mb-5  ">
          {isRegister ? "Đăng kí" : "Đăng nhập"}
        </h1>
        {isRegister && (
          <>
            <InputField
              value={payload.username}
              nameKey={"username"}
              setValue={setPayload}
              inValidFields={inValidFields}
            />
          </>
        )}
        <InputField
          value={payload.email}
          nameKey={"email"}
          setValue={setPayload}
          inValidFields={inValidFields}
        />
        <InputField
          inValidFields={inValidFields}
          value={payload.password}
          nameKey={"password"}
          setValue={setPayload}
        />
        <Button
          disabled={Object.values(inValidFields).length !== 0}
          name={isRegister ? "Đăng kí" : "Đăng nhập"}
          handleClick={handleSubmit}
          fw={true}
          isLoading={isLoadingRegister || isLoadingLogin}
        />
        <div className="flex justify-between w-full items-center mt-2 text-sm">
          <Link
            to={generatePath(path.FORGOT_PASSWORD, {
              type: "request",
            })}
            className="hover:text-main cursor-help"
          >
            Quên mật khẩu ?
          </Link>
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
