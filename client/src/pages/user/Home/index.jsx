import withBaseComponent from "hocs";
import QueryString from "qs";
import ICONS from "utils/icons";
import path from "utils/path";
import Banner from "./Banner";
import BestSeller from "./BestSeller";
import DealDaily from "./DealDaily";
import FeatureProducts from "./FeatureProducts";
import Sidebar from "./Sidebar";
import { setFilterParams } from "redux/slicers/common.slicer";

function Home({ useSelector, dispatch, navigate }) {
  const { data: categories, loading } = useSelector((state) => state.category);
  const { filterParams } = useSelector((state) => state.common);

  return (
    <div className="w-main mx-auto ">
      <div className="w-main flex mt-2  ">
        <div className="flex flex-col gap-5 w-[25%] flex-auto ">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8 mx-auto">
        <FeatureProducts />
      </div>
      <div className="my-8 w-full mx-auto">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2  border-main">
          HOT COLLECTION
        </h3>
        <div className="flex flex-wrap gap-4 mt-4">
          {categories.map((el, index) => {
            if (el?.brands?.length > 0)
              return (
                <div
                  key={index}
                  className="w-[396px] cursor-pointer"
                  onClick={() => {
                    dispatch(
                      setFilterParams({
                        ...filterParams,
                        category: el.title,
                      })
                    );
                    navigate({
                      pathname: path.PRODUCTS,
                      search: QueryString.stringify({
                        ...filterParams,
                        category: el.title,
                      }),
                    });
                  }}
                >
                  <div className="border flex p-4 gap-4 h-[300px] ">
                    <img
                      src={el?.thumb}
                      alt=""
                      className="flex-1 w-[144px] h-[129px]  object-contain my-auto"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold uppercase text-main">
                        {el?.title}
                      </h4>
                      <ul className="flex flex-col justify-between h-full overflow-y-hidden ">
                        {el?.brands?.map((item, index) => (
                          <li
                            key={index}
                            className="text-sm flex gap-2 text-main hover:bg-main  hover:text-white py-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                setFilterParams({
                                  ...filterParams,
                                  brand: item,
                                  category: el.title,
                                })
                              );
                              navigate({
                                pathname: path.PRODUCTS,
                                search: QueryString.stringify({
                                  ...filterParams,
                                  brand: item,
                                  category: el.title,
                                }),
                              });
                            }}
                          >
                            <ICONS.IoMdArrowRoundForward />
                            <span className=" ">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(Home);
