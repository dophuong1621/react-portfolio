/**
 * DesktopSwiper — Chỉ load trên tablet/PC (> 768px)
 * Toàn bộ Swiper + swiper/css import ở đây để React.lazy
 * có thể tách thành chunk riêng, không bao giờ load trên mobile.
 */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, HashNavigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Hero       from './Hero';
import Skills     from './Skills';
import Experience from './Experience';
import Projects   from './Projects';
import Contact    from './Contact';
import Footer     from './Footer';

export default function DesktopSwiper({ swiper, setSwiper }) {
  return (
    <Swiper
      onSwiper={setSwiper}
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      mousewheel={{ thresholdDelta: 50, sensitivity: 1 }}
      pagination={{ clickable: true }}
      hashNavigation={{ watchState: true }}
      modules={[Mousewheel, Pagination, HashNavigation]}
      className="mySwiper"
      speed={800}
    >
      <SwiperSlide data-hash="hero">
        {({ isActive }) => <Hero swiper={swiper} isActive={isActive} />}
      </SwiperSlide>
      <SwiperSlide data-hash="skills">
        {({ isActive }) => <Skills isActive={isActive} />}
      </SwiperSlide>
      <SwiperSlide data-hash="experience">
        {({ isActive }) => <Experience isActive={isActive} />}
      </SwiperSlide>
      <SwiperSlide data-hash="projects">
        {({ isActive }) => <Projects isActive={isActive} />}
      </SwiperSlide>
      <SwiperSlide data-hash="contact">
        {({ isActive }) => (
          <div className="contact-footer-wrapper">
            <Contact isActive={isActive} />
            <Footer />
          </div>
        )}
      </SwiperSlide>
    </Swiper>
  );
}
