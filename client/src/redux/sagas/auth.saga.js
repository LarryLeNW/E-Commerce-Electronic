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
} from "../slicers/auth.slicer";
import { changeAvatar, getUserInfo, login, updateInfoUserCurrent } from "apis";
import Swal from "sweetalert2";

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
    console.log("🚀 ~ function*getUserInfoSaga ~ response:", response);
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
    console.log("🚀 ~ function*changeAvatarSaga ~ error:", error);
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

export default function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(getUserInfoRequest.type, getUserInfoSaga);
  yield takeEvery(changeAvatarRequest.type, changeAvatarSaga);
  yield takeEvery(changeInfoRequest.type, changeInfoSaga);
}
