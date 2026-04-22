import { useRef } from 'react';
import { FaCode, FaLayerGroup, FaTools } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

// Dùng CSS animation đơn giản thay vì motion.span để giảm JS overhead
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Skills({ isActive, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const showAnim = isMobile ? isInView : isActive;

  return (
    <section id="skills" ref={ref} className={showAnim ? 'section-active' : ''}>
      <motion.div 
        className="section-header"
        initial="hidden"
        animate={showAnim ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
      >
        <p className="section-label">Năng lực</p>
        <h2 className="section-title">Kỹ Năng Chuyên Môn</h2>
        <div className="section-line"></div>
      </motion.div>
      <div className="skills-grid">
        <motion.div 
          className="skill-group"
          variants={containerVariants}
          initial="hidden"
          animate={showAnim ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="skill-group-title"><FaCode /> Core Stack (Chuyên sâu)</div>
          <div className="skill-tags">
            {['PHP', 'Laravel', 'UX/UI', 'MySQL', 'Redis', 'Nginx', 'REST API'].map((tag, i) => (
              <span
                key={tag}
                className="skill-tag"
                style={{ animationDelay: `${i * 0.07}s` }}
              >{tag}</span>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="skill-group"
          variants={containerVariants}
          initial="hidden"
          animate={showAnim ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="skill-group-title"><FaLayerGroup /> System Architecture &amp; Testing</div>
          <div className="skill-tags">
            {['System Design', 'API Specs', 'Performance Optimization', 'Playwright', 'Unit Test'].map((tag, i) => (
              <span
                key={tag}
                className="skill-tag"
                style={{ animationDelay: `${i * 0.06}s` }}
              >{tag}</span>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="skill-group"
          variants={containerVariants}
          initial="hidden"
          animate={showAnim ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          <div className="skill-group-title"><FaTools /> DevOps &amp; Exploring</div>
          <div className="skill-tags">
            {['Linux Server', 'CI/CD Pipelines', 'Docker', 'Git / GitHub', 'WebRTC', 'Golang', 'React', 'Figma', 'WebSocket'].map((tag, i) => (
              <span
                key={tag}
                className="skill-tag"
                style={{ animationDelay: `${i * 0.07}s` }}
              >{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
