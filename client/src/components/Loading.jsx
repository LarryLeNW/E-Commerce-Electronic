import logo from "assets/logo.png";
import ICONS from "utils/icons";

function Loading() {
  return (
    <div className="flex gap-2 justify-center items-center p-4 text-white ">
      <img
        src={logo}
        alt="img"
        className={`w-[200px] drop-shadow-[-10px_0_10px_aqua] `}
      />
      <ICONS.AiOutlineLoading3Quarters
        size={30}
        color="blue"
        className="animate-spin"
      />
    </div>
  );
}

export default Loading;
