// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

// import required modules
import { Pagination } from 'swiper/modules';

const Banner = () => {
  return (
    <div className="px-5 lg:px-0 mt-2 mb-10">
      <Swiper
        rewind={true}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        // modules={[Navigation]}
        // Autoplay,
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          {/* Canada */}
          {/* lg:h-[540px] */}
          <div className="w-full lg:h-[460px] rounded-lg hero bg-[url(https://i.ibb.co.com/f0nMk5D/canada.jpg)] bg-cover bg-no-repeat bg-center border-0">
            <div className="hero-overlay bg-opacity-40 rounded-lg">
              <div className="px-12 lg:px-16 border-0 md:w-3/4 lg:w-1/2 flex flex-col gap-5 justify-center items-start border-black h-full rounded-lg">
                <h1 className="font-bold uppercase text-4xl md:text-5xl lg:text-7xl text-white">
                  Canada
                </h1>
                <p className="text-base lg:text-lg text-gray-50">
                  Canada is a vast and diverse country known for its stunning landscapes, including mountains, forests, and lakes. It offers a high standard of living, excellent education opportunities, and a multicultural environment. Popular cities include Toronto, Vancouver, and Montreal.
                </p>
                <div className="">
                  <button className="btn bg-green-500 text-white border-2 border-green-500 hover:bg-transparent hover:border-green-500 font-bold">
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Australia */}
        <SwiperSlide>
          <div className="w-full lg:h-[460px] rounded-lg hero bg-[url(https://i.ibb.co.com/3rXVfzg/Australia.jpg)] bg-cover bg-no-repeat bg-center">
            <div className="hero-overlay bg-opacity-40 rounded-lg">
              <div className="px-12 lg:px-16 border-0 md:w-3/4 lg:w-1/2 flex flex-col gap-5 justify-center items-start border-black h-full rounded-lg">
                <h1 className="font-bold uppercase text-4xl md:text-5xl lg:text-7xl text-white">
                  Australia
                </h1>
                <p className="text-base lg:text-lg text-gray-50">
                  Australia is famous for its unique wildlife, pristine beaches, and vibrant cities like Sydney and Melbourne. It offers world-class education, a strong economy, and a laid-back lifestyle. Iconic landmarks include the Great Barrier Reef and Sydney Opera House.
                </p>
                <div className="">
                  <button className="btn bg-green-500 text-white border-2 border-green-500 hover:bg-transparent hover:border-green-500 font-bold">
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Germany */}
        <SwiperSlide>
          <div className="w-full lg:h-[460px] rounded-lg hero bg-[url(https://i.ibb.co.com/s99FXcH/germany.jpg)] bg-cover bg-no-repeat bg-center">
            <div className="hero-overlay bg-opacity-40 rounded-lg">
              <div className="px-12 lg:px-16 border-0 md:w-3/4 lg:w-1/2 flex flex-col gap-5 justify-center items-start border-black h-full rounded-lg">
                <h1 className="font-bold uppercase text-4xl md:text-5xl lg:text-7xl text-white">
                  Germany
                </h1>
                <p className="text-base lg:text-lg text-gray-50">
                  Germany is a global leader in innovation, engineering, and technology. Known for its rich cultural history, medieval towns, and modern cities like Berlin and Munich, it offers excellent career and education opportunities with a strong focus on quality of life.
                </p>
                <div className="">
                  <button className="btn bg-green-500 text-white border-2 border-green-500 hover:bg-transparent hover:border-green-500 font-bold">
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
