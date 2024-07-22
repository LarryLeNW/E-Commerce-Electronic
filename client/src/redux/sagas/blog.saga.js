import { getBlog, getBlogs } from "apis";
import { put, takeEvery } from "redux-saga/effects";

import {
  getBlogListRequest,
  getBlogListSuccess,
  getBlogListFailure,
  getBlogDetailRequest,
  getBlogDetailSuccess,
  getBlogDetailFailure,
} from "redux/slicers/blog.slicer";

function* getBlogDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield getBlog(id);
    yield put(getBlogDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getBlogDetailFailure("Đã có lỗi xảy ra!"));
  }
}

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
  yield takeEvery(getBlogDetailRequest.type, getBlogDetailSaga);
}
