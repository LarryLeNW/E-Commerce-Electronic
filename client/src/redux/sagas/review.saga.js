import { put, takeEvery } from "redux-saga/effects";

import {
  getRatingsRequest,
  getRatingsSuccess,
  getRatingsFailure,
  ratingProductRequest,
  ratingProductSuccess,
  ratingProductFailure,
} from "redux/slicers/review.slicer";

import { getReview, ratings } from "apis/product";

function* getRatingsProductSaga(action) {
  try {
    const response = yield getReview(action.payload);
    yield put(getRatingsSuccess({ response }));
  } catch (e) {
    yield put(getRatingsFailure("Đã có lỗi xảy ra!"));
  }
}

function* ratingProductSaga(action) {
  const { data, onSuccess, onFailure } = action.payload;
  try {
    const response = yield ratings(data);
    yield put(ratingProductSuccess({ response }));
    yield onSuccess();
  } catch (e) {
    yield onFailure(e);
    yield put(ratingProductFailure("Đã có lỗi xảy ra!"));
  }
}

export default function* reviewSaga() {
  yield takeEvery(getRatingsRequest.type, getRatingsProductSaga);
  yield takeEvery(ratingProductRequest.type, ratingProductSaga);
}
