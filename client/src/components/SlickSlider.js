import React, { useState } from "react";
import Slider from "react-slick";

const tabs = [
  {
    id: 1,
    title: "Sản phẩm mới",
  },
  {
    id: 2,
    title: "Bán chạy",
  },
  {
    id: 3,
    title: "Nổi bật",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SlickSlider = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="mt-3 h-[300px]">
      <div className="flex gap-10">
        {tabs.map((el) => (
          <span
            className={`cursor-pointer  pr-2 text-xl font-medium ${el.id === activeTab ? "text-main" : " text-gray-400"}`}
            onClick={() => setActiveTab(el.id)}
            key={el.id}
          >
            {el.title}
          </span>
        ))}
      </div>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default SlickSlider;
