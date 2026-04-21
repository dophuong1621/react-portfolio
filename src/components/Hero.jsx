import { FaFileAlt, FaPaperPlane, FaUser } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">✦ Available for work</div>
          <h1 className="hero-name">Đỗ Thế<br/><span>Phương</span></h1>
          <div className="hero-role" style={{ minHeight: '30px' }}>
            <Typewriter
              options={{
                strings: ['Frontend Developer', 'UI/UX Enthusiast', 'Web Designer', 'React Developer'],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 20,
              }}
            />
          </div>
          <p className="hero-desc">
            Lập trình viên với niềm đam mê xây dựng các ứng dụng web real-time hiện đại.
            Có kinh nghiệm phát triển hệ thống từ backend API đến giao diện người dùng,
            luôn hướng tới sản phẩm ổn định, hiệu năng cao và trải nghiệm người dùng xuất sắc.
          </p>
          <div className="hero-btns">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#" className="btn-primary">
              <FaFileAlt /> Xem CV
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="btn-outline">
              <FaPaperPlane /> Liên hệ ngay
            </motion.a>
          </div>
          <div className="stat-chips">
            <div className="stat-chip"><b>3+</b> năm kinh nghiệm</div>
            <div className="stat-chip"><b>10+</b> dự án hoàn thành</div>
            {/* <div className="stat-chip">🟢 Sẵn sàng nhận việc</div> */}
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-avatar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -10, boxShadow: "0 40px 90px rgba(168,85,247,0.3)" }}
        >
          <motion.div 
            className="avatar-ring"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <FaUser />
        </motion.div>
      </div>
    </section>
  );
}
