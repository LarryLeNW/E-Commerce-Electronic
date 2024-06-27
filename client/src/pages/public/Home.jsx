import { Sidebar, Banner, BestSeller } from "../../components";
function Home() {
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[20%] flex-auto ">
          <Sidebar />
          <span>DEAL DAILY</span>
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="h-[500px]"></div>
    </>
  );
}

export default Home;
