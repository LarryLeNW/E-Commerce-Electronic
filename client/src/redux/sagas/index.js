import { fork } from "redux-saga/effects";

import categorySaga from "./category.saga";
import authSaga from "./auth.saga";

export default function* rootSaga() {
  yield fork(categorySaga);
  yield fork(authSaga);
}
