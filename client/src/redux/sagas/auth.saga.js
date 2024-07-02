import { put, takeEvery } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
} from "../slicers/auth.slicer";
import { getUserInfo, login } from "apis";

function* loginSaga(action) {
  try {
    const { dataLogin, callback } = action.payload;
    let response = yield login(dataLogin);
    yield put(loginSuccess(response.data));
    yield callback();
  } catch (error) {
    yield put(loginFailure({ error }));
  }
}

function* getUserInfoSaga(action) {
  try {
    const { callback } = action.payload;
    let response = yield getUserInfo();
    yield put(getUserInfoSuccess(response.data));
    yield callback(response.data.role);
  } catch (error) {
    console.log("🚀 ~ function*loginSaga ~ error:", error);
    yield put(getUserInfoFailure({ error }));
  }
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(getUserInfoRequest.type, getUserInfoSaga);
}
