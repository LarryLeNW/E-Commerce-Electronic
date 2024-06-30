import { put, takeEvery } from "redux-saga/effects";
import {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure,
} from "../slicers/category.slicer";
import { getCategories } from "apis";

function* getCategoryListSaga() {
  try {
    let response = yield getCategories();
    yield put(getCategoriesSuccess(response.data));
  } catch (error) {
    yield put(getCategoriesFailure({ error: error }));
  }
}

export default function* categorySaga() {
  yield takeEvery(getCategoriesRequest.type, getCategoryListSaga);
}
