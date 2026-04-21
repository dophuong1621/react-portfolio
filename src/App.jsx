import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

function App() {
  return (
    <>
      <CustomCursor />
      
      {/* Background blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      
      <Navbar />

      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
        speed={800}
      >
        <SwiperSlide><Hero /></SwiperSlide>
        <SwiperSlide><Skills /></SwiperSlide>
        <SwiperSlide><Experience /></SwiperSlide>
        <SwiperSlide><Projects /></SwiperSlide>
        <SwiperSlide>
          <div className="contact-footer-wrapper">
            <Contact />
            <Footer />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default App;
