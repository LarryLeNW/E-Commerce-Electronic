import usePagination from "hooks/usePagination";

function Pagination({
  totalCount,
  currentPage,
  handleChangePage,
  pageSizeParam,
  style,
}) {
  const pagination = usePagination(totalCount, currentPage, pageSizeParam);

  return (
    <div
      className={`flex items-center bg-main mt-2 justify-center p-2 text-white ${
        style && style
      }`}
    >
      {pagination?.map((el, index) => (
        <div
          className={`border py-2 px-4 cursor-pointer ${
            el === currentPage && `text-black bg-white`
          }`}
          key={index}
          onClick={() => {
            if (Number(el)) handleChangePage(el);
          }}
        >
          {el}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
