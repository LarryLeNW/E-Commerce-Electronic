import Slider from "react-slick";
import { Fragment, memo } from "react";
import Product from "./ProductSlider";

function SliderCustom({ products, activedTab, normal, settings }) {
  console.log("🚀 ~ SliderCustom ~ products:", products);
  return (
    <Fragment>
      {products.length > 4 ? (
        <Slider className="product-slider" {...settings}>
          {products?.map((p, index) => (
            <Product
              isNew={activedTab === 2}
              key={index}
              data={p}
              normal={normal}
            />
          ))}
        </Slider>
      ) : (
        <div>
          {products?.map((p, index) => (
            <Product
              isNew={activedTab === 2}
              key={index}
              data={p}
              normal={normal}
              style="w-1/4 text-base mx-auto  pr-5 px-10"
            />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default memo(SliderCustom);
