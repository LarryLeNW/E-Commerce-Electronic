import { put, takeEvery } from "redux-saga/effects";
import {
  orderRequest,
  orderSuccess,
  orderFailure,
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFailure,
  getOrderDetailRequest,
  getOrderDetailSuccess,
  getOrderDetailFailure,
} from "../slicers/order.slicer";
import { createOrder, getOrder, getOrders } from "apis";

function* createOrderSaga(action) {
  try {
    const { data, callback } = action.payload;
    console.log("🚀 ~ function*createOrderSaga ~ data:", data);
    let response = yield createOrder(data);
    console.log("🚀 ~ function*createOrderSaga ~ response:", response);
    yield put(orderSuccess());
    yield callback(response);
  } catch (error) {
    yield put(orderFailure({ error: error }));
  }
}

function* getOrdersSaga() {
  try {
    let response = yield getOrders();
    yield put(getOrdersSuccess({ data: response.data }));
  } catch (error) {
    yield put(getOrdersFailure({ error }));
  }
}

function* getOrderDetailSaga(action) {
  try {
    const { oid } = action.payload;
    let response = yield getOrder(oid);
    console.log("🚀 ~ function*getOrderDetailSaga ~ response:", response);
    yield put(getOrderDetailSuccess({ data: response.data }));
  } catch (error) {
    yield put(getOrderDetailFailure({ error }));
  }
}

export default function* orderSaga() {
  yield takeEvery(orderRequest.type, createOrderSaga);
  yield takeEvery(getOrdersRequest.type, getOrdersSaga);
  yield takeEvery(getOrderDetailRequest.type, getOrderDetailSaga);
}
