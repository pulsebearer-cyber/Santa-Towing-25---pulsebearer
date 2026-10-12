import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITEMAP_DATA } from '../src/data/sitemapData';
import { TOWING_ADVERTS } from '../src/data/towingAdverts';
import { CARS } from '../src/data/mockData';
import { BLOG_POSTS } from '../src/data/blogData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = process.env.VITE_SITE_URL || 'https://sparkprimeautoservices.com';

const STANDARD_SERVICES = [
  { id: 'emergency-towing', title: 'Emergency Towing' },
  { id: 'scheduled-towing', title: 'Scheduled Towing' },
  { id: 'car-recovery', title: 'Car Recovery' },
  { id: 'long-distance-towing', title: 'Long-Distance Towing' }
];

async function generateSitemap() {
  console.log('Generating comprehensive sitemap.xml...');
  const urls: string[] = [];
  const addedUrls = new Set<string>();

  const addUrl = (url: string) => {
    // Normalize url
    const cleanUrl = url.split('#')[0].split('?')[0];
    if (cleanUrl.startsWith('/admin')) {
      return;
    }
    if (cleanUrl && !addedUrls.has(cleanUrl) && cleanUrl !== '/404' && cleanUrl !== '*') {
      urls.push(cleanUrl);
      addedUrls.add(cleanUrl);
    }
  };

  // 1. Add all URLs from centralized SITEMAP_CATEGORIES registry
  for (const cat of SITEMAP_DATA) {
    for (const link of cat.links) {
      addUrl(link.path);
    }
  }

  // 2. Automatically verify any additional static routes from App.tsx (excluding admin console)
  const appTsxPath = path.resolve(__dirname, '../src/App.tsx');
  if (fs.existsSync(appTsxPath)) {
    const appTsxContent = fs.readFileSync(appTsxPath, 'utf8');
    const routeRegex = /<Route[^>]+path=["']([^"']+)["']/g;
    let match;
    while ((match = routeRegex.exec(appTsxContent)) !== null) {
      const routePath = match[1];
      if (
        !routePath.includes(':') &&
        !routePath.includes('*') &&
        routePath !== '/search' &&
        routePath !== '/404' &&
        !routePath.startsWith('/admin') &&
        !['colors', 'logo', 'links', 'pages-text', 'images', 'inventory', 'profile'].includes(routePath)
      ) {
        addUrl(routePath);
      }
    }
  }

  // 3. Dynamic service area routes
  const areas = Array.from(new Set(TOWING_ADVERTS.map(ad => ad.district))).sort();
  areas.forEach(area => {
    const areaSlug = area.toLowerCase().replace(/ /g, '-');
    addUrl(`/service-areas/${areaSlug}`);
    
    STANDARD_SERVICES.forEach(service => {
      addUrl(`/service-areas/${areaSlug}/${service.id}`);
    });
  });

  // 4. Dynamic car sales routes
  CARS.forEach(car => {
    addUrl(`/sales/${car.id}`);
  });

  // 5. Dynamic blog posts routes
  BLOG_POSTS.forEach(post => {
    addUrl(`/blog/${post.id}`);
  });

  // 6. Dynamic parts routes from Parts.tsx
  const partsTsxPath = path.resolve(__dirname, '../src/pages/Parts.tsx');
  if (fs.existsSync(partsTsxPath)) {
    const partsContent = fs.readFileSync(partsTsxPath, 'utf8');
    const productRegex = /id:\s*['"]?(\d+)['"]?/g;
    let match;
    while ((match = productRegex.exec(partsContent)) !== null) {
      addUrl(`/parts/${match[1]}`);
    }
  }

  // Compute Priority & Changefreq based on path depth and type
  const getPriority = (url: string) => {
    if (url === '/') return '1.0';
    if (url === '/towing' || url === '/haulage' || url === '/services' || url === '/booking' || url === '/contact') return '0.9';
    if (url === '/sales' || url === '/rental' || url === '/repairs' || url === '/parts' || url === '/blog' || url === '/service-areas') return '0.85';
    if (url.startsWith('/sales/') || url.startsWith('/parts/') || url.startsWith('/blog/')) return '0.8';
    if (url.startsWith('/service-areas/')) return '0.7';
    if (url === '/sitemap') return '0.6';
    return '0.5';
  };

  const getChangeFreq = (url: string) => {
    if (url === '/' || url === '/towing' || url === '/haulage') return 'daily';
    if (url === '/sales' || url === '/rental' || url === '/blog' || url === '/parts') return 'weekly';
    if (url.startsWith('/blog/')) return 'weekly';
    return 'monthly';
  };

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${getChangeFreq(url)}</changefreq>
    <priority>${getPriority(url)}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapContent);
  console.log(`Sitemap generated successfully at public/sitemap.xml with ${urls.length} verified URLs.`);
}

generateSitemap();
