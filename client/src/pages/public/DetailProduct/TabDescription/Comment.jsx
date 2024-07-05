import AvatarDefault from "assets/avatar-user.png";
import { renderStars } from "utils/helper";

function Comment({ data }) {
  return (
    <div className="flex gap-4 p-2">
      <div className="flex-none">
        <img
          src={AvatarDefault}
          alt=""
          className="w-[80px] h-[80px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto">
        <div className="flex justify-between items-center">
          <h3>name</h3>
          <span className="text-gray-400">{Date.now()}</span>
        </div>
        <div className="text-sm bg-gray-200 p-2 rounded">
          <span className="flex items-center gap-2">
            <span className="font-semibold">Đánh giá:</span>
            <span className="flex justify-center gap-1">
              {renderStars(5).map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
          </span>
          <span>
            <span className="font-semibold">Bình luận</span>
            <span className="flex items-center gap-1">
              GOoofsdfjsklfdslkdfjlksdfflsdjfls ádasdasdádlkajsdlkasjlkjlk
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
