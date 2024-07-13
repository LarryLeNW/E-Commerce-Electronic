// import { useNavigate } from "react-router-dom";
// import path from "./path";
// const { useSelector } = require("react-redux");

// const { isLogged } = useSelector((state) => state.auth);
// const navigate = useNavigate();

// export const checkLoginBeforeAction = (callback) => {
//   if (!isLogged) {
//     return Swal.fire({
//       title: "Bạn cần đăng nhập để thực hiện chức năng này!",
//       icon: "warning",
//       confirmButtonText: "Đăng nhập",
//       showCancelButton: true,
//       cancelButtonText: "Hủy",
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate(path.LOGIN);
//       }
//     });
//   }
//   callback();
// };

// console.log("🚀 ~ isLogged:", isLogged);
