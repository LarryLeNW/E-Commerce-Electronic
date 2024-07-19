import { put, takeEvery } from "redux-saga/effects";
import {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFailure,
} from "../slicers/category.slicer";
import { getCategories } from "apis";

function* getCategoryListSaga(action) {
  try {
    let { params } = action.payload;
    let response = yield getCategories(params);
    yield put(getCategoriesSuccess(response.data));
  } catch (error) {
    yield put(getCategoriesFailure({ error }));
  }
}

export default function* categorySaga() {
  yield takeEvery(getCategoriesRequest.type, getCategoryListSaga);
}
