import { DescriptionProductTabs } from "constant";
import { memo, useState } from "react";
import VoteBar from "./VoteBar";
import { renderStars } from "utils/helper";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "redux/slicers/common.slicer";
import VoteForm from "./VoteForm";
import Swal from "sweetalert2";
import path from "utils/path";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";

const activeTabStyle = "bg-white border border-b-0";

function TabDescription({ ratings, totalRatings, product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);

  const openVote = () => {
    if (userInfo.data) {
      dispatch(
        showModal({
          isShowModal: true,
          children: <VoteForm product={product} />,
        })
      );
      return;
    }

    Swal.fire({
      text: "Đăng nhập để đánh giá",
      cancelButtonText: "Cancel",
      cancelButtonColor: "red",
      confirmButtonText: "Go login",
      title: "Thông báo",
    }).then((rs) => {
      if (rs.isConfirmed) navigate(path.LOGIN);
    });
  };

  return (
    <div>
      <div className="flex items-center gap-1 relative bottom-[-1px]">
        {DescriptionProductTabs.map((el) => (
          <span
            className={`p-2 cursor-pointer px-4   ${
              activeTab === el.id ? activeTabStyle : "bg-gray-300"
            }`}
            key={el.id}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full min-h-[300px] border p-2">
        <div>{DescriptionProductTabs[activeTab]?.content}</div>
        <div className="flex p-4">
          <div className="flex-4 border-2 border-main flex flex-col justify-center items-center">
            <span>{totalRatings} / 5</span>
            <div className="flex items-center gap-1">
              {renderStars(totalRatings).map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </div>
            <div className="text-blue-900">
              Tổng {ratings?.length} đánh giá{" "}
            </div>
          </div>
          <div className="flex-5  flex flex-col p-4">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <VoteBar
                  key={el}
                  number={el + 1}
                  ratingTotal={ratings?.length}
                  ratingCount={
                    ratings?.filter((i) => i.star === el + 1)?.length
                  }
                />
              ))}
          </div>
        </div>
        <div>
          <span>Đánh giá sản phẩm</span>
          <Button
            name={"Đánh giá ngay"}
            fw={true}
            handleClick={openVote}
          ></Button>
        </div>
        <div>
          {product?.ratings?.map((el) => (
            <>
              <Comment />
              <Comment />
              <Comment />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(TabDescription);
