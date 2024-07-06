import { useMemo } from "react";
import { generateRange } from "utils/helper";

function usePagination(totalProductCount, currentPage, siblingCount = 1) {
  const paginationArr = useMemo(() => {
    const pageSize = process.env.REACT_APP_LIMIT_PAGE || 8;
    const paginationCount = Math.ceil(totalProductCount / pageSize);
    const totalPaginationItems = siblingCount + 5;

    if (paginationCount <= totalPaginationItems)
      return generateRange(1, paginationCount);

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, "...", ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, "...", paginationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [1, "...", ...middleRange, "...", paginationCount];
    }
  }, [totalProductCount, currentPage, siblingCount]);

  return paginationArr;
}

export default usePagination;