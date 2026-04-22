/**
 * Script tạo avatar-mobile.jpg (ảnh nhỏ hơn cho mobile)
 * Chạy: node scripts/optimize-avatar.mjs
 */
import Jimp from 'jimp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src  = join(__dirname, '../public/avatar.jpg');
const dest = join(__dirname, '../public/avatar-mobile.jpg');

const image = await Jimp.read(src);

// Resize về 420px width (mobile 210px CSS × 2x DPR) giữ tỉ lệ
await image
  .resize(420, Jimp.AUTO)
  .quality(75)
  .writeAsync(dest);

const original = (await import('fs')).statSync(src).size;
const optimized = (await import('fs')).statSync(dest).size;

console.log(`✓ avatar-mobile.jpg tạo thành công`);
console.log(`  Original:  ${(original / 1024).toFixed(1)} KB`);
console.log(`  Optimized: ${(optimized / 1024).toFixed(1)} KB`);
console.log(`  Tiết kiệm: ${((1 - optimized / original) * 100).toFixed(0)}%`);
