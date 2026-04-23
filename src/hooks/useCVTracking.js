// Webhook URL của Google Apps Script
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwzO_Gs3UNayoq9NSGY_S1ScpPNVHksK24BheXcunA-7HxcuGQSeKVIrPoLCMMQjt6T/exec';

/**
 * Gửi sự kiện tracking đến Google Sheets
 * @param {'cv_view' | 'cv_download'} eventName
 */
export function trackCVEvent(eventName) {
  try {
    const now = new Date();
    const timeStr = now.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });

    // Phân loại thiết bị
    const ua = navigator.userAgent;
    let device = 'Desktop';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      device = /iPad/i.test(ua) ? 'Tablet' : 'Mobile';
    }

    // Tên trình duyệt
    let browser = 'Unknown';
    if (/Edg\//i.test(ua))        browser = 'Edge';
    else if (/OPR\//i.test(ua))   browser = 'Opera';
    else if (/Chrome\//i.test(ua)) browser = 'Chrome';
    else if (/Firefox\//i.test(ua)) browser = 'Firefox';
    else if (/Safari\//i.test(ua)) browser = 'Safari';

    const payload = {
      time:     timeStr,
      event:    eventName === 'cv_view' ? '👁 Xem CV' : '⬇ Tải PDF',
      device,
      browser,
      screen:   `${screen.width}×${screen.height}`,
      referrer: document.referrer || 'Direct',
      language: navigator.language || 'unknown',
    };

    // Dùng fetch với no-cors để tránh CORS error (Apps Script không cần preflight)
    fetch(WEBHOOK_URL, {
      method: 'POST',
      mode:   'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    }).catch(() => {
      // Fail silently — tracking không được làm ảnh hưởng UX
    });
  } catch {
    // Fail silently
  }
}
