import FoodCard from "../../../components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const OrderTab = ({ items }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  // Helper: Split items into chunks of 6
  const chunkItems = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const chunks = chunkItems(items, 6); // Split items into pages of 6

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        {chunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10 ml-12 md:ml-0">
              {chunk.map((item) => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default OrderTab;
