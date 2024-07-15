import AvatarDefault from "assets/avatar-user.png";
import moment from "moment";
import { renderStars } from "utils/helper";

function Comment({ data }) {
  return (
    <div className="flex gap-4 p-2">
      <div className="flex-none">
        <img
          src={data?.postedBy?.avatar || AvatarDefault}
          alt="avatar"
          className="w-[80px] h-[80px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto gap-2">
        <div className="flex justify-between items-center">
          <h3>{data?.postedBy?.username}</h3>
          <span className="text-gray-400">
            {moment(data?.updatedAt).fromNow()}
          </span>
        </div>
        <div className="text-sm bg-gray-200 p-2 rounded">
          {data?.star && (
            <span className="flex items-center gap-2">
              <span className="font-semibold">Đánh giá:</span>
              <span className="flex justify-center gap-1">
                {renderStars(data?.star).map((el, index) => (
                  <span key={index}>{el}</span>
                ))}
              </span>
            </span>
          )}
          {data?.comment && (
            <span>
              <span className="font-semibold">Bình luận</span>
              <span className="flex items-center gap-1">{data?.comment}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
