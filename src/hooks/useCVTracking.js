import { useEffect } from 'react';

// Webhook URL của Google Apps Script
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwxMmx9aq3JVqW3jEd-jUl1ZUKvVk7JeastDi1S6dQQPi-N5veXh6nuZF-HsNYV9VYdSA/exec';

/**
 * Phân tích nguồn truy cập:
 * - UTM params nếu có trong URL
 * - document.referrer nếu có
 * - 'Direct' nếu không có gì
 */
function getSource() {
  const params      = new URLSearchParams(window.location.search);
  const utmSource   = params.get('utm_source');
  const utmMedium   = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');

  if (utmSource) {
    return [utmSource, utmMedium, utmCampaign].filter(Boolean).join(' / ');
  }

  const ref = document.referrer;
  if (!ref) return 'Direct';

  try {
    const hostname = new URL(ref).hostname.replace('www.', '');
    if (/google/.test(hostname))           return 'Google';
    if (/facebook|fb\.com/.test(hostname)) return 'Facebook';
    if (/linkedin/.test(hostname))         return 'LinkedIn';
    if (/github/.test(hostname))           return 'GitHub';
    if (/twitter|x\.com/.test(hostname))   return 'Twitter/X';
    if (/zalo/.test(hostname))             return 'Zalo';
    return hostname;
  } catch {
    return ref;
  }
}

/** Phân loại thiết bị */
function getDevice() {
  const ua = navigator.userAgent;
  if (/iPad/i.test(ua)) return 'Tablet';
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

/** Tên trình duyệt */
function getBrowser() {
  const ua = navigator.userAgent;
  if (/Edg\//i.test(ua))        return 'Edge';
  if (/OPR\/|Opera/i.test(ua))  return 'Opera';
  if (/CocCoc/i.test(ua))       return 'Cốc Cốc';
  if (/Chrome\//i.test(ua))     return 'Chrome';
  if (/Firefox\//i.test(ua))    return 'Firefox';
  if (/Safari\//i.test(ua))     return 'Safari';
  return 'Other';
}

/** Format thời gian VN */
function getTimeVN() {
  return new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

/**
 * Gửi sự kiện tracking đến Google Sheets (fail silently)
 * @param {'page_visit' | 'cv_view' | 'cv_download'} eventName
 */
export async function trackEvent(eventName) {
  try {
    const eventLabels = {
      page_visit:  '🌐 Vào website',
      cv_view:     '👁 Xem CV',
      cv_download: '⬇ Tải PDF',
    };

    const payload = {
      time:     getTimeVN(),
      event:    eventLabels[eventName] ?? eventName,
      device:   getDevice(),
      browser:  getBrowser(),
      screen:   `${screen.width}×${screen.height}`,
      source:   getSource(),
      language: navigator.language || 'unknown',
    };

    fetch(WEBHOOK_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    }).catch(() => {});
  } catch {
    // Fail silently
  }
}

// Alias để CVPreviewModal không cần đổi tên import
export const trackCVEvent = trackEvent;

/**
 * Hook: gọi 1 lần duy nhất khi app mount → tracking lượt vào website
 */
export function usePageTracking() {
  useEffect(() => {
    trackEvent('page_visit');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
