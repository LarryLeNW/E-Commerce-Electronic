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

export default function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(getUserInfoRequest.type, getUserInfoSaga);
}
