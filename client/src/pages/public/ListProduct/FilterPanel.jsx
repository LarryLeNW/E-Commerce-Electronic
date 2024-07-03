import useDebounce from "hooks/useDebounce";
import QueryString from "qs";
import { memo, useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import path from "utils/path";

function FilterPanel({ filterParams }) {
  console.log("🚀 ~ FilterPanel ~ filterParams:", filterParams);
  const navigate = useNavigate();

  // Convert filterParams.from and filterParams.to to numbers
  const initialFrom = +filterParams.from || 0;
  const initialTo = +filterParams.to || 0;

  const [priceSearch, setPriceSearch] = useState({
    from: initialFrom,
    to: initialTo,
  });

  const { category } = useParams();
  const priceFromDebounce = useDebounce(priceSearch, 600);

  useEffect(() => {
    const searchPriceParams = {};
    if (Number(priceSearch.from) > 0) searchPriceParams.from = priceSearch.from;
    if (Number(priceSearch.to) > 0) searchPriceParams.to = priceSearch.to;
    navigate({
      pathname: generatePath(path.PRODUCTS, { category }),
      search: QueryString.stringify({
        ...filterParams,
        ...searchPriceParams,
      }),
    });
  }, [priceFromDebounce]);

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
                  from: +e.target.value || 0,
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
                  to: +e.target.value || 0,
                }))
              }
            />
          </div>
        </div>

        <div className="font-bold">Tất cả danh mục</div>
      </div>
    </div>
  );
}

export default memo(FilterPanel);
