import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import path from "utils/path";

function ConfirmRegister() {
  const { status } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (status == "success")
      Swal.fire(
        "Congratulation!",
        "Đăng kí tài khoản thành công ...",
        "success"
      );
    else Swal.fire("Token hết hạn !!!", "Thử đăng kí lại", "error");

    navigate(path.LOGIN);
  }, [status]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-main">
      loading...
    </div>
  );
}

export default ConfirmRegister;
