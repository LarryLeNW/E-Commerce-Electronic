import { useParams } from "react-router-dom";

function DetailProduct() {
  const { id, title } = useParams();
  const product = {
    title: "something",
    price: 23123,
    description: "something",
    image: "https://picsum.photos/200/300",
  };

  return (
    <div className="w-full">
      <div className="h-[81px] bg-gray-100 flex justify-center items-center">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default DetailProduct;
