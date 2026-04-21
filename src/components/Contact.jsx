import { FaPhone, FaEnvelope, FaLinkedinIn, FaGithub, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Magnetic from './Animated/Magnetic';

export default function Contact({ isActive }) {
  return (
    <section id="contact">
      <motion.div 
        className="section-header"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <p className="section-label">Kết nối</p>
        <h2 className="section-title">Liên Hệ Với Tôi</h2>
        <div className="section-line"></div>
      </motion.div>
      <motion.div 
        className="contact-inner"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
        }}
      >
        <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
          Tôi đang tìm kiếm cơ hội việc làm phù hợp để phát triển bản thân.
          Nếu bạn là nhà tuyển dụng hoặc có cơ hội muốn chia sẻ, đừng ngần ngại liên hệ — tôi luôn sẵn sàng!
        </p>
        <div className="contact-cards">
          <a href="tel:0522901602" className="contact-card">
            <div className="contact-icon"><FaPhone /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="contact-label">Điện thoại</div>
              <div className="contact-value">0522 901 602</div>
            </div>
          </a>
          <a href="mailto:dtp1621@gmail.com" className="contact-card">
            <div className="contact-icon"><FaEnvelope /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="contact-label">Email</div>
              <div className="contact-value">dtp1621@gmail.com</div>
            </div>
          </a>
        </div>
        <div className="social-links">
          <Magnetic><a href="https://www.linkedin.com/in/ph%C6%B0%C6%A1ng-%C4%91%E1%BB%97-7471162b6/" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><FaLinkedinIn /></a></Magnetic>
          <Magnetic><a href="https://github.com/dophuong1621" target="_blank" rel="noreferrer" className="social-link" title="GitHub"><FaGithub /></a></Magnetic>
          <Magnetic><a href="https://www.facebook.com/jirim1621" target="_blank" rel="noreferrer" className="social-link" title="Facebook"><FaFacebookF /></a></Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
