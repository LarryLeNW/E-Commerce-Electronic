import { useParams } from "react-router-dom";

function DetailProduct() {
  const { id, title } = useParams();
  console.log("🚀 ~ DetailProduct ~ title:", title);
  console.log("🚀 ~ DetailProduct ~ id:", id);

  return <div>DetailProduct</div>;
}

export default DetailProduct;
