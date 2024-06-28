import Slider from "react-slick";
import { memo } from "react";
import Product from "./ProductSlider";

var settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};

function SliderCustom({ products, activedTab }) {
  return (
    <>
      {products && (
        <Slider {...settings}>
          {products?.map((p, index) => (
            <Product isNew={activedTab === 2} key={index} data={p} />
          ))}
        </Slider>
      )}
    </>
  );
}

export default memo(SliderCustom);
