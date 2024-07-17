import { fork } from "redux-saga/effects";

import categorySaga from "./category.saga";
import authSaga from "./auth.saga";
import productSaga from "./product.saga";
import reviewSaga from "./review.saga";
import orderSaga from "./order.saga";

export default function* rootSaga() {
  yield fork(categorySaga);
  yield fork(authSaga);
  yield fork(productSaga);
  yield fork(reviewSaga);
  yield fork(orderSaga);
}
