import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: {
    isShow: false,
    children: null,
  },
};

export const commonSlicer = createSlice({
  name: "common",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modal.isShow = action.payload.isShowModal;
      state.modal.children = action.payload.children;
    },
  },
});

export const { showModal } = commonSlicer.actions;

export default commonSlicer.reducer;
