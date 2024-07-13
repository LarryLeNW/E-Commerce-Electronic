import { put, takeEvery } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  changeAvatarRequest,
  changeAvatarSuccess,
  changeAvatarFailure,
  changeInfoRequest,
  changeInfoSuccess,
  changeInfoFailure,
  updateCartRequest,
  updateCartSuccess,
  updateCartFailure,
  removeCartRequest,
  removeCartSuccess,
  removeCartFailure,
} from "../slicers/auth.slicer";
import { changeAvatar, getUserInfo, login, updateInfoUserCurrent } from "apis";
import Swal from "sweetalert2";
import { removeCart, updateCart } from "apis/cart";

function* loginSaga(action) {
  try {
    const { dataLogin } = action.payload;
    let response = yield login(dataLogin);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure({ error }));
  }
}

function* getUserInfoSaga() {
  try {
    let response = yield getUserInfo();
    yield put(getUserInfoSuccess(response));
  } catch (error) {
    yield put(getUserInfoFailure({ error }));
  }
}

function* changeAvatarSaga(action) {
  try {
    const data = action.payload;
    let response = yield changeAvatar(data);
    yield put(changeAvatarSuccess(response));
  } catch (error) {
    yield put(changeAvatarFailure({ error }));
  }
}

function* changeInfoSaga(action) {
  try {
    const data = action.payload;
    let response = yield updateInfoUserCurrent(data);
    yield put(changeInfoSuccess(response));
    Swal.fire(
      "Action Change Your Info",
      "Cập nhật thông tin thành công",
      "success"
    );
  } catch (error) {
    yield put(changeInfoFailure({ error: error?.response?.data?.message }));
    Swal.fire(
      "Action Change Your Info",
      error?.response?.data?.message,
      "error"
    );
  }
}

function* updateCartSaga(action) {
  try {
    const { data } = action.payload;
    let response = yield updateCart(data);
    console.log("🚀 ~ function*updateCartSaga ~ response:", response);
    yield put(updateCartSuccess(response));
    Swal.fire(
      "Techshop",
      `Thêm ${data.title} vào giỏ hàng thành công `,
      "success"
    );
  } catch (error) {
    yield put(updateCartFailure({ error }));
    Swal.fire("Techshop", "Vui lòng thử lại sau...", "warning");
  }
}

function* removeCartSaga(action) {
  try {
    const { pid } = action.payload;
    let response = yield removeCart(pid);
    console.log("🚀 ~ function*updateCartSaga ~ response:", response);
    yield put(removeCartSuccess(response));
  } catch (error) {
    yield put(removeCartFailure({ error }));
    Swal.fire("Techshop", error?.response?.data?.message, "warning");
  }
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(getUserInfoRequest.type, getUserInfoSaga);
  yield takeEvery(changeAvatarRequest.type, changeAvatarSaga);
  yield takeEvery(changeInfoRequest.type, changeInfoSaga);
  yield takeEvery(updateCartRequest.type, updateCartSaga);
  yield takeEvery(removeCartRequest.type, removeCartSaga);
}
