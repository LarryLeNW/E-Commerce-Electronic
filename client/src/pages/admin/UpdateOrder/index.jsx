import { Input, notification } from "antd";
import { getUsers } from "apis";
import { getProducts } from "apis/product";
import withBaseComponent from "hocs";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ICONS from "utils/icons";
import path from "utils/path";
import defaultAvatar from "assets/default-avatar.png";
import Button from "components/Form/Button";
import { formatMoney } from "utils/helper";
import Pagination from "components/Pagination";
import { showModal } from "redux/slicers/common.slicer";
import OptionProductModal from "./OptionProductModal";

function UpdateOrder({ dispatch }) {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const [keyword, setKeyword] = useState("");

  const [foundUser, setFoundUser] = useState({
    data: null,
    isLoading: false,
  });

  const [userSelected, setUserSelected] = useState(null);
  const [products, setProducts] = useState({ data: [] });
  const [keywordProduct, setKeywordProduct] = useState("");
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [productSelected, setProductSelected] = useState([]);

  const KWSearchProduct = useDebounce(keywordProduct, 500);
  const searchUserDebounce = useDebounce(keyword, 300);

  const [params, setParams] = useState({
    keyword: "",
    page: 1,
    limit: 4,
    fields: "-description",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts(params);
      setProducts(response || []);
    };
    fetchProducts();
  }, [params]);

  useEffect(() => {
    const newFilterParams = {
      ...params,
      keyword: KWSearchProduct,
      page: 1,
    };
    setParams(newFilterParams);
  }, [KWSearchProduct]);

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm();

  useEffect(() => {
    // if (currentCustomer) {
    //   setValue("email", currentCustomer["email"]);
    //   setValue("mobile", currentCustomer["mobile"]);
    //   setValue("username", currentCustomer["username"]);
    //   setValue("role", currentCustomer["role"]);
    //   setValue("isBlocked", "" + currentCustomer["isBlocked"]);
    // }
  }, []);

  useEffect(() => {
    const handleFindUser = async () => {
      setFoundUser((prev) => ({ ...prev, isLoading: true }));
      const queries = {
        q: searchUserDebounce,
        limit: 1,
        fields: "username,avatar,email,mobile",
      };

      const response = await getUsers(queries);
      if (response.success)
        setFoundUser((prev) => ({ ...prev, data: response?.data[0] }));
      setFoundUser((prev) => ({ ...prev, isLoading: false }));
    };

    if (searchUserDebounce) handleFindUser();
  }, [searchUserDebounce]);

  const handleUpdate = async (data) => {
    // try {
    //   let response;
    //   if (currentCustomer?._id) {
    //     response = await updateUser(currentCustomer._id, data);
    //     notification.success({
    //       message: "User updated successfully",
    //     });
    //   } else {
    //     try {
    //       response = await createUser(data);
    //       notification.success({
    //         message: "User created successfully",
    //       });
    //     } catch (error) {
    //       notification.error({
    //         message: "User created successfully",
    //       });
    //     }
    //   }
    //   callbackUpdateAfter();
    //   dispatch(showModal({ isShow: false }));
    // } catch (error) {
    //   console.error("Error in handleUpdate:", error);
    //   const errorMessage = currentCustomer?._id
    //     ? "User update failed"
    //     : "Create failed";
    //   notification.error({
    //     message: `${errorMessage}: ${error.message}`,
    //   });
    // }
  };

  const handleToggleUser = () => {
    if (userSelected) setUserSelected(null);
    else setUserSelected(foundUser?.data);
  };

  const handleChangePage = (page) => {
    setParams({ ...params, page });
  };

  const handleChooseProduct = (product) => {
    console.log("🚀 ~ handleChooseProduct ~ product:", product);
    // const isExitSelected = productSelected.findIndex(
    //   (el) => el.pid === product._id
    // );
    // if (isExitSelected !== -1) {
    //   setProductSelected((prev) => prev.filter((el) => el.pid !== product._id));
    //   return;
    // }
    // // const inputValue = prompt("Enter quantity:");
    // // if (inputValue !== null) {
    // //   const quantity = parseInt(inputValue, 10);
    // //   if (!isNaN(quantity) && quantity > 0) {
    // //     const data = {
    // //       pid: product._id,
    // //       title: product.title,
    // //       quantity: quantity,
    // //       price: product.price,
    // //       color: product.color,
    // //       thumb: product.thumb,
    // //     };
    // //     setProductSelected((prev) => [...prev, data]);
    // //   } else
    // //     notification.error({
    // //       message: "Invalid quantity entered",
    // //       duration: 200,
    // //     });
    // //   return;
    // // }
    // // notification.warning({
    // //   message: "Quantity required",
    // //   duration: 200,
    // // });
  };

  const handleRemoveProduct = (pid) => {
    setProductSelected((prev) => prev.filter((el) => el.pid !== pid));
  };

  const renderUserUI = useMemo(() => {
    return (
      <div className="flex-1 flex flex-col gap-2">
        {!userSelected && (
          <Input
            placeholder="Search user by keyword ...."
            className="text-2xl font-bold"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        )}
        <div
          className={`h-full border-2 rounded p-2 bg-gray-300 flex flex-col  items-center ${
            userSelected && "border-blue-700"
          }`}
        >
          {foundUser.isLoading ? (
            <div className="flex h-full justify-center items-center">
              <ICONS.AiOutlineLoading3Quarters
                size={30}
                color="blue"
                className="animate-spin"
              />
            </div>
          ) : (
            <Fragment>
              <div className="h-2/3 w-full">
                <img
                  src={foundUser.data?.avatar || defaultAvatar}
                  alt="not found this avatar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-lg text-gray-600">
                Username :
                <span className="font-bold">{foundUser.data?.username}</span>
              </div>
              <div className="text-lg text-gray-600">
                Email :{" "}
                <span className="font-bold">{foundUser.data?.email}</span>
              </div>
              {foundUser.data?.mobile && (
                <div className="text-lg text-gray-600">
                  Sdt : {foundUser.data?.mobile}
                </div>
              )}
              {foundUser.data && (
                <Button
                  name={`${userSelected ? "Change to another user" : "Choose"}`}
                  handleClick={handleToggleUser}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }, [keyword, foundUser, userSelected]);

  const renderListProductUI = useMemo(() => {
    return (
      <div className="flex-2">
        <Input
          placeholder="Search product by keyword ...."
          className="text-2xl font-bold"
          value={keywordProduct}
          onChange={(e) => setKeywordProduct(e.target.value)}
        />
        <div className="w-full text-right">
          <Pagination
            currentPage={params?.page}
            totalCount={products?.counts}
            handleChangePage={handleChangePage}
          ></Pagination>
        </div>
        <div className="flex flex-col border justify-between h-[50vh] overflow-y-auto">
          <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400 ">
            <thead className="font-bold bg-gray-700 text-[13px] text-center   text-red-500  border border-blue-300">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Sold</th>
                <th className="px-4 py-2">Star Average</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">UpdateAt</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.map((p, index) => (
                <tr
                  key={p._id}
                  className="hover-row relative text-sm"
                  onMouseEnter={() => handleMouseEnter(p._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className="px-4 py-1 border border-slate-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-1 border border-slate-500 ">
                    <span>{p?.title}</span>
                  </td>
                  <td className="px-4 py-1 border border-slate-500">
                    <span>{formatMoney(p?.price)}</span>
                  </td>
                  <td className="px-4 py-1 border border-slate-500">
                    <span>{p?.quantity}</span>
                  </td>
                  <td className="px-4 py-1 border border-slate-500">
                    <span>{p?.sold}</span>
                  </td>
                  <td className="px-4 py-1 border border-slate-500 ">
                    <span>{p?.totalRatings}</span>
                  </td>
                  <td className="px-4 py-1 border border-slate-500  ">
                    <span>{p?.brand}</span>
                  </td>
                  <td className="px-4 py-1 border border-slate-500 ">
                    <span>{moment(p?.updatedAt).format("DD/MM/YYYY")}</span>
                  </td>
                  <td className="px-4 py-8 h-full flex flex-col gap-4 items-center justify-between ">
                    <button
                      className=" bg-blue-600 cursor-pointer "
                      type="button"
                    >
                      {productSelected.some((el) => el.pid === p._id) ? (
                        <span className="text-lg bg-red-700 text-white w-full h-full inline-block px-2">
                          Remove
                        </span>
                      ) : (
                        <span
                          className="text-lg text-white w-full h-full inline-block px-2 "
                          onClick={() => {
                            const isExitSelected = productSelected.findIndex(
                              (el) => el.pid === p._id
                            );

                            if (isExitSelected !== -1) {
                              setProductSelected((prev) =>
                                prev.filter((el) => el.pid !== p._id)
                              );
                              return;
                            }

                            dispatch(
                              showModal({
                                isShowModal: true,
                                children: (
                                  <OptionProductModal
                                    product={p}
                                    handleChooseProduct={handleChooseProduct}
                                  />
                                ),
                              })
                            );
                          }}
                        >
                          Choose
                        </span>
                      )}
                    </button>
                  </td>
                  {hoveredProductId === p._id && (
                    <div className="absolute w-[140px] h-[140px] rounded top-[-10px] transition ease-in  left-0 bg-gray-200  border-2 border-main shadow-md p-4 z-50">
                      <img
                        src={p?.thumb}
                        alt="thumb image"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }, [keywordProduct, products, hoveredProductId]);

  const renderListProductSelected = useMemo(() => {
    return (
      <div className="h-[15vh] w-full border overflow-x-auto p-1">
        {productSelected?.map((el) => (
          <div className="h-full w-1/6 border relative">
            <img
              src={el.thumb}
              alt="thumb"
              className="h-full w-full object-cover "
              title={el.title}
            />
            <div
              className="absolute top-0 right-0 p-2 bg-red-600 text-black cursor-pointer font-bold"
              onClick={() => handleRemoveProduct(el.pid)}
            >
              {<ICONS.IoIosCloseCircleOutline />}
            </div>
          </div>
        ))}
      </div>
    );
  }, [productSelected]);

  return (
    <div className="w-full p-4 flex flex-col gap-2 ">
      <div className="h-[30px] flex justify-between items-center text-lg font-bold p-4  border-b border-blue-300">
        <div>{currentOrder ? "UPDATE " : "CREATE"} ORDER</div>
        <Link
          to={path.ADMIN.ORDER_MANAGEMENT}
          className="flex items-center gap-2 text-main cursor-pointer"
        >
          Back to list <ICONS.AiFillProduct />
        </Link>
      </div>

      <div className="flex flex-col w-full gap-2">
        {renderListProductSelected}
        <div className="flex  gap-2">
          {renderUserUI}
          {renderListProductUI}
        </div>
        <button className="w-full p-2 bg-main text-white" type="submit">
          {currentOrder ? `Update` : "Create"}
        </button>
      </div>
    </div>
  );
}

export default withBaseComponent(UpdateOrder);
