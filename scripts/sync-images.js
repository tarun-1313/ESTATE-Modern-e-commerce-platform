const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncImages() {
  console.log('Starting image sync...');

  const publicDir = path.resolve(__dirname, '../public');
  const files = fs.readdirSync(publicDir);

  // Group files by product name
  // Example: "Hand-loomed Cotton Tunic 1.jpg" -> "Hand-loomed Cotton Tunic"
  const productImages = {};

  files.forEach(file => {
    // Skip hidden files or directories
    if (file.startsWith('.') || fs.statSync(path.join(publicDir, file)).isDirectory()) return;

    // Match patterns like "Product Name 1.jpg" or "Product Name.jpg"
    const match = file.match(/^(.*?)(?:\s\d+)?\.(?:jpg|jpeg|png|webp|avif)$/i);
    if (match) {
      const productName = match[1].trim();
      if (!productImages[productName]) {
        productImages[productName] = [];
      }
      productImages[productName].push(`/${file}`);
    }
  });

  console.log(`Found ${Object.keys(productImages).length} products with images in public folder.`);

  // Update products in database
  for (const [name, images] of Object.entries(productImages)) {
    // Sort images so "Product 1.jpg" is first
    images.sort((a, b) => {
      const aNum = a.match(/\s(\d+)\./);
      const bNum = b.match(/\s(\d+)\./);
      if (aNum && bNum) return parseInt(aNum[1]) - parseInt(bNum[1]);
      if (aNum) return 1;
      if (bNum) return -1;
      return a.localeCompare(b);
    });

    const mainImage = images[0];

    // Try to find the product in DB
    const { data: products, error: findError } = await supabase
      .from('products')
      .select('id, name')
      .ilike('name', name);

    if (findError) {
      console.error(`Error finding product ${name}:`, findError);
      continue;
    }

    if (products && products.length > 0) {
      for (const product of products) {
        const { error: updateError } = await supabase
          .from('products')
          .update({ image_url: mainImage })
          .eq('id', product.id);

        if (updateError) {
          console.error(`Error updating product ${product.name}:`, updateError);
        } else {
          console.log(`Updated image for: ${product.name} -> ${mainImage}`);
        }
      }
    } else {
      // console.log(`Product not found in DB: ${name}`);
    }
  }

  console.log('Image sync completed.');
}

syncImages().catch(err => {
  console.error('Fatal error during sync:', err);
  process.exit(1);
});
