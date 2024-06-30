import { put, takeEvery } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../slicers/auth.slicer";
import { login } from "apis";

function* loginSaga(action) {
  try {
    const { dataLogin, callback } = action.payload;
    let response = yield login(dataLogin);
    console.log("🚀 ~ function*loginSaga ~ response:", response);
    yield put(loginSuccess(response.data));
    yield callback();
  } catch (error) {
    console.log("🚀 ~ function*loginSaga ~ error:", error);
    yield put(loginFailure({ error }));
  }
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
}
