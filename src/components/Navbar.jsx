import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ swiper }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (e, index) => {
    e.preventDefault();
    if (swiper) swiper.slideTo(index);
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="logo">ĐTP.</div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="#hero" onClick={(e) => handleNav(e, 0)}>Trang chủ</a></li>
        <li><a href="#skills" onClick={(e) => handleNav(e, 1)}>Kỹ năng</a></li>
        <li><a href="#experience" onClick={(e) => handleNav(e, 2)}>Kinh nghiệm</a></li>
        <li><a href="#projects" onClick={(e) => handleNav(e, 3)}>Dự án</a></li>
        <li><a href="#contact" className="nav-cta" onClick={(e) => handleNav(e, 4)}>Liên hệ</a></li>
      </ul>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span><span></span><span></span>
      </button>
    </motion.nav>
  );
}
