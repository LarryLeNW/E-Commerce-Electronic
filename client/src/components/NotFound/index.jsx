import NotFoundImg from "assets/404.png";

function NotFound({ message, image }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2 relative">
      <img src={NotFoundImg} alt="img" className=" w-80 h-80 object-cover" />
      <span className="text-3xl font-bold text-red-500 absolute bottom-40">
        {message}
      </span>
    </div>
  );
}

export default NotFound;
