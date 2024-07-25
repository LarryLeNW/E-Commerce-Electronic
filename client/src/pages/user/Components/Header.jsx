import { generatePath, Link } from "react-router-dom";
import logo from "assets/logo.png";
import ICON from "utils/icons";
import path from "utils/path";
import { useEffect, useState } from "react";
import ICONS from "utils/icons";
import { useClickOutside } from "hooks/useClickOutside";
import withBaseComponent from "hocs";
import { showModal } from "redux/slicers/common.slicer";
import CartReview from "components/CartReview";
import { Badge } from "antd";
import useDebounce from "hooks/useDebounce";
import { getProducts } from "apis/product";
import { renderStars } from "utils/helper";
import { logout } from "redux/slicers/auth.slicer";
import Button from "components/Form/Button";
function Header({ useSelector, dispatch, navigate }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [isShowMenuMember, setIsShowMenuMember] = useState(false);
  const [isModalSearch, setIsModalSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const keywordDebounce = useDebounce(keyword, 500);
  const menuRef = useClickOutside(() => {
    setIsShowMenuMember(false);
  });
  const searchModalRef = useClickOutside(() => {
    setIsModalSearch(false);
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const response = await getProducts({ keyword, limit: 5 });
      setDataSearch(response?.data);
      setLoading(false);
      if (response?.data.length > 0) {
        setIsModalSearch(true);
      }
    };
    if (keyword) fetchProduct();
    else {
      setDataSearch([]);
      setIsModalSearch(false);
    }
  }, [keywordDebounce]);

  return (
    <div className="w-main  flex justify-between mt-[48px] items-center h-[110px] py-[35px] select-none">
      <Link to={`${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[140px] object-contain " />
      </Link>
      <div className="flex gap-2 border-2 border-blue-500 w-1/2 p-2 rounded relative">
        <input
          type="text"
          placeholder="Bạn tìm kiếm gì hôm nay ?"
          className="flex-1 outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="px-2 border-l-2">
          {loading ? (
            <ICON.AiOutlineLoading3Quarters
              size={20}
              className="font-bold  animate-spin "
            />
          ) : (
            <ICON.IoIosSearch size={20} className="font-bold  " />
          )}
        </div>
        {isModalSearch && (
          <div
            className="absolute w-full  border-2 bg-white rounded top-full p-2 h-fit z-30"
            ref={searchModalRef}
          >
            <h1 className="border-b border-main font-bold">
              Kết quả tìm kiếm :
            </h1>
            <div>
              {dataSearch.map((product) => (
                <Link
                  key={product._id}
                  className="flex  gap-2 hover:bg-gray-100 px-2 py-2 cursor-pointer"
                  to={generatePath(path.DETAIL_PRODUCT, {
                    category: product?.category.toLowerCase(),
                    title: product?.title,
                    id: product?._id,
                  })}
                  onClick={() => setIsModalSearch(false)}
                >
                  <img
                    src={product.thumb}
                    alt=""
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-bold text-sm">{product.title}</h1>
                    <span className="text-gray-500 text-sm">
                      {product.price.toLocaleString("vi-VN")} VNĐ
                    </span>
                    <span className="text-gray-500 text-sm">
                      Còn : {product.quantity} cái
                    </span>
                    <span className="flex h-4">
                      {renderStars(product?.totalRatings, 14).map(
                        (el, index) => (
                          <span key={index}>{el}</span>
                        )
                      )}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {userInfo?.data ? (
        <div className="flex text-[13px] gap-4">
          <div
            className="flex items-center justify-center gap-2 border-r px-6 cursor-pointer"
            onClick={() =>
              dispatch(
                showModal({ children: <CartReview />, isShowModal: true })
              )
            }
          >
            <ICON.LuBaggageClaim />
            <Badge
              count={`${userInfo.data?.cart?.length || 0} item(s)`}
            ></Badge>
          </div>
          <div
            className="flex items-center justify-center px-4 relative"
            ref={menuRef}
          >
            <div
              className="flex gap-2 items-center"
              onClick={() => setIsShowMenuMember(true)}
            >
              <span className="font-bold text-lg">
                {userInfo.data?.username}
              </span>
              <img
                src={
                  userInfo.data?.avatar ||
                  "https://avatar.iran.liara.run/public/boy"
                }
                alt=""
                className="w-[40px] h-[40px] rounded-[50%]  object-cover cursor-pointer border-2 border-gray-500"
              />
            </div>
            {isShowMenuMember && (
              <div className="absolute top-[50px] right-[20px] text-black bg-white  w-[200px] flex flex-col border-2 z-30">
                <Link
                  onClick={() => setIsShowMenuMember(false)}
                  className="px-2 py-2 border font-semibold text-lg text-gray-600 hover:bg-gray-700 hover:text-white  "
                  to={path.MEMBER.PROFILE}
                >
                  Thông tin cá nhân
                </Link>
                <Link
                  onClick={() => setIsShowMenuMember(false)}
                  className="px-2 py-2 border font-semibold text-lg text-gray-600 hover:bg-gray-700 hover:text-white  "
                  to={path.MEMBER.HISTORY}
                >
                  Lịch sử mua hàng
                </Link>
                <button
                  className="bg-red-600 w-full  text-white font-bold  rounded-none text-lg flex justify-center items-center gap-2"
                  onClick={() => dispatch(logout())}
                >
                  <ICONS.RiLogoutBoxLine />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button
          name={"Đăng nhập ngay"}
          iconAfter={<ICONS.FaUserCircle />}
          handleClick={() => {
            navigate(path.LOGIN);
          }}
        />
      )}
    </div>
  );
}

export default withBaseComponent(Header);
