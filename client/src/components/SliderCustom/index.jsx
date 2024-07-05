import Slider from "react-slick";
import { memo } from "react";
import Product from "./ProductSlider";

function SliderCustom({ products, activedTab, normal, settings }) {
  return (
    <>
      {products && (
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
      )}
    </>
  );
}

export default memo(SliderCustom);
