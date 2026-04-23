import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaEye } from 'react-icons/fa';
import CVTemplate from './CVTemplate';
import { usePdfExport } from '../hooks/usePdfExport';

// A4 chiều ngang ở 96 DPI = 794px
const A4_W_PX = 794;

// Tính scale để CV preview vừa chiều ngang viewport (tối đa = 1, không phóng to)
function calcScale() {
  return Math.min((window.innerWidth - 48) / A4_W_PX, 1);
}

// ─────────────────────────────────────────────────────────────────────────────
export default function CVPreviewModal({ isOpen, onClose }) {
  // ref trỏ trực tiếp vào CVTemplate đang hiển thị trong modal
  // → không cần hidden renderer → không có lỗi cursor / layout
  const cvRef = useRef(null);

  // Toàn bộ logic PDF được tách ra custom hook
  const { isDownloading, status, isReady, handleDownload } = usePdfExport(cvRef, isOpen);

  // Scale preview theo chiều rộng màn hình
  const [previewScale, setPreviewScale] = useState(calcScale);
  useEffect(() => {
    if (!isOpen) return;
    const handler = () => setPreviewScale(calcScale());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [isOpen]);

  // Khoá scroll body khi modal mở, reset cursor để tránh lỗi mất con trỏ
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.cursor  = ''; // đảm bảo cursor luôn được restore
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.cursor  = '';
    };
  }, [isOpen]);

  // Đóng bằng phím Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Dùng React Portal để render modal thẳng lên document.body
  // → thoát khỏi mọi stacking context của Portfolio, luôn nằm trên cùng
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        /* BACKDROP */
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Xem trước CV"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          style={{
            position:             'fixed',
            inset:                0,
            zIndex:               100000,
            backgroundColor:      'rgba(0, 0, 0, 0.85)',
            backdropFilter:       'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display:              'flex',
            flexDirection:        'column',
            pointerEvents:        'auto', // luôn nhận sự kiện chuột
            cursor:               'default',
            fontFamily:           "'Be Vietnam Pro', sans-serif",
          }}
        >
          {/* ── HEADER ─────────────────────────────────────────────────────── */}
          <motion.header
            initial={{ y: -56, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30, delay: 0.04 }}
            style={{
              flexShrink:     0,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '0 20px',
              height:         56,
              background:     'linear-gradient(135deg, #151526 0%, #0f0f1a 100%)',
              borderBottom:   '1px solid rgba(255,255,255,0.08)',
              boxShadow:      '0 2px 20px rgba(0,0,0,0.6)',
            }}
          >
            {/* Tiêu đề */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
              <FaEye size={16} />
              <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: 0.2 }}>
                Xem trước CV
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

              {/* Status message */}
              <AnimatePresence mode="wait">
                {status && (
                  <motion.span
                    key={status}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{   opacity: 0, x: -8 }}
                    style={{ color: '#bfdbfe', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}
                  >
                    {status}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Nút tải xuống */}
              <button
                onClick={handleDownload}
                disabled={isDownloading || !isReady}
                style={{
                  display:     'flex',
                  alignItems:  'center',
                  gap:         7,
                  padding:     '8px 18px',
                  background:  (!isReady || isDownloading) ? 'rgba(255,255,255,0.08)' : 'linear-gradient(90deg, #4f46e5, #a855f7)',
                  color:       (!isReady || isDownloading) ? 'rgba(255,255,255,0.4)' : '#ffffff',
                  border:      'none',
                  borderRadius: 7,
                  fontFamily:  "'Be Vietnam Pro', sans-serif",
                  fontWeight:  700,
                  fontSize:    13.5,
                  cursor:      (!isReady || isDownloading) ? 'not-allowed' : 'pointer',
                  transition:  'all 0.2s',
                  boxShadow:   (!isReady || isDownloading) ? 'none' : '0 4px 14px rgba(168,85,247,0.4)',
                  whiteSpace:  'nowrap',
                }}
              >
                {isDownloading
                  ? <><InlineSpinner /> Đang xử lý...</>
                  : !isReady
                    ? <><InlineSpinner /> Đang chuẩn bị...</>
                    : <><FaDownload size={12} /> Tải xuống PDF</>
                }
              </button>

              {/* Nút đóng */}
              <button
                onClick={onClose}
                title="Đóng (Esc)"
                style={{
                  width:          36,
                  height:         36,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  background:     'rgba(255,255,255,0.12)',
                  border:         'none',
                  borderRadius:   '50%',
                  color:          '#fff',
                  fontSize:       15,
                  cursor:         'pointer',
                  transition:     'background 0.15s',
                  flexShrink:     0,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.26)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              >
                <FaTimes />
              </button>
            </div>
          </motion.header>

          {/* ── SCROLLABLE PREVIEW ──────────────────────────────────────────── */}
          <div
            onClick={onClose}
            style={{
              flex:           1,
              overflowY:      'auto',
              overflowX:      'hidden',
              padding:        '28px 24px 48px',
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              background:     '#050509',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1,  y: 0,  scale: 1    }}
              transition={{ delay: 0.08, type: 'spring', stiffness: 240, damping: 26 }}
              style={{
                /*
                  Scale để preview vừa màn hình.
                  CVTemplate vẫn render ở 794px thật → html2canvas chụp full resolution.
                  transformOrigin = top center → thu nhỏ từ trên xuống, không bị lệch trái.
                */
                transform:       `scale(${previewScale})`,
                transformOrigin: 'top center',
                /*
                  Khi scale < 1, phần tử "thu nhỏ" nhưng vẫn chiếm chiều cao gốc trong flow.
                  Ta cần điều chỉnh lại marginBottom để scroll area vừa đúng.
                */
                marginBottom:    previewScale < 1
                  ? `${(previewScale - 1) * 794 * 2}px`  // ≈ −height * (1-scale) * nPages
                  : 0,
              }}
            >
              {/* Shadow + white bg giả tờ giấy */}
              <div style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.55)', lineHeight: 0 }}>
                {/*
                  *** ĐIỂM KHÁC BIỆT CHÍNH ***
                  ref gắn trực tiếp vào CVTemplate đang hiển thị.
                  Không có HiddenRenderer ẩn → không bị lỗi cursor.
                  handleDownload sẽ chụp chính element này.
                */}
                <CVTemplate ref={cvRef} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ── Spinner nhỏ gọn, dùng CSS keyframe @keyframes spin từ index.css ───────────
function InlineSpinner() {
  return (
    <span
      aria-hidden="true"
      style={{
        display:        'inline-block',
        width:          12,
        height:         12,
        border:         '2px solid rgba(29,78,216,0.2)',
        borderTopColor: '#1d4ed8',
        borderRadius:   '50%',
        animation:      'spin 0.7s linear infinite',
        flexShrink:     0,
      }}
    />
  );
}
