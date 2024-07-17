import { put, takeEvery } from "redux-saga/effects";
import {
  orderRequest,
  orderSuccess,
  orderFailure,
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
} from "../slicers/order.slicer";
import { createOrder, getOrder } from "apis";

function* createOrderSaga(action) {
  try {
    const { data, callback } = action.payload;
    console.log("🚀 ~ function*createOrderSaga ~ data:", data);
    let response = yield createOrder(data);
    yield put(orderSuccess(response.data));
    yield callback();
  } catch (error) {
    yield put(orderFailure({ error: error }));
  }
}

function* getOrdersSaga() {
  try {
    let response = yield getOrder();
    yield put(getOrderSuccess({ data: response.data }));
  } catch (error) {
    yield put(getOrderFailure({ error }));
  }
}
export default function* orderSaga() {
  yield takeEvery(orderRequest.type, createOrderSaga);
  yield takeEvery(getOrderRequest.type, getOrdersSaga);
}
