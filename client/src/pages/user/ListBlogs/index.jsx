import Sidebar from "./Sidebar";

function ListBlogs() {
  return (
    <div className="p-4 flex min-h-screen border border-red-700 mt-2">
      <div className="w-[30%] border border-yellow-700">
        <Sidebar />
      </div>
      <div className="w-[70%] border border-blue-600 "></div>
    </div>
  );
}

export default ListBlogs;
