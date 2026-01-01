const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public');
const files = fs.readdirSync(publicDir);

const productImages = {};

files.forEach(file => {
  if (file.startsWith('.') || fs.statSync(path.join(publicDir, file)).isDirectory()) return;

  const match = file.match(/^(.*?)(?:\s\d+)?\.(?:jpg|jpeg|png|webp|avif)$/i);
  if (match) {
    const productName = match[1].trim();
    if (!productImages[productName]) {
      productImages[productName] = [];
    }
    productImages[productName].push(`/${file}`);
  }
});

// Sort and filter for products with exactly 4 images (or more)
const mapping = {};
for (const [name, images] of Object.entries(productImages)) {
  if (images.length >= 4) {
    images.sort((a, b) => {
      const aNum = a.match(/\s(\d+)\./);
      const bNum = b.match(/\s(\d+)\./);
      if (aNum && bNum) return parseInt(aNum[1]) - parseInt(bNum[1]);
      if (aNum) return 1;
      if (bNum) return -1;
      return a.localeCompare(b);
    });
    mapping[name] = images.slice(0, 4);
  }
}

const content = `export const PRODUCT_IMAGES: Record<string, string[]> = ${JSON.stringify(mapping, null, 2)};`;

fs.writeFileSync(path.resolve(__dirname, '../lib/product-images.ts'), content);
console.log(`Generated mapping for ${Object.keys(mapping).length} products.`);
