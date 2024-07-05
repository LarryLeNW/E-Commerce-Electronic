import { put, takeEvery } from "redux-saga/effects";

import {
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
  ratingProductRequest,
  ratingProductSuccess,
  ratingProductFailure,
} from "redux/slicers/product.slicer";
import { getProduct, ratings } from "apis/product";

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield getProduct(id);
    yield put(getProductDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProductDetailFailure("Đã có lỗi xảy ra!"));
  }
}

function* ratingProducts(action) {
  const { data, onSuccess, onFailure } = action.payload;
  try {
    const result = yield ratings(data);
    yield put(ratingProductSuccess({ data: result.data }));
    yield onSuccess();
  } catch (e) {
    yield onFailure(e);
    yield put(ratingProductFailure("Đã có lỗi xảy ra!"));
  }
}

export default function* productSaga() {
  yield takeEvery(getProductDetailRequest.type, getProductDetailSaga);
  yield takeEvery(ratingProductRequest.type, ratingProducts);
}
