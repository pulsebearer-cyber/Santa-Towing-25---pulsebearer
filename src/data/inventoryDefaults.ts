/**
 * Santa Towing - Inventory Data Defaults & Type Definitions
 * 
 * Provides default datasets and TypeScript contracts for:
 * 1. Cars for Sale
 * 2. Rentals
 * 3. Parts
 * 4. Gallery
 * 5. FAQs
 * 6. Careers
 * 
 * All items are stored in contentStorage under `inventory.*` keys.
 * When no edits exist, the application seamlessly defaults to these exact arrays.
 */

export interface ImageItem {
  url: string;
  alt: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export function generateSlug(text: string): string {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// ----------------------------------------------------------------------
// 1. CARS FOR SALE
// ----------------------------------------------------------------------
export type CarCondition = 'New' | 'Foreign Used' | 'Ghana Used';
export type CarStatus = 'Available' | 'Sold' | 'Reserved' | 'Coming Soon';

export interface InventoryCar {
  id: string | number;
  slug: string;
  name: string;
  type: CarCondition;
  price: string;
  year: number;
  fuel: string;
  transmission: string;
  mileage: string;
  image: string;
  images: ImageItem[];
  status: CarStatus;
  hidden?: boolean;
  order?: number;
  description?: string;
  specs?: {
    engine?: SpecItem[];
    performance?: SpecItem[];
    dimensions?: SpecItem[];
    features?: string[];
  };
  seoTitle?: string;
  seoDescription?: string;
}

export const DEFAULT_CARS: InventoryCar[] = [
  // New Cars
  {
    id: 1,
    slug: '2024-luxury-sedan',
    name: '2024 Luxury Sedan',
    type: 'New',
    price: 'GH₵ 540,000',
    year: 2024,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    mileage: '0 km',
    image: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg',
    images: [
      { url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', alt: '2024 Luxury Sedan Front Angle' },
      { url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg', alt: '2024 Luxury Sedan Side Profile' },
      { url: 'https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg', alt: 'Engine Bay Inspection' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Pristine 2024 luxury hybrid sedan offering outstanding fuel efficiency, refined executive leather comfort, and intelligent driver assist technologies tuned for Ghana roads.',
    specs: {
      engine: [
        { label: 'Engine Capacity', value: '2.0L Hybrid 4-Cylinder' },
        { label: 'Horsepower', value: '208 hp @ 5,700 rpm' },
        { label: 'Fuel System', value: 'Direct Multi-Point Injection' }
      ],
      performance: [
        { label: 'Acceleration (0-100 km/h)', value: '7.2 seconds' },
        { label: 'Transmission', value: 'Electronic Continuously Variable (e-CVT)' },
        { label: 'Drivetrain', value: 'Front-Wheel Drive (FWD)' }
      ],
      dimensions: [
        { label: 'Seating Capacity', value: '5 Passengers' },
        { label: 'Fuel Tank', value: '50 Litres' }
      ],
      features: [
        'Apple CarPlay & Android Auto',
        'Adaptive Radar Cruise Control',
        'Wireless Phone Charging Pad',
        'Dual-Zone Climate Control'
      ]
    },
    seoTitle: '2024 Luxury Sedan for Sale | Santa Towing Ghana',
    seoDescription: 'Buy brand new 2024 Luxury Sedan in Ghana. Price: GH₵ 540,000. Verified 150-point inspection and warranty at Santa Towing.'
  },
  {
    id: 2,
    slug: '2024-premium-suv',
    name: '2024 Premium SUV',
    type: 'New',
    price: 'GH₵ 780,000',
    year: 2024,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '25 km',
    image: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png',
    images: [
      { url: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png', alt: '2024 Premium SUV Front' },
      { url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', alt: 'Interior Showcase' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Versatile, high-ground-clearance compact luxury SUV featuring panoramic moonroof, AWD all-weather traction, and premium digital cockpit.',
    specs: {
      engine: [
        { label: 'Engine Capacity', value: '2.5L 4-Cylinder Turbo' },
        { label: 'Horsepower', value: '187 hp @ 6,100 rpm' }
      ],
      performance: [
        { label: 'Drivetrain', value: 'All-Wheel Drive (AWD)' },
        { label: 'Transmission', value: '8-Speed Automatic' }
      ],
      features: [
        'Panoramic Power Sunroof',
        'Heated Front Seats',
        'Surround 360-degree Parking Cameras'
      ]
    },
    seoTitle: '2024 Premium SUV for Sale in Accra | Santa Towing',
    seoDescription: 'Brand new 2024 Premium SUV available now with full GRA port customs clearance and 3-month mechanical guarantee.'
  },
  {
    id: 3,
    slug: '2024-executive-pickup',
    name: '2024 Executive Pickup',
    type: 'New',
    price: 'GH₵ 620,000',
    year: 2024,
    fuel: 'Diesel',
    transmission: 'Automatic',
    mileage: '15 km',
    image: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg',
    images: [
      { url: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg', alt: '2024 Executive Pickup Side View' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Heavy duty, go-anywhere dual-cab 4x4 pickup engineered for tough construction sites, mining routes, and executive comfort.',
    specs: {
      engine: [{ label: 'Engine Capacity', value: '2.8L Turbo Diesel' }],
      performance: [{ label: 'Drivetrain', value: 'Selectable 4WD with Rear Diff Lock' }],
      features: ['Heavy Duty Tow Hook Package', 'Leather Seats', 'Touchscreen Navigation']
    },
    seoTitle: '2024 Executive 4x4 Pickup for Sale | Santa Towing',
    seoDescription: 'Brand new 2024 4x4 turbo diesel pickup truck in Ghana. Heavy duty reliability guaranteed.'
  },
  {
    id: 4,
    slug: '2024-passenger-van',
    name: '2024 Passenger Van',
    type: 'New',
    price: 'GH₵ 690,000',
    year: 2024,
    fuel: 'Diesel',
    transmission: 'Manual',
    mileage: '40 km',
    image: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg',
    images: [
      { url: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg', alt: '2024 Passenger Van 12 Seater' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Spacious 12-passenger transport van ideal for corporate shuttles, tour operators, and airport transit operations.',
    seoTitle: '2024 12-Seater Passenger Van for Sale | Santa Towing',
    seoDescription: 'Brand new 12-seater commercial passenger van with cold dual A/C and high-roof cabin.'
  },

  // Foreign Used Cars
  {
    id: 5,
    slug: '2020-midsize-sedan',
    name: '2020 Midsize Sedan',
    type: 'Foreign Used',
    price: 'GH₵ 264,000',
    year: 2020,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '72,000 km',
    image: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg',
    images: [
      { url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', alt: '2020 Midsize Sedan' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Freshly imported foreign-used sedan in mint condition. Low mileage, zero accident history, and ice-cold air conditioning.',
    seoTitle: '2020 Midsize Sedan Foreign Used | Santa Towing',
    seoDescription: 'Clean foreign used 2020 Sedan. Inspected and registered at Tema Port with genuine documentation.'
  },
  {
    id: 6,
    slug: '2019-luxury-suv',
    name: '2019 Luxury SUV',
    type: 'Foreign Used',
    price: 'GH₵ 450,000',
    year: 2019,
    fuel: 'Diesel',
    transmission: 'Automatic',
    mileage: '65,000 km',
    image: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png',
    images: [
      { url: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png', alt: '2019 Luxury SUV Exterior' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Executive family SUV with full leather interior, premium sound system, and verified service logbook.',
    seoTitle: '2019 Luxury SUV Foreign Used Ghana | Santa Towing',
    seoDescription: 'Foreign used luxury SUV in Accra. GH₵ 450,000 with flexible bank financing available.'
  },
  {
    id: 7,
    slug: '2021-premium-hatchback',
    name: '2021 Premium Hatchback',
    type: 'Foreign Used',
    price: 'GH₵ 210,000',
    year: 2021,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '48,000 km',
    image: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg',
    images: [
      { url: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg', alt: '2021 Premium Hatchback' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Economical city commuter hatchback with ultra-low fuel consumption, modern infotainment, and easy parking footprint.',
    seoTitle: '2021 Premium Hatchback Foreign Used | Santa Towing',
    seoDescription: 'Compact and fuel-efficient foreign used hatchback. Ideal for daily commuting in Accra and Kumasi.'
  },
  {
    id: 8,
    slug: '2018-heavy-duty-pickup',
    name: '2018 Heavy Duty Pickup',
    type: 'Foreign Used',
    price: 'GH₵ 340,000',
    year: 2018,
    fuel: 'Diesel',
    transmission: 'Manual',
    mileage: '92,000 km',
    image: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg',
    images: [
      { url: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg', alt: '2018 Heavy Duty Pickup Truck' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Rugged 4WD workhorse pickup truck with reinforced chassis and cargo bed liner. Work-ready immediately.',
    seoTitle: '2018 Heavy Duty Pickup Truck Foreign Used | Santa Towing',
    seoDescription: 'Reliable 4WD turbo diesel pickup truck for business and commercial haulage.'
  },

  // Ghana Used Cars
  {
    id: 9,
    slug: '2018-compact-hatchback',
    name: '2018 Compact Hatchback',
    type: 'Ghana Used',
    price: 'GH₵ 144,000',
    year: 2018,
    fuel: 'Petrol',
    transmission: 'Manual',
    mileage: '136,000 km',
    image: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg',
    images: [
      { url: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg', alt: '2018 Compact Hatchback Ghana Used' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Single owner registered car in Ghana. Well maintained with regular service records at Santa Towing workshop.',
    seoTitle: '2018 Compact Hatchback Ghana Used | Santa Towing',
    seoDescription: 'Affordable registered used hatchback with clean title and verified roadworthiness.'
  },
  {
    id: 10,
    slug: '2015-family-suv',
    name: '2015 Family SUV',
    type: 'Ghana Used',
    price: 'GH₵ 185,000',
    year: 2015,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '185,000 km',
    image: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png',
    images: [
      { url: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png', alt: '2015 Family SUV' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Comfortable 7-seater family SUV with working air conditioning, sound engine, and smooth transmission shifting.',
    seoTitle: '2015 Family SUV Ghana Used | Santa Towing',
    seoDescription: 'Spacious family SUV with clean interior and affordable maintenance parts available in Ghana.'
  },
  {
    id: 11,
    slug: '2017-commuter-sedan',
    name: '2017 Commuter Sedan',
    type: 'Ghana Used',
    price: 'GH₵ 120,000',
    year: 2017,
    fuel: 'Petrol',
    transmission: 'Manual',
    mileage: '162,000 km',
    image: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg',
    images: [
      { url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', alt: '2017 Commuter Sedan' }
    ],
    status: 'Available',
    hidden: false,
    description: 'High reliability commuter vehicle. Excellent mechanical condition and very economical to run daily.',
    seoTitle: '2017 Commuter Sedan Ghana Used | Santa Towing',
    seoDescription: 'Quality inspected Ghana used sedan priced affordably at GH₵ 120,000.'
  },
  {
    id: 12,
    slug: '2014-utility-pickup',
    name: '2014 Utility Pickup',
    type: 'Ghana Used',
    price: 'GH₵ 165,000',
    year: 2014,
    fuel: 'Diesel',
    transmission: 'Manual',
    mileage: '210,000 km',
    image: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg',
    images: [
      { url: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg', alt: '2014 Utility Pickup' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Durable commercial diesel utility truck. Engine recently overhauled with warranty.',
    seoTitle: '2014 Utility Diesel Pickup Ghana Used | Santa Towing',
    seoDescription: 'Workhorse utility pickup truck ready for immediate commercial operations.'
  }
];

// ----------------------------------------------------------------------
// 2. RENTALS
// ----------------------------------------------------------------------
export type RentalStatus = 'Available' | 'Rented' | 'Maintenance' | 'Reserved';

export interface InventoryRental {
  id: string | number;
  slug: string;
  categorySlug: string;
  name: string;
  type: string;
  category: string;
  price: string;
  daily: string;
  weekly: string;
  monthly: string;
  seats: string | number;
  transmission: string;
  trans?: string;
  fuel: string;
  image: string;
  images: ImageItem[];
  status: RentalStatus;
  hidden?: boolean;
  order?: number;
  description?: string;
  features?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export const DEFAULT_RENTALS: InventoryRental[] = [
  {
    id: 1,
    slug: 'corolla-sedan',
    categorySlug: 'sedan',
    name: 'Toyota Corolla 2023',
    type: 'Sedan',
    category: 'Sedan',
    price: 'GH₵ 600 / day',
    daily: 'GH₵ 600',
    weekly: 'GH₵ 3,800',
    monthly: 'GH₵ 14,000',
    seats: 5,
    transmission: 'Automatic',
    trans: 'Automatic',
    fuel: 'Petrol',
    image: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg',
    images: [
      { url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', alt: 'Toyota Corolla 2023 Rental Front' },
      { url: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg', alt: 'Interior Comfort' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Reliable, fuel-efficient modern sedan ideal for executive airport pickups, business meetings, and city commuting in Accra.',
    features: [
      'Comprehensive Fleet Insurance Coverage',
      'Unlimited Mileage in Greater Accra',
      'Chauffeur Available on Request',
      'Bluetooth & USB Charging'
    ],
    seoTitle: 'Toyota Corolla 2023 Rental in Ghana | Santa Towing Car Hire',
    seoDescription: 'Rent Toyota Corolla in Accra from GH₵ 600/day. Self-drive and chauffeur options with 24/7 breakdown support.'
  },
  {
    id: 2,
    slug: 'sportage-suv',
    categorySlug: 'suv',
    name: 'Kia Sportage 2024',
    type: 'SUV',
    category: 'SUV',
    price: 'GH₵ 900 / day',
    daily: 'GH₵ 900',
    weekly: 'GH₵ 5,800',
    monthly: 'GH₵ 21,000',
    seats: 5,
    transmission: 'Automatic',
    trans: 'Automatic',
    fuel: 'Petrol',
    image: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png',
    images: [
      { url: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png', alt: 'Kia Sportage 2024 SUV' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Spacious all-wheel drive SUV with premium comfort, high clearance, and ample boot space for family travel across Ghana.',
    features: [
      'All-Wheel Drive Performance',
      'Panoramic Roof & Dual Climate Control',
      'Full Comprehensive Insurance',
      'Complimentary Child Seat upon request'
    ],
    seoTitle: 'Kia Sportage 2024 SUV Rental Ghana | Santa Towing',
    seoDescription: 'Premium SUV hire in Accra & Kumasi. Reliable AWD comfort for travel across Ghana.'
  },
  {
    id: 3,
    slug: 'hilux-pickup',
    categorySlug: 'pickup',
    name: 'Toyota Hilux 2023 4x4',
    type: 'Pickup',
    category: 'Pickup',
    price: 'GH₵ 800 / day',
    daily: 'GH₵ 800',
    weekly: 'GH₵ 5,000',
    monthly: 'GH₵ 18,000',
    seats: 5,
    transmission: 'Automatic',
    trans: 'Automatic',
    fuel: 'Diesel',
    image: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg',
    images: [
      { url: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg', alt: 'Toyota Hilux 4x4 Pickup' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Rugged four-wheel drive double cabin pickup truck specifically suited for rugged terrains, mining sites, and cross-country expeditions.',
    features: [
      'Heavy Duty 4x4 Off-Road Drive',
      'Spacious Cargo Bed with Tie-Down Points',
      'Corporate Long-Term Discount Rates'
    ],
    seoTitle: 'Toyota Hilux 4x4 Rental Ghana | Santa Towing',
    seoDescription: 'Rent Toyota Hilux 4x4 pickup in Accra. High durability for construction and remote terrain travel.'
  },
  {
    id: 4,
    slug: 'mercedes-luxury',
    categorySlug: 'luxury',
    name: 'Mercedes-Benz E-Class',
    type: 'Luxury',
    category: 'Luxury',
    price: 'GH₵ 1,500 / day',
    daily: 'GH₵ 1,500',
    weekly: 'GH₵ 9,500',
    monthly: 'GH₵ 35,000',
    seats: 5,
    transmission: 'Automatic',
    trans: 'Automatic',
    fuel: 'Premium Petrol',
    image: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg',
    images: [
      { url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg', alt: 'Mercedes-Benz E-Class Luxury Rental' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Executive VIP transportation and wedding luxury sedan with uniformed chauffeur service and VIP airport escort.',
    features: [
      'Professional Uniformed Chauffeur Included',
      'Burmester Premium Surround Sound',
      'Executive Rear Climate Control & Sunshades'
    ],
    seoTitle: 'Mercedes-Benz Luxury Car Rental Accra | Santa Towing',
    seoDescription: 'Executive VIP Mercedes rental for weddings, summits, and diplomatic travel in Ghana.'
  },
  {
    id: 5,
    slug: 'hyundai-van',
    categorySlug: 'van',
    name: 'Hyundai H1 Executive Bus',
    type: 'Van',
    category: 'Van',
    price: 'GH₵ 1,100 / day',
    daily: 'GH₵ 1,100',
    weekly: 'GH₵ 7,000',
    monthly: 'GH₵ 25,000',
    seats: 12,
    transmission: 'Manual',
    trans: 'Manual',
    fuel: 'Diesel',
    image: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg',
    images: [
      { url: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg', alt: 'Hyundai H1 12-Seater Executive Van' }
    ],
    status: 'Available',
    hidden: false,
    description: '12-passenger minibus ideal for corporate delegates, tourist groups, event transport, and family trips.',
    features: [
      'Comfortable 12-Passenger High-Roof Seating',
      'Powerful Front & Rear Cabin Air Conditioning',
      'Spacious Rear Luggage Compartment'
    ],
    seoTitle: '12-Seater Van Rental in Accra | Santa Towing Bus Hire',
    seoDescription: 'Spacious 12-seater passenger van rental for corporate groups and family events in Ghana.'
  },
  {
    id: 6,
    slug: 'nissan-economy',
    categorySlug: 'economy',
    name: 'Nissan Almera 2021',
    type: 'Economy',
    category: 'Economy',
    price: 'GH₵ 400 / day',
    daily: 'GH₵ 400',
    weekly: 'GH₵ 2,500',
    monthly: 'GH₵ 9,000',
    seats: 4,
    transmission: 'Automatic',
    trans: 'Automatic',
    fuel: 'Petrol',
    image: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg',
    images: [
      { url: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg', alt: 'Nissan Almera Economy Car' }
    ],
    status: 'Available',
    hidden: false,
    description: 'Budget-friendly economy sedan with low fuel consumption and great reliability for everyday city driving.',
    features: [
      'Affordable Daily & Weekly Rates',
      'Low Fuel Consumption',
      'Clean Interior with Strong Air Conditioning'
    ],
    seoTitle: 'Affordable Economy Car Rental Accra | Santa Towing',
    seoDescription: 'Rent Nissan Almera from GH₵ 400 per day. Clean, budget-friendly car hire in Accra.'
  }
];

// ----------------------------------------------------------------------
// 3. AUTO PARTS
// ----------------------------------------------------------------------
export type PartStatus = 'In Stock' | 'Out of Stock' | 'Low Stock';

export interface InventoryPart {
  id: string | number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  status: PartStatus;
  sku: string;
  image?: string;
  images: ImageItem[];
  specs: SpecItem[];
  compatibility: string;
  warranty: string;
  installation: string;
  description?: string;
  hidden?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export const DEFAULT_PARTS: InventoryPart[] = [
  {
    id: 1,
    slug: 'premium-heavy-duty-battery-70ah',
    name: 'Premium Heavy Duty Battery 70Ah',
    brand: 'Bosch',
    category: 'Car Batteries',
    price: 'GH₵ 850',
    rating: 5.0,
    reviews: 124,
    inStock: true,
    status: 'In Stock',
    sku: 'BSH-70AH-HD',
    image: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg',
    images: [
      { url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg', alt: 'Bosch 70Ah Heavy Duty Battery' },
      { url: 'https://i.ibb.co/23wLXy6t/Image-12-Tyre-Maintenance.jpg', alt: 'Battery Maintenance' },
      { url: 'https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg', alt: 'Engine Bay Fitment' }
    ],
    specs: [
      { label: 'Voltage', value: '12V' },
      { label: 'Capacity', value: '70Ah' },
      { label: 'CCA', value: '760A' },
      { label: 'Terminal Type', value: 'Standard Post' },
      { label: 'Dimensions', value: '278 x 175 x 190 mm' },
      { label: 'Weight', value: '18.5 kg' }
    ],
    compatibility: 'Fits most modern sedans and mid-sized SUVs. Specifically designed for cars with start-stop technology and high electrical demands.',
    warranty: '24-Month Nationwide Replacement Warranty.',
    installation: 'Professional installation recommended. Memory saver tool required during replacement to prevent loss of car settings.',
    description: 'High-performance maintenance-free lead-acid battery engineered with heavy-duty grids for tropical heat resistance and fast recharging.',
    seoTitle: 'Bosch 70Ah Heavy Duty Battery Ghana | Santa Towing Auto Parts',
    seoDescription: 'Buy genuine Bosch 70Ah 12V Car Battery in Accra. 24-month replacement warranty and on-site testing available.'
  },
  {
    id: 2,
    slug: 'synthetic-motor-oil-5w-30-5l',
    name: 'Synthetic Motor Oil 5W-30 (5L)',
    brand: 'Castrol',
    category: 'Engine Oil & Fluids',
    price: 'GH₵ 420',
    rating: 4.8,
    reviews: 98,
    inStock: true,
    status: 'In Stock',
    sku: 'CST-5W30-5L',
    image: 'https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg',
    images: [
      { url: 'https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg', alt: 'Castrol 5W-30 Synthetic Motor Oil Bottle' },
      { url: 'https://i.ibb.co/qV5D1J9/Image-13-Filters-maintenance.jpg', alt: 'Oil and Filter Kit' }
    ],
    specs: [
      { label: 'Viscosity Grade', value: 'SAE 5W-30' },
      { label: 'Volume', value: '5 Litres' },
      { label: 'Oil Type', value: '100% Full Synthetic' },
      { label: 'API Standards', value: 'API SP / ILSAC GF-6A' },
      { label: 'Drain Interval', value: 'Up to 10,000 km' }
    ],
    compatibility: 'Formulated for high thermal stability in tropical climates. Suitable for modern Japanese, European, and American passenger cars.',
    warranty: '100% Genuine OEM Sealed Bottle Guarantee.',
    installation: 'Always replace the oil filter during an engine oil service for optimal engine longevity.',
    description: 'Advanced full synthetic engine lubricant providing extreme wear protection, cleaner pistons, and superior fuel economy.',
    seoTitle: 'Castrol 5W-30 Synthetic Motor Oil 5L Ghana | Santa Towing',
    seoDescription: 'Original Castrol Edge 5W-30 synthetic motor oil. Genuine sealed stock with prompt delivery across Ghana.'
  },
  {
    id: 3,
    slug: 'ceramic-brake-pads-front',
    name: 'Ceramic Brake Pads (Front)',
    brand: 'Brembo',
    category: 'Brake Pads & Discs',
    price: 'GH₵ 650',
    rating: 4.9,
    reviews: 86,
    inStock: true,
    status: 'In Stock',
    sku: 'BRM-CER-FR',
    image: 'https://i.ibb.co/JRyRmbjF/Image-11-Brake-Parts-and-Disk-Maintenance.jpg',
    images: [
      { url: 'https://i.ibb.co/JRyRmbjF/Image-11-Brake-Parts-and-Disk-Maintenance.jpg', alt: 'Brembo Ceramic Front Brake Pads' },
      { url: 'https://i.ibb.co/35NfN5Lx/Image-14-Suspension-Parts-maintenance.jpg', alt: 'Brake Assembly' }
    ],
    specs: [
      { label: 'Material', value: 'Premium Low-Dust Ceramic' },
      { label: 'Axle Placement', value: 'Front Axle (Left & Right)' },
      { label: 'Operating Temp', value: 'Up to 650°C Fade Resistance' },
      { label: 'Certification', value: 'ECE R90 Certified' }
    ],
    compatibility: 'Engineered for smooth stopping power, zero brake squeal, and ultra-low brake dust generation.',
    warranty: '12-Month or 20,000 km Performance Warranty.',
    installation: 'Ensure brake rotors are resurfaced or checked for runout prior to pad installation.',
    description: 'Ultra-quiet ceramic friction formulation offering exceptional pedal feel, heat resistance, and long rotor life.',
    seoTitle: 'Brembo Ceramic Brake Pads Front Set | Santa Towing Parts',
    seoDescription: 'Genuine Brembo ceramic front brake pads. Low dust, zero squeal, and high temperature fade resistance.'
  },
  {
    id: 4,
    slug: 'all-season-tire-205-55r16',
    name: 'All-Season Tire 205/55R16',
    brand: 'Michelin',
    category: 'Tires',
    price: 'GH₵ 1,200',
    rating: 5.0,
    reviews: 142,
    inStock: true,
    status: 'In Stock',
    sku: 'MCH-205-55-16',
    image: 'https://i.ibb.co/23wLXy6t/Image-12-Tyre-Maintenance.jpg',
    images: [
      { url: 'https://i.ibb.co/23wLXy6t/Image-12-Tyre-Maintenance.jpg', alt: 'Michelin 205/55R16 Tire Tread' },
      { url: 'https://i.ibb.co/35NfN5Lx/Image-14-Suspension-Parts-maintenance.jpg', alt: 'Wheel Fitment' }
    ],
    specs: [
      { label: 'Size', value: '205/55R16' },
      { label: 'Load Index', value: '91 (615 kg max load)' },
      { label: 'Speed Rating', value: 'V (240 km/h max)' },
      { label: 'Season', value: 'All-Season Highway Performance' }
    ],
    compatibility: 'Direct OEM fitment for Toyota Corolla, Honda Civic, Hyundai Elantra, VW Golf, and similar passenger sedans.',
    warranty: '5-Year Manufacturer Tread Life Warranty.',
    installation: 'Computerized wheel balancing and new valve stems provided upon fitting at our garage.',
    description: 'Premium highway touring tire engineered for wet road braking grip, long tread life, and low road noise.',
    seoTitle: 'Michelin 205/55R16 All-Season Tire Ghana | Santa Towing',
    seoDescription: 'High quality Michelin 205/55R16 tires in Accra with professional fitting and computerized wheel balancing.'
  },
  {
    id: 5,
    slug: 'engine-air-filter',
    name: 'Engine Air Filter',
    brand: 'K&N',
    category: 'Filters',
    price: 'GH₵ 350',
    rating: 4.7,
    reviews: 64,
    inStock: true,
    status: 'In Stock',
    sku: 'KN-AIR-FLTR',
    image: 'https://i.ibb.co/qV5D1J9/Image-13-Filters-maintenance.jpg',
    images: [
      { url: 'https://i.ibb.co/qV5D1J9/Image-13-Filters-maintenance.jpg', alt: 'High Performance Engine Air Filter' },
      { url: 'https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg', alt: 'Air Intake Box' }
    ],
    specs: [
      { label: 'Filter Media', value: 'Multi-layer Cotton Gauze' },
      { label: 'Filtration Efficiency', value: '99% Dust & Particulate Capture' },
      { label: 'Washable / Reusable', value: 'Yes (Wash & Re-oil)' }
    ],
    compatibility: 'Drops directly into OEM factory air boxes without modifications.',
    warranty: '1,000,000 Mile Limited Warranty.',
    installation: 'Simple 5-minute toolless DIY installation.',
    description: 'Reusable high-flow performance air filter designed to increase horsepower and protect engine internals from dust.',
    seoTitle: 'K&N Performance Engine Air Filter Ghana | Santa Towing',
    seoDescription: 'Washable high flow performance air filter for optimal engine horsepower and filtration in dusty environments.'
  },
  {
    id: 6,
    slug: 'led-headlight-bulbs-h7-pair',
    name: 'LED Headlight Bulbs H7 (Pair)',
    brand: 'Philips',
    category: 'Lighting',
    price: 'GH₵ 550',
    rating: 4.6,
    reviews: 53,
    inStock: true,
    status: 'In Stock',
    sku: 'PHL-LED-H7',
    image: 'https://i.ibb.co/WpyLYZQk/Image-15-Car-Lightening-maintenance.jpg',
    images: [
      { url: 'https://i.ibb.co/WpyLYZQk/Image-15-Car-Lightening-maintenance.jpg', alt: 'Philips H7 LED Headlight Bulbs' },
      { url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg', alt: 'Night Illumination Beam' }
    ],
    specs: [
      { label: 'Bulb Base', value: 'H7 Standard Socket' },
      { label: 'Color Temperature', value: '6000K Crisp Cool White' },
      { label: 'Luminous Output', value: '8,000 Lumens / Set' },
      { label: 'Lifespan', value: '30,000+ Hours' }
    ],
    compatibility: 'Plug-and-play replacement for factory halogen H7 low beam or high beam sockets with CANBus error-free drivers.',
    warranty: '2-Year Replacement Warranty.',
    installation: 'Ensure beam pattern is properly leveled to avoid blinding oncoming traffic.',
    description: 'High-output LED headlight conversion kit providing daylight white illumination, instant startup, and sharp cutoff.',
    seoTitle: 'Philips H7 LED Headlight Conversion Kit Ghana | Santa Towing',
    seoDescription: 'Upgrade your vehicle lighting with genuine Philips 6000K H7 LED bulbs. High beam visibility for night driving.'
  }
];

// ----------------------------------------------------------------------
// 4. GALLERY
// ----------------------------------------------------------------------
export type GalleryStatus = 'Published' | 'Draft';

export interface InventoryGalleryItem {
  id: string | number;
  slug: string;
  category: string;
  url: string;
  title: string;
  alt?: string;
  span?: string;
  description?: string;
  status: GalleryStatus;
  hidden?: boolean;
  order?: number;
  images?: ImageItem[];
  seoTitle?: string;
  seoDescription?: string;
}

export const DEFAULT_GALLERY: InventoryGalleryItem[] = [
  {
    id: 1,
    slug: 'diagnostic-bay',
    category: 'Workshop',
    url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg',
    title: 'State-of-the-art diagnostic bay',
    alt: 'Computerized automotive diagnostic bay in Accra',
    span: 'col-span-1 row-span-2',
    description: 'Advanced electronic diagnostic equipment used by certified mechanics to scan automotive engine, ABS, and transmission modules.',
    status: 'Published',
    hidden: false,
    images: [
      { url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', alt: 'Diagnostic bay' }
    ]
  },
  {
    id: 2,
    slug: 'heavy-duty-recovery-vehicle',
    category: 'Towing Fleet',
    url: 'https://i.ibb.co/0RDWpXBh/Image-8-Heavy-Duty-Recovery-Vehicle-or-Car.jpg',
    title: 'Heavy-duty recovery vehicle',
    alt: 'Heavy duty tow truck on highway recovery',
    span: 'col-span-2 row-span-1',
    description: 'Hydraulic heavy recovery boom unit rescuing commercial trucks and haulage trailers across inter-city highways.',
    status: 'Published',
    hidden: false,
    images: [
      { url: 'https://i.ibb.co/0RDWpXBh/Image-8-Heavy-Duty-Recovery-Vehicle-or-Car.jpg', alt: 'Heavy recovery vehicle' }
    ]
  },
  {
    id: 3,
    slug: 'expert-mechanics-team',
    category: 'Team & Facilities',
    url: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg',
    title: 'Our expert mechanics',
    alt: 'Santa Towing certified mechanical team in workshop',
    span: 'col-span-1 row-span-1',
    description: 'Certified automotive technicians conducting precision inspections and scheduled maintenance.',
    status: 'Published',
    hidden: false,
    images: [
      { url: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg', alt: 'Our expert mechanics' }
    ]
  },
  {
    id: 4,
    slug: 'premium-pre-owned-inventory',
    category: 'Car Sales',
    url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg',
    title: 'Premium pre-owned inventory',
    alt: 'Luxury car lineup at showroom',
    span: 'col-span-1 row-span-1',
    description: 'Executive vehicle fleet prepared for handover after passing 150-point technical check.',
    status: 'Published',
    hidden: false,
    images: [
      { url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg', alt: 'Showroom vehicle' }
    ]
  },
  {
    id: 5,
    slug: 'luxury-suv-rentals',
    category: 'Rental Fleet',
    url: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png',
    title: 'Luxury SUV rentals',
    alt: 'All-wheel drive rental SUV ready for customer pickup',
    span: 'col-span-1 row-span-2',
    description: 'Cleaned and sanitized rental fleet ready for self-drive and chauffeur trips.',
    status: 'Published',
    hidden: false,
    images: [
      { url: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png', alt: 'Luxury SUV rentals' }
    ]
  },
  {
    id: 6,
    slug: 'custom-paint-spray-booth',
    category: 'Body Works',
    url: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg',
    title: 'Custom paint job',
    alt: 'Dust-free oven-baked automotive spray booth finish',
    span: 'col-span-2 row-span-2',
    description: 'Factory-spec computerized paint mixing and oven-baked clear coat finish.',
    status: 'Published',
    hidden: false,
    images: [
      { url: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg', alt: 'Custom paint job' }
    ]
  },
  {
    id: 7,
    slug: 'engine-overhaul',
    category: 'Workshop',
    url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg',
    title: 'Engine overhaul in progress',
    alt: 'Certified master technicians rebuilding engine',
    span: 'col-span-1 row-span-1',
    description: 'Complete mechanical engine refurbishment using OEM replacement components.',
    status: 'Published',
    hidden: false,
    images: [
      { url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg', alt: 'Engine overhaul' }
    ]
  },
  {
    id: 8,
    slug: 'flatbed-towing-operation',
    category: 'Towing Fleet',
    url: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg',
    title: 'City-wide flatbed towing',
    alt: 'Hydraulic tilt flatbed towing vehicle in Accra',
    span: 'col-span-1 row-span-1',
    description: 'Rapid emergency response flatbed carrier dispatch in Accra and Tema.',
    status: 'Published',
    hidden: false,
    images: [
      { url: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg', alt: 'City-wide flatbed towing' }
    ]
  }
];

// ----------------------------------------------------------------------
// 5. FAQS
// ----------------------------------------------------------------------
export type FaqStatus = 'Published' | 'Draft';

export interface InventoryFaq {
  id: string | number;
  slug?: string;
  category: string;
  q: string;
  a: string;
  status: FaqStatus;
  hidden?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export const DEFAULT_FAQS: InventoryFaq[] = [
  // Towing
  {
    id: 1,
    slug: 'emergency-response-time',
    category: 'Towing',
    q: 'What is your average response time for emergency towing?',
    a: 'Within the Greater Accra and Ashanti regions, we guarantee a response time of 30-45 minutes. For areas outside major city limits, response times may vary depending on distance and highway traffic conditions.',
    status: 'Published',
    hidden: false
  },
  {
    id: 2,
    slug: 'service-coverage-areas',
    category: 'Towing',
    q: 'What areas do your towing services cover?',
    a: 'We offer nationwide coverage across all 16 regions of Ghana through our owned fleet and vetted partner network, with primary rapid-response zones in Accra, Tema, Kumasi, and Takoradi.',
    status: 'Published',
    hidden: false
  },
  {
    id: 3,
    slug: 'standard-towing-cost',
    category: 'Towing',
    q: 'How much does a standard tow cost?',
    a: 'Towing costs depend on the distance and the type of vehicle. Our base rate starts at GH₵ 250 within city limits. We provide upfront, transparent pricing before dispatching a truck.',
    status: 'Published',
    hidden: false
  },
  {
    id: 4,
    slug: 'insurance-direct-billing',
    category: 'Towing',
    q: 'Do you work with insurance companies?',
    a: 'Yes, we are approved by most major insurance providers in Ghana. If you have roadside assistance coverage, we can often bill your insurance directly.',
    status: 'Published',
    hidden: false
  },
  {
    id: 5,
    slug: 'lowered-modified-cars',
    category: 'Towing',
    q: 'Can you tow lowered or modified cars?',
    a: 'Absolutely. We operate hydraulic flatbed tow trucks equipped with low-angle ramps specifically designed to safely transport modified, sports, or lowered luxury cars without bumper damage.',
    status: 'Published',
    hidden: false
  },

  // Rentals
  {
    id: 6,
    slug: 'rental-eligibility-requirements',
    category: 'Rentals',
    q: 'What are the eligibility requirements to rent a car?',
    a: 'You must be at least 21 years old (25 for luxury or SUV classes), possess a valid Ghanaian driver’s license or an International Driving Permit, and provide a valid ID and security deposit.',
    status: 'Published',
    hidden: false
  },
  {
    id: 7,
    slug: 'security-deposit-policy',
    category: 'Rentals',
    q: 'Is a security deposit required for rentals?',
    a: 'Yes, a refundable security deposit is required for all rentals. The amount varies based on the vehicle category and is refunded within 3-5 business days after return in good order.',
    status: 'Published',
    hidden: false
  },
  {
    id: 8,
    slug: 'rental-cancellation-policy',
    category: 'Rentals',
    q: 'What is your rental cancellation policy?',
    a: 'Cancellations made 48 hours prior to the pickup time are fully refunded. Cancellations within 48 hours may incur a one-day rental charge.',
    status: 'Published',
    hidden: false
  },
  {
    id: 9,
    slug: 'chauffeur-driver-service',
    category: 'Rentals',
    q: 'Can I rent a car with a professional chauffeur?',
    a: 'Yes, we offer chauffeur services for an additional daily fee. All our drivers are professionally trained, vetted, uniformed, and familiar with inter-city travel routes.',
    status: 'Published',
    hidden: false
  },
  {
    id: 10,
    slug: 'rental-mileage-limits',
    category: 'Rentals',
    q: 'Are there mileage limits on rentals?',
    a: 'Most standard rentals come with unlimited mileage within Greater Accra. Cross-country journeys or long-term commercial rentals receive generous daily mileage allowances.',
    status: 'Published',
    hidden: false
  },

  // Repairs
  {
    id: 11,
    slug: 'standard-service-duration',
    category: 'Repairs',
    q: 'How long does a standard vehicle service take?',
    a: 'A routine maintenance service (oil change, filter replacement, fluid top-up, and multipoint inspection) typically takes 1 to 2 hours if you have a scheduled appointment.',
    status: 'Published',
    hidden: false
  },
  {
    id: 12,
    slug: 'repair-warranty-period',
    category: 'Repairs',
    q: 'Do you offer a warranty on mechanical repairs?',
    a: 'Yes, all our mechanical repairs and labor come with a minimum 6-month or 10,000 km warranty. Parts warranties depend on the manufacturer but typically range from 1 to 2 years.',
    status: 'Published',
    hidden: false
  },
  {
    id: 13,
    slug: 'oem-vs-aftermarket-parts',
    category: 'Repairs',
    q: 'Do you use genuine OEM parts for repairs?',
    a: 'We offer the choice between genuine OEM (Original Equipment Manufacturer) parts and high-quality, certified aftermarket alternatives to suit your budget.',
    status: 'Published',
    hidden: false
  },
  {
    id: 14,
    slug: 'loaner-cars-during-service',
    category: 'Repairs',
    q: 'Can I get a loaner car while my car is being repaired?',
    a: 'Loaner cars are available subject to availability and the nature of the repair. Priority is given to fleet partners and customers undergoing major engine overhauls.',
    status: 'Published',
    hidden: false
  },
  {
    id: 15,
    slug: 'computerized-diagnostic-reports',
    category: 'Repairs',
    q: 'Do you provide printed diagnostic reports?',
    a: 'Yes, every computerized diagnostic scan comes with a detailed, easy-to-understand printed or digital report outlining fault codes and recommended solutions.',
    status: 'Published',
    hidden: false
  },

  // Sales
  {
    id: 16,
    slug: 'car-financing-partners',
    category: 'Sales',
    q: 'Do you offer vehicle financing or installment options?',
    a: 'Yes, we partner with leading Ghanaian banks and financial institutions to offer flexible auto loan options with competitive interest rates and terms up to 48 months.',
    status: 'Published',
    hidden: false
  },
  {
    id: 17,
    slug: 'pre-purchase-inspection-process',
    category: 'Sales',
    q: 'Are your used cars inspected before being listed?',
    a: 'Absolutely. Every pre-owned vehicle undergoes a rigorous 150-point mechanical, electrical, and structural inspection before being listed for sale.',
    status: 'Published',
    hidden: false
  },
  {
    id: 18,
    slug: 'trade-in-evaluation',
    category: 'Sales',
    q: 'Can I trade in my current vehicle?',
    a: 'Yes, we accept trade-ins. Bring your car in for a complimentary appraisal, and the value can be applied directly toward your new purchase.',
    status: 'Published',
    hidden: false
  },
  {
    id: 19,
    slug: 'custom-vehicle-importation',
    category: 'Sales',
    q: 'Do you import custom vehicles on request?',
    a: 'Yes, if we don’t have what you’re looking for in stock, we can source, inspect, and import specific makes and models from North America, Europe, or Asia on your behalf.',
    status: 'Published',
    hidden: false
  },
  {
    id: 20,
    slug: 'purchased-car-warranty',
    category: 'Sales',
    q: 'What kind of warranty comes with purchased cars?',
    a: 'Brand new vehicles come with full manufacturer warranty. Certified pre-owned cars include our standard 3-month/5,000 km warranty with optional extended coverage.',
    status: 'Published',
    hidden: false
  },

  // Parts
  {
    id: 21,
    slug: 'vin-parts-compatibility',
    category: 'Parts',
    q: 'How do I know if a spare part is compatible with my car?',
    a: 'You can provide us with your vehicle’s Chassis Number (VIN), and our parts specialists will verify 100% exact compatibility before dispatch.',
    status: 'Published',
    hidden: false
  },
  {
    id: 22,
    slug: 'parts-return-policy',
    category: 'Parts',
    q: 'What is your return policy for auto parts?',
    a: 'Unused, uninstalled parts in their original packaging can be returned within 14 days of purchase with a valid receipt.',
    status: 'Published',
    hidden: false
  },
  {
    id: 23,
    slug: 'parts-nationwide-delivery',
    category: 'Parts',
    q: 'Do you deliver auto parts nationwide?',
    a: 'Yes, we offer same-day delivery within Accra/Tema for orders placed before 12 PM, and reliable 1-2 day courier delivery nationwide.',
    status: 'Published',
    hidden: false
  },
  {
    id: 24,
    slug: 'parts-installation-discount',
    category: 'Parts',
    q: 'Can I buy a part and have your workshop install it?',
    a: 'Certainly. When you purchase parts from our store, our certified garage can install them for you at a discounted workshop labor rate.',
    status: 'Published',
    hidden: false
  },

  // Payments
  {
    id: 25,
    slug: 'accepted-payment-methods',
    category: 'Payments',
    q: 'What payment methods do you accept?',
    a: 'We accept Mobile Money (MTN MoMo, Telecel Cash, AT Money), major credit/debit cards (Visa, Mastercard), direct bank transfers, and cash at our branch counters.',
    status: 'Published',
    hidden: false
  },
  {
    id: 26,
    slug: 'vat-invoicing-compliance',
    category: 'Payments',
    q: 'Can you provide VAT invoices for corporate accounting?',
    a: 'Yes, Santa Towing is a fully incorporated Ghanaian entity and issues official GRA VAT-compliant invoices and electronic receipts.',
    status: 'Published',
    hidden: false
  },

  // Fleet
  {
    id: 27,
    slug: 'minimum-fleet-account-size',
    category: 'Fleet',
    q: 'What is the minimum number of cars for a corporate fleet account?',
    a: 'Our corporate fleet maintenance and towing programs typically cater to 5+ vehicles, with custom packages available for smaller startup fleets.',
    status: 'Published',
    hidden: false
  },
  {
    id: 28,
    slug: 'fleet-partner-discounts',
    category: 'Fleet',
    q: 'Do corporate fleet accounts receive discounted rates?',
    a: 'Yes, corporate partners enjoy dedicated account managers, priority 24/7 dispatch, and volume discounts on routine maintenance, tires, and towing services.',
    status: 'Published',
    hidden: false
  }
];

// ----------------------------------------------------------------------
// 6. CAREERS
// ----------------------------------------------------------------------
export type CareerStatus = 'Open' | 'Closed' | 'Draft';

export interface InventoryCareer {
  id: string | number;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string; // 'Full-time' | 'Part-time' | 'Contract'
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: CareerStatus;
  hidden?: boolean;
  order?: number;
  images?: ImageItem[];
  seoTitle?: string;
  seoDescription?: string;
}

export const DEFAULT_CAREERS: InventoryCareer[] = [
  {
    id: 1,
    slug: 'senior-master-technician',
    title: 'Senior Master Technician',
    department: 'Auto Repair',
    location: 'Accra Main Workshop',
    type: 'Full-time',
    description: 'We are seeking an experienced Senior Master Technician to lead complex diagnostics, engine overhauls, and mentor apprentice mechanics in our modern Accra workshop.',
    responsibilities: [
      'Perform advanced computerized diagnostic tests on modern vehicle electronics.',
      'Lead and mentor junior technicians in mechanical repair best practices.',
      'Ensure all repair work meets strict safety and factory torque standards.',
      'Maintain accurate service records and communicate with service advisors.'
    ],
    requirements: [
      'Minimum 7+ years of professional automotive repair experience.',
      'Advanced diagnostic certifications (e.g. ASE Master certification or equivalent).',
      'Strong leadership and verbal communication skills.',
      'Proficiency with diagnostic scan tools and oscilloscope equipment.'
    ],
    benefits: [
      'Industry-competitive base salary + productivity bonus',
      'Comprehensive health insurance',
      'Tool purchase allowance',
      'Paid annual vacation and sick leave'
    ],
    status: 'Open',
    hidden: false,
    seoTitle: 'Senior Master Technician Job in Accra | Santa Towing Careers',
    seoDescription: 'Join Ghana’s leading automotive team as a Senior Master Technician. Competitive compensation and state-of-the-art facilities.'
  },
  {
    id: 2,
    slug: 'heavy-duty-tow-truck-operator',
    title: 'Heavy Duty Tow Truck Operator',
    department: 'Towing & Recovery',
    location: 'Kumasi Branch',
    type: 'Full-time',
    description: 'Join our rapid response roadside team as a Heavy Duty Tow Truck Operator handling commercial highway breakdowns, winch-outs, and accident recoveries.',
    responsibilities: [
      'Operate heavy-duty hydraulic towing and recovery equipment safely.',
      'Provide calm, professional customer service during stressful breakdown situations.',
      'Perform daily pre-trip vehicle inspections and basic truck maintenance.',
      'Document all towing jobs and comply with national road traffic regulations.'
    ],
    requirements: [
      'Valid heavy-duty commercial driver\'s license (Class F or equivalent).',
      'Clean driving record with minimum 3 years commercial driving experience.',
      'Prior experience in towing or construction equipment operation.',
      'Ability to work flexible shift rotas including nights and weekends.'
    ],
    benefits: [
      'Competitive base wage + overtime allowances',
      'Health insurance coverage',
      'Company uniform and safety gear provided',
      'Continuous defensive driving and winching safety training'
    ],
    status: 'Open',
    hidden: false,
    seoTitle: 'Heavy Duty Tow Truck Operator Vacancy | Santa Towing',
    seoDescription: 'Santa Towing is hiring Heavy Duty Tow Truck Operators in Kumasi and Accra. Competitive pay with overtime benefits.'
  },
  {
    id: 3,
    slug: 'service-advisor',
    title: 'Service Advisor',
    department: 'Customer Support',
    location: 'Accra Main Workshop',
    type: 'Full-time',
    description: 'Act as the primary customer liaison between vehicle owners and our workshop mechanics, translating technical vehicle needs into clear estimates.',
    responsibilities: [
      'Warmly greet service customers and document vehicle symptoms accurately.',
      'Prepare clear repair estimates, parts pricing, and realistic timeframes.',
      'Keep clients proactively updated on repair progress via WhatsApp and phone.',
      'Recommend preventative maintenance services and answer customer questions.'
    ],
    requirements: [
      'Previous experience in automotive customer service or dealership front desk.',
      'Excellent verbal and written English communication skills.',
      'Basic mechanical familiarity with passenger cars.',
      'Proficiency with computer invoicing software.'
    ],
    benefits: [
      'Competitive base salary + commission',
      'Health insurance',
      'Structured career advancement pathways'
    ],
    status: 'Open',
    hidden: false,
    seoTitle: 'Service Advisor Job Vacancy Accra | Santa Towing Careers',
    seoDescription: 'Apply for Service Advisor position at Santa Towing. Dynamic customer service role in the automotive industry.'
  },
  {
    id: 4,
    slug: 'auto-body-painter',
    title: 'Auto Body Painter',
    department: 'Body Works',
    location: 'Tema Facility',
    type: 'Full-time',
    description: 'Bring damaged and restored vehicles back to factory showroom shine as a precision Auto Body Painter in our dust-free spray booth.',
    responsibilities: [
      'Prepare surfaces, sand, mask, and mix primers and topcoats accurately.',
      'Operate spray guns in our climate-controlled bake oven booth.',
      'Inspect final paint finishes for flawless texture, gloss, and color match.',
      'Maintain spray guns, booth filters, and personal protective equipment.'
    ],
    requirements: [
      '3+ years of professional automotive spray painting experience.',
      'Knowledge of modern waterborne and solvent automotive paint systems.',
      'Attention to detail, keen color vision, and steady technique.',
      'Strict adherence to chemical safety protocols.'
    ],
    benefits: [
      'Competitive monthly salary + quality performance bonuses',
      'Modern oven-baked spray booth working conditions',
      'Health insurance'
    ],
    status: 'Open',
    hidden: false,
    seoTitle: 'Auto Body Painter Job in Tema | Santa Towing Body Works',
    seoDescription: 'Experienced Auto Body Painter wanted for our modern paint facility in Tema. Apply today.'
  }
];
