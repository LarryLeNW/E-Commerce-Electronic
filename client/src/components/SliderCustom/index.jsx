import Slider from "react-slick";
import { Fragment, memo } from "react";
import Product from "./ProductSlider";

function SliderCustom({ products, activedTab, normal, settings }) {
  return (
    <Fragment>
      {products.length > 3 ? (
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
        <div className="flex gap-2 ">
          {products?.map((p, index) => (
            <Product
              isNew={activedTab === 2}
              key={index}
              data={p}
              normal={normal}
              style="w-1/4 text-base mx-auto px-10"
            />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default memo(SliderCustom);
