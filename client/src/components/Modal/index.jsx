import { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "redux/slicers/common.slicer";
function Modal({ children, isAction }) {
  const dispatch = useDispatch();

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() =>
        !isAction &&
        dispatch(
          showModal({
            isShowModal: false,
          })
        )
      }
    >
      {children}
    </div>
  );
}

export default memo(Modal);