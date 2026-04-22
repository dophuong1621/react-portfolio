import { useEffect, useState } from "react";

// Lazy-load tsparticles chỉ sau khi trang đã render xong
// Điều này giúp không block FCP/LCP trong lần load đầu tiên
let particlesLoaded = false;
let particlesEngine = null;

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile để giảm particle count
    setIsMobile(window.innerWidth <= 768);

    // Chỉ init sau khi window đã load xong (không block LCP)
    const initParticles = async () => {
      if (particlesLoaded) {
        setInit(true);
        return;
      }
      // Dynamic import – tách thành chunk riêng, chỉ fetch khi cần
      const [{ initParticlesEngine }, { loadSlim }] = await Promise.all([
        import("@tsparticles/react"),
        import("@tsparticles/slim"),
      ]);
      particlesEngine = await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      particlesLoaded = true;
      setInit(true);
    };

    // Dùng requestIdleCallback nếu có, fallback về setTimeout
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(initParticles, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const t = setTimeout(initParticles, 500);
      return () => clearTimeout(t);
    }
  }, []);

  // Trong khi chờ particles init, hiện blobs đơn giản (zero JS cost)
  if (!init) {
    return (
      <>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </>
    );
  }

  // Sau khi init: lazy-import component chính
  return <ParticlesCanvas isMobile={isMobile} />;
}

// Tách thành component con để React có thể lazy-load dễ hơn
function ParticlesCanvas({ isMobile }) {
  // Dynamic import Particles component
  const [Particles, setParticles] = useState(null);

  useEffect(() => {
    import("@tsparticles/react").then((m) => setParticles(() => m.default));
  }, []);

  if (!Particles) return null;

  const particleCount = isMobile ? 20 : 40; // giảm từ 50 xuống

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Particles
        id="tsparticles"
        style={{ pointerEvents: isMobile ? "none" : "auto" }}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: isMobile ? 30 : 45, // giảm từ 60 xuống
          interactivity: {
            events: {
              // Tắt hover/click trên mobile để tiết kiệm CPU
              onClick: { enable: !isMobile, mode: "push" },
              onHover: { enable: !isMobile, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 2 },
              repulse: { distance: 80, duration: 0.4 }, // giảm distance
            },
          },
          particles: {
            color: { value: "#818cf8" },
            links: {
              color: "#a855f7",
              distance: 130, // giảm từ 150 xuống
              enable: true,
              opacity: 0.15, // giảm opacity
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 0.8, // giảm từ 1 xuống
              straight: false,
            },
            number: {
              density: { enable: true, area: 900 },
              value: particleCount,
            },
            opacity: { value: 0.25 }, // giảm từ 0.3
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: false, // tắt để tiết kiệm GPU trên mobile
        }}
      />
    </div>
  );
}
