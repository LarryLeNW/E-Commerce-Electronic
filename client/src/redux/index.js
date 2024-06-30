import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import categoryReducer from "./slicers/category.slicer";
import authReducer from "./slicers/auth.slicer";
import rootSaga from "./sagas/index";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
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
