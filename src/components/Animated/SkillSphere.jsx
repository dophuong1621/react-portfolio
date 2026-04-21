import { useEffect, useRef } from "react";
import TagCloud from "TagCloud";
import { motion } from "framer-motion";

export default function SkillSphere() {
  const containerRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    const texts = [
      "HTML5", "CSS3", "JavaScript",
      "TypeScript", "React", "Vue.js",
      "Laravel", "PHP", "MySQL",
      "Node.js", "Docker", "Git",
      "C++", "TailwindCSS", "Framer Motion",
      "Linux", "Pusher", "Playwright"
    ];

    const options = {
      radius: window.innerWidth < 600 ? 120 : 200,
      maxSpeed: "normal",
      initSpeed: "normal",
      direction: 135,
      keep: true,
      useContainerInlineStyles: false
    };

    TagCloud(containerRef.current, texts, options);

  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="sphere-container"
    >
      <div className="tagcloud" ref={containerRef}></div>
    </motion.div>
  );
}
