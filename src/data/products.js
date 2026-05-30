import shoe1 from '/src/assets/shoe1.jpg';
import shoe2 from '/src/assets/shoe2.jpg';
import shoe3 from '/src/assets/shoe3.jpg';
import shoe4 from '/src/assets/shoe4.jpg';
import shoe5 from '/src/assets/shoe5.jpg';
import shoe6 from '/src/assets/shoe6.jpg';
import shoe7 from '/src/assets/shoe7.jpg';
import shoe8 from '/src/assets/shoe8.jpg';
import shoe9 from '/src/assets/shoe9.jpg';

import col1 from '/src/assets/col1.jpg';
import col2 from '/src/assets/col2.jpg';
import col3 from '/src/assets/col3.jpg';
import col4 from '/src/assets/col4.jpg';
import col5 from '/src/assets/col5.jpg';
import col6 from '/src/assets/col6.jpg';
import col7 from '/src/assets/col7.jpg';
import col8 from '/src/assets/col8.jpg';
import col9 from '/src/assets/col9.jpg';

import heroImg1 from '/src/assets/HeroImg1.jpg';
import heroImg2 from '/src/assets/HeroImg2.jpg';

export const PRODUCTS = [
  { id: 1, img: shoe1, title: 'CACTUS', oldPrice: 5000, newPrice: 3200, category: 'shoes', sizes: ['US 7', 'US 8', 'US 9', 'US 10'], stock: 20, isFeatured: true, tags: ['new', 'urban'] },
  { id: 2, img: shoe2, title: 'THE EYE', oldPrice: 4500, newPrice: 3100, category: 'shoes', sizes: ['US 7', 'US 8', 'US 9', 'US 10'], stock: 15, isFeatured: true, tags: ['trending'] },
  { id: 3, img: shoe3, title: 'DURAN', oldPrice: 4800, newPrice: 3300, category: 'shoes', sizes: ['US 7', 'US 8', 'US 9', 'US 10'], stock: 25, isFeatured: true, tags: ['classic'] },
  { id: 4, img: shoe4, title: 'THE CODE', oldPrice: 4700, newPrice: 2900, category: 'shoes', sizes: ['US 7', 'US 8', 'US 9', 'US 10'], stock: 10, isFeatured: true, tags: ['sale'] },
  { id: 5, img: shoe5, title: 'CARNERA', oldPrice: 4900, newPrice: 3400, category: 'shoes', sizes: ['US 7', 'US 8', 'US 9', 'US 10'], stock: 18, isFeatured: true, tags: ['bestseller'] },
  { id: 6, img: shoe6, title: 'TUNNY', oldPrice: 4900, newPrice: 3400, category: 'shoes', sizes: ['US 7', 'US 8', 'US 9', 'US 10'], stock: 12, isFeatured: false, tags: [] },
  { id: 7, img: shoe7, title: 'TRESCIA', oldPrice: 4900, newPrice: 3400, category: 'shoes', sizes: ['US 7', 'US 8', 'US 9', 'US 10'], stock: 8, isFeatured: false, tags: ['premium'] },
  { id: 8, img: shoe8, title: 'PANTAFACA', oldPrice: 4900, newPrice: 3400, category: 'shoes', sizes: ['US 7', 'US 8', 'US 9', 'US 10'], stock: 22, isFeatured: false, tags: ['street'] },
  { id: 9, img: shoe9, title: 'REVOLTA', oldPrice: 4900, newPrice: 3400, category: 'shoes', sizes: ['US 7', 'US 8', 'US 9', 'US 10'], stock: 30, isFeatured: false, tags: ['new'] },
];

export const COLLECTIONS = [
  { id: 1, img: col1, title: 'Concrete Jungle', season: 'SS/25', year: '2025', category: 'Mens', description: 'Urban trekking redefined for the modern explorer navigating city streets and beyond.' },
  { id: 2, img: col2, title: 'Midnight Walk', season: 'FW/24', year: '2024', category: 'Unisex', description: 'Dark tones and reflective accents for the night wanderer.' },
  { id: 3, img: col3, title: 'Desert Bloom', season: 'SS/25', year: '2025', category: 'Womens', description: 'Earthy palettes meet bold silhouettes in this sun-soaked collection.' },
  { id: 4, img: col4, title: 'Raw Terrain', season: 'FW/24', year: '2024', category: 'Mens', description: 'Rugged materials and uncompromising design for uncharted paths.' },
  { id: 5, img: col5, title: 'Neon Drift', season: 'SS/25', year: '2025', category: 'Unisex', description: 'High-visibility colors that refuse to blend into the background.' },
  { id: 6, img: col6, title: 'Soft Concrete', season: 'FW/24', year: '2024', category: 'Womens', description: 'Where softness meets structure. Elegant lines with urban durability.' },
  { id: 7, img: col7, title: 'Trail Blaze', season: 'SS/25', year: '2025', category: 'Mens', description: 'Built for those who carve their own path through the wilderness.' },
  { id: 8, img: col8, title: 'Velvet Storm', season: 'FW/24', year: '2024', category: 'Womens', description: 'Rich textures and deep hues inspired by stormy skies.' },
  { id: 9, img: col9, title: 'Static Motion', season: 'SS/25', year: '2025', category: 'Unisex', description: 'The paradox of standing still while always moving forward.' },
];

export const HERO_IMAGES = [
  { id: 1, img: heroImg1, label: 'MENS', index: '01' },
  { id: 2, img: heroImg2, label: 'WMNS', index: '02' },
];
