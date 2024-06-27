import { fork } from "redux-saga/effects";

import categorySaga from "./category.saga";

export default function* rootSaga() {
  yield fork(categorySaga);
}
