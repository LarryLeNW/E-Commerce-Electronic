import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import categoryReducer from "./slicers/category.slicer";
import authReducer from "./slicers/auth.slicer";
import commonReducer from "./slicers/common.slicer";
import productReducer from "./slicers/product.slicer";
import reviewSlicer from "./slicers/review.slicer";
import orderSlicer from "./slicers/order.slicer";
import blogSlicer from "./slicers/blog.slicer";
import rootSaga from "./sagas/index";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    common: commonReducer,
    product: productReducer,
    review: reviewSlicer,
    order: orderSlicer,
    blog: blogSlicer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
