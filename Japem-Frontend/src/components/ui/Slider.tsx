import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export function Slider() {
  return (
    <div className="w-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop
        className="w-screen h-[400px]"
      >
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center text-white text-3xl font-bold relative"
            style={{ backgroundImage: 'url("/Japem.jpeg")' }}
          >
            <p>Sigue tu progreso</p>
            <span className="text-base font-normal mt-2">
              Visualiza tu avance y logros en tiempo real.
            </span>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center text-white text-3xl font-bold relative"
            style={{ backgroundImage: 'url("/Japem.jpeg")' }}
          >
            <p>Organiza tus acuerdos</p>
            <span className="text-base font-normal mt-2">
              Mantén todo bajo control fácilmente.
            </span>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center text-white text-3xl font-bold relative"
            style={{ backgroundImage: 'url("/Japem.jpeg")' }}
          >
            <p>Gestiona tus recordatorios</p>
            <span className="text-base font-normal mt-2">
              Nunca olvides lo importante.
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
