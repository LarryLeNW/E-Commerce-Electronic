import { getBlogs } from "apis";
import { put, takeEvery } from "redux-saga/effects";

import {
  getBlogListRequest,
  getBlogListSuccess,
  getBlogListFailure,
} from "redux/slicers/blog.slicer";

// function* getProductDetailSaga(action) {
//   try {
//     const { id } = action.payload;
//     const result = yield getProduct(id);
//     yield put(getProductDetailSuccess({ data: result.data }));
//   } catch (e) {
//     yield put(getProductDetailFailure("Đã có lỗi xảy ra!"));
//   }
// }

function* getBlogListSaga(action) {
  try {
    const { more, ...params } = action.payload;
    const result = yield getBlogs(params);
    yield put(
      getBlogListSuccess({
        data: result.data,
        meta: {
          page: params.page,
          limit: params.limit,
          totalBlogs: result.counts,
          totalPage: Math.ceil(result.counts / params.limit),
        },
        more: more,
      })
    );
  } catch (e) {
    yield put(getBlogListFailure("Đã có lỗi xảy ra!"));
  }
}

export default function* productSaga() {
  yield takeEvery(getBlogListRequest.type, getBlogListSaga);
  // yield takeEvery(getProductDetailRequest.type, getProductDetailSaga);
}
