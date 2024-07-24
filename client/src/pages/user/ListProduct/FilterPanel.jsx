import useDebounce from "hooks/useDebounce";
import QueryString from "qs";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setFilterParams } from "redux/slicers/common.slicer";
import path from "utils/path";

function FilterPanel({ handleFilter }) {
  const [priceSearch, setPriceSearch] = useState({
    from: 0,
    to: 0,
  });
  const { filterParams } = useSelector((state) => state.common);
  const { data: categories, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const priceFromDebounce = useDebounce(priceSearch.from, 300);
  const priceToDebounce = useDebounce(priceSearch.to, 300);

  useEffect(() => {
    if (Number(priceSearch.from) > 0)
      handleFilter("priceFrom", priceSearch.from);
  }, [priceFromDebounce]);

  useEffect(() => {
    if (Number(priceSearch.to) > 0) handleFilter("priceTo", priceSearch.to);
  }, [priceToDebounce]);

  return (
    <div className="w-full p-1">
      <div>
        <div className="text-[20px] font-semibold py-2 border-main border-b-2">
          Bộ lọc tìm kiếm
        </div>
        <div className="flex flex-col p-2 gap-2">
          <span className="font-semibold">Khoảng giá</span>
          <div className="flex w-full justify-between items-center">
            <input
              type="number"
              className="p-2 w-[40%] border"
              placeholder="đ từ"
              onChange={(e) =>
                setPriceSearch((prev) => ({
                  ...prev,
                  from: +e.target.value,
                }))
              }
            />
            <span className="font-semibold">-</span>
            <input
              type="number"
              className="p-2 w-[40%] border"
              placeholder="đ đến"
              onChange={(e) =>
                setPriceSearch((prev) => ({
                  ...prev,
                  to: +e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FilterPanel);
