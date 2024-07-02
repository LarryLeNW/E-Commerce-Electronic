import { useSelector } from "react-redux";

import DealDaily from "./DealDaily";
import ICONS from "utils/icons";
import Sidebar from "./Sidebar";
import Banner from "./Banner";
import BestSeller from "./BestSeller";
import FeatureProducts from "./FeatureProducts";

function Home() {
  const { data: categories, loading } = useSelector((state) => state.category);

  return (
    <>
      <div className="w-main flex mt-2">
        <div className="flex flex-col gap-5 w-[25%] flex-auto ">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8">
        <FeatureProducts />
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2  border-main">
          HOT COLLECTION
        </h3>
        <div className="flex flex-wrap gap-4 mt-4">
          {categories.map((el, index) => {
            if (el?.brand?.length > 0)
              return (
                <div key={index} className="w-[396px] ">
                  <div className="border flex p-4 gap-4 min-h-[250px] ">
                    <img
                      src={el?.thumb}
                      alt=""
                      className="flex-1 w-[144px] h-[129px]  object-contain"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold uppercase text-main">
                        {el?.title}
                      </h4>
                      <ul>
                        {el?.brand?.map((item, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <ICONS.IoMdArrowRoundForward />
                            <span className="text-main"> {item}</span>
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

      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2  border-main">
          BLOGS
        </h3>
      </div>
    </>
  );
}

export default Home;
