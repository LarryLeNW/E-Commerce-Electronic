import { useState } from "react";
import logo from "assets/logo.png";
import ICONS from "utils/icons";
import Button from "components/Form/Button";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { ratingProductRequest } from "redux/slicers/review.slicer";

const voteOptions = [
  { id: 1, text: "Terrible" },
  { id: 2, text: "Bad" },
  { id: 3, text: "Neutral" },
  { id: 4, text: "Good" },
  { id: 5, text: "Perfect" },
];

function VoteForm({ product }) {
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleVote = async () => {
    if (!star) {
      Swal.fire("Đánh giá Form", "Vui lòng vote sao ", "warning");
      return;
    }
    dispatch(
      ratingProductRequest({
        data: { star, comment, productId: product._id },
        onSuccess: () =>
          Swal.fire(
            "Đánh giá Form",
            "Cảm ơn sự đánh giá của bạn...",
            "success"
          ),
        onFailure: (error) => Swal.fire("Đánh giá Form", error, "error"),
      })
    );
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-[70%] flex flex-col justify-center items-center  bg-white rounded  z-40 border-main border p-4 gap-2"
    >
      <div className="flex flex-col justify-center  w-full items-center">
        <img src={logo} alt="logo" className="w-[300px] object-contain" />
        <h2 className="text-center">Đánh giá sản phẩm : {product?.title}</h2>
        <textarea
          className="border border-main w-[80%] p-2 outline-none rounded "
          placeholder="Nhập nội dung đánh giá"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col gap-2">
        <p p className="self-start">
          Bạn thấy sản phẩm này thế nào ?
        </p>
        <div className="flex gap-4">
          {voteOptions.map((el) => (
            <div
              onClick={() => setStar(el.id)}
              key={el.id}
              className={`w-[70px] select-none cursor-pointer p-4 flex rounded    items-center justify-center flex-col gap-2 hover:bg-slate-400 ${
                star >= el.id ? "bg-main" : "bg-slate-200"
              }`}
            >
              {star >= el.id ? (
                <ICONS.AiFillStar color="orange" />
              ) : (
                <ICONS.AiFillStar />
              )}
              <span className={star >= el.id && `text-white font-semibold   `}>
                {el.text}
              </span>
            </div>
          ))}
        </div>
        <Button name={"submit"} fw={true} handleClick={handleVote}></Button>
      </div>
    </div>
  );
}

export default VoteForm;
