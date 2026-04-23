import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollableGrid from './ScrollableGrid';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.15,
    }
  })
};

const experiences = [
  {
    period: '02/2023 — 05/2026',
    role: 'Web Developer',
    company: 'HQ Group',
    desc: 'Phát triển và vận hành hệ thống web thương mại điện tử tập trung, quản lý kho thành viên và tối ưu hạ tầng server.',
    bullets: [
      <><b>Thiết kế & phát triển giao diện người dùng</b> (Frontend)</>,
      <>Phát triển tính năng, tối ưu <b>backend</b> và hệ thống</>,
      <>Quản trị hạ tầng, <b>cấu hình server</b> và điều phối tài nguyên</>,
    ],
  },
  {
    period: '10/2022 — 12/2022',
    role: 'Web Developer Intern',
    company: 'Công ty Tigren',
    desc: 'Thực tập phát triển web tại Tigren, học nền tảng Magento và làm việc trực tiếp trên môi trường Linux.',
    bullets: [
      <>Học và thực hành phát triển với <b>Magento</b> (nền tảng eCommerce)</>,
      <>Làm việc trên hệ điều hành <b>Linux</b> trong môi trường thực tế</>,
      <>Tìm hiểu quy trình phát triển <b>thương mại điện tử</b> doanh nghiệp</>,
    ],
  },
  {
    period: '03/2022 — 06/2022',
    role: 'Web Developer Intern',
    company: 'Công ty timviec365',
    desc: 'Thực tập phát triển web tại timviec365 — nền tảng tuyển dụng trực tuyến hàng đầu Việt Nam.',
    bullets: [
      <>Hỗ trợ phát triển và bảo trì <b>giao diện người dùng</b></>,
      <>Làm quen với quy trình phát triển phần mềm thực tế</>,
      <>Công nghệ: <b>PHP · HTML/CSS · JavaScript · MySQL</b></>,
    ],
  },
];

export default function Experience({ isActive, isMobile }) {
  const ref = useRef(null);
  // rootMargin '-50px' giúp trigger khi card đã thực sự vào viewport, không phải ngay mép
  const isInView = useInView(ref, { once: true, amount: 0, margin: '-60px 0px -60px 0px' });
  const showAnim = isMobile ? isInView : isActive;

  return (
    <section id="experience" ref={ref} className={showAnim ? 'section-active' : ''}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={showAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Hành trình</p>
        <h2 className="section-title">Kinh Nghiệm Làm Việc</h2>
        <div className="section-line"></div>
      </motion.div>

      <ScrollableGrid className="experience-grid swiper-no-swiping">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className="experience-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={showAnim ? 'visible' : 'hidden'}
          >
            <div className="timeline-meta" style={{ marginBottom: '1.2rem', alignItems: 'flex-start' }}>
              <span className="timeline-period">{exp.period}</span>
              <div className="timeline-role">{exp.role}</div>
              <div className="company-name">{exp.company}</div>
            </div>
            <p className="timeline-desc">{exp.desc}</p>
            <ul className="experience-bullets">
              {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </motion.div>
        ))}
      </ScrollableGrid>
    </section>
  );
}
