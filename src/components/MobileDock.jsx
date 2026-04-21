import { FaHome, FaBolt, FaBriefcase, FaCode, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const tabs = [
  { icon: FaHome, label: 'Home', index: 0 },
  { icon: FaBolt, label: 'Skills', index: 1 },
  { icon: FaBriefcase, label: 'Exp', index: 2 },
  { icon: FaCode, label: 'Projects', index: 3 },
  { icon: FaEnvelope, label: 'Contact', index: 4 },
];

export default function MobileDock({ swiper }) {
  const handleNav = (index) => {
    if (swiper) swiper.slideTo(index);
  };

  return (
    <motion.div
      className="mobile-dock"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 20 }}
    >
      {tabs.map(({ icon: Icon, label, index }) => (
        <button
          key={index}
          className="dock-btn"
          onClick={() => handleNav(index)}
          title={label}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </motion.div>
  );
}
