
export interface SitemapLink {
  label: string;
  path: string;
  badge?: string;
  description?: string;
  section?: string;
}

export interface SitemapCategory {
  title: string;
  iconName: string;
  links: SitemapLink[];
  subCategories?: SitemapCategory[];
}

export interface AdminSectionDef {
  sectionTitle: string;
  sectionDescription: string;
  iconName: string;
  links: SitemapLink[];
}

export const ADMIN_SECTIONS: AdminSectionDef[] = [
  {
    sectionTitle: 'Core Dashboard & Authentication',
    sectionDescription: 'Main administrative console overview, operational counters, and authentication gate.',
    iconName: 'LayoutDashboard',
    links: [
      {
        label: 'Admin Dashboard Overview',
        path: '/admin',
        badge: 'Console Home',
        description: 'Central operational dashboard with KPI counters, quick edits and status overview.',
        section: 'Core Dashboard',
      },
      {
        label: 'Admin Login Gate',
        path: '/admin/login',
        badge: 'Security Gate',
        description: 'Secure email and password administrative authentication portal.',
        section: 'Core Dashboard',
      },
    ],
  },
  {
    sectionTitle: 'Inventory & Catalog Management',
    sectionDescription: 'Manage commercial inventory across sales vehicles, rental fleet, auto parts, gallery, FAQs, and careers.',
    iconName: 'Package',
    links: [
      {
        label: 'Inventory & Catalog Manager',
        path: '/admin/inventory',
        badge: 'Catalog Overview',
        description: 'Central vehicle, fleet, auto parts, and content catalog manager.',
        section: 'Inventory & Catalog',
      },
      {
        label: 'Cars for Sale Inventory',
        path: '/admin/inventory?tab=cars',
        badge: 'Cars',
        description: 'Manage inventory of new, foreign-used, and inspected Ghana vehicles for sale.',
        section: 'Inventory & Catalog',
      },
      {
        label: 'Rental Fleet Inventory',
        path: '/admin/inventory?tab=rentals',
        badge: 'Rentals',
        description: 'Manage daily, weekly, and monthly vehicle hire fleet options.',
        section: 'Inventory & Catalog',
      },
      {
        label: 'Auto Parts & Spares Store',
        path: '/admin/inventory?tab=parts',
        badge: 'Parts',
        description: 'Manage genuine OEM and replacement batteries, tires, and mechanical spares.',
        section: 'Inventory & Catalog',
      },
      {
        label: 'Photo & Media Gallery',
        path: '/admin/inventory?tab=gallery',
        badge: 'Gallery',
        description: 'Showcase photos of towing rescues, workshops, and garage facilities.',
        section: 'Inventory & Catalog',
      },
      {
        label: 'Frequently Asked Questions Database',
        path: '/admin/inventory?tab=faqs',
        badge: 'FAQs',
        description: 'Manage questions and answers across all automotive service lines.',
        section: 'Inventory & Catalog',
      },
      {
        label: 'Careers & Job Postings',
        path: '/admin/inventory?tab=careers',
        badge: 'Careers',
        description: 'Post and manage open jobs, technician roles, and driver vacancies.',
        section: 'Inventory & Catalog',
      },
    ],
  },
  {
    sectionTitle: 'Content & Page Copy Editor',
    sectionDescription: 'In-depth page-by-page content editor for headlines, emergency guarantees, services, and policies.',
    iconName: 'FileText',
    links: [
      {
        label: 'Pages & Text Content Editor',
        path: '/admin/pages-text',
        badge: 'Text Overview',
        description: 'Global text, hero copy, and service guarantees editor across all site pages.',
        section: 'Pages & Text',
      },
      {
        label: 'Home Page Content Editor',
        path: '/admin/pages-text?page=Home',
        badge: 'Home',
        description: 'Homepage hero banners, statistics, emergency CTA, and guarantees.',
        section: 'Pages & Text',
      },
      {
        label: 'Emergency Towing Services Copy',
        path: '/admin/pages-text?page=Towing',
        badge: 'Towing',
        description: '24/7 flatbed towing rates, recovery dispatch terms, and coverage copy.',
        section: 'Pages & Text',
      },
      {
        label: 'Haulage & Heavy Transport Content',
        path: '/admin/pages-text?page=Haulage',
        badge: 'Haulage',
        description: 'Industrial equipment hauling, container transit, and lowbed logistics text.',
        section: 'Pages & Text',
      },
      {
        label: 'Car Rentals Content Editor',
        path: '/admin/pages-text?page=Rental',
        badge: 'Rental',
        description: 'Vehicle hire headlines, driver conditions, and booking terms copy.',
        section: 'Pages & Text',
      },
      {
        label: 'Car Sales Dealership Content',
        path: '/admin/pages-text?page=Sales',
        badge: 'Sales',
        description: 'Vehicle sales headlines, multi-point inspection guarantee copy.',
        section: 'Pages & Text',
      },
      {
        label: 'Auto Repairs & Diagnostics Text',
        path: '/admin/pages-text?page=Repairs',
        badge: 'Repairs',
        description: 'Mechanical diagnostics, engine rebuilds, and repair warranty copy.',
        section: 'Pages & Text',
      },
      {
        label: 'Body Works & Spraying Content',
        path: '/admin/pages-text?page=Body%20Works',
        badge: 'Body Works',
        description: 'Dent repair, spray oven booth, chassis alignment service text.',
        section: 'Pages & Text',
      },
      {
        label: 'Auto Parts Store Content',
        path: '/admin/pages-text?page=Parts',
        badge: 'Parts',
        description: 'Genuine parts store headlines, warranty, and battery guarantee copy.',
        section: 'Pages & Text',
      },
      {
        label: 'Service Areas Directory Copy',
        path: '/admin/pages-text?page=Service%20Areas',
        badge: 'Service Areas',
        description: 'Regional dispatch coverage text across all 16 regions of Ghana.',
        section: 'Pages & Text',
      },
      {
        label: 'Blog & Automotive News Editor',
        path: '/admin/pages-text?page=Blog',
        badge: 'Blog',
        description: 'Manage articles, maintenance guides, and road safety publications.',
        section: 'Pages & Text',
      },
      {
        label: 'Contact & Dispatch Desk Copy',
        path: '/admin/pages-text?page=Contact',
        badge: 'Contact',
        description: 'Direct emergency telephone hotlines, email, and facility address text.',
        section: 'Pages & Text',
      },
      {
        label: 'Careers & Hiring Page Copy',
        path: '/admin/pages-text?page=Careers',
        badge: 'Careers',
        description: 'Workplace benefits, application instructions, and team culture copy.',
        section: 'Pages & Text',
      },
      {
        label: 'FAQs Content & Answers',
        path: '/admin/pages-text?page=FAQs',
        badge: 'FAQs',
        description: 'Customer service knowledge base and answers text.',
        section: 'Pages & Text',
      },
      {
        label: 'Legal Policies & Compliance Copy',
        path: '/admin/pages-text?page=Policies',
        badge: 'Policies',
        description: 'Terms of service, pricing, privacy, and liability policy texts.',
        section: 'Pages & Text',
      },
    ],
  },
  {
    sectionTitle: 'Media & Image Assets Management',
    sectionDescription: 'Central media library, cloud image storage stats, and service-specific photography controls.',
    iconName: 'Image',
    links: [
      {
        label: 'Image Assets Manager',
        path: '/admin/images',
        badge: 'Media Overview',
        description: 'Media library manager with instant compression and image storage metrics.',
        section: 'Media & Images',
      },
      {
        label: 'All Visual Media Library',
        path: '/admin/images?tab=All',
        badge: 'All Media',
        description: 'Browse all uploaded photography, banners, and media assets.',
        section: 'Media & Images',
      },
      {
        label: 'Homepage Photography & Banners',
        path: '/admin/images?tab=Home',
        badge: 'Home',
        description: 'Hero banner slides, feature cards, and brand showcase photos.',
        section: 'Media & Images',
      },
      {
        label: 'Towing & Recovery Photos',
        path: '/admin/images?tab=Towing',
        badge: 'Towing',
        description: 'Tow trucks, roadside assistance, and recovery operations media.',
        section: 'Media & Images',
      },
      {
        label: 'Heavy Haulage Transport Media',
        path: '/admin/images?tab=Haulage',
        badge: 'Haulage',
        description: 'Lowbed trucks, crane haulers, and industrial transit photos.',
        section: 'Media & Images',
      },
      {
        label: 'Rental Fleet Showcase Media',
        path: '/admin/images?tab=Rental',
        badge: 'Rental',
        description: 'Rental fleet vehicles, sedans, SUVs, and luxury hire photography.',
        section: 'Media & Images',
      },
      {
        label: 'Workshop & Garage Facilities Media',
        path: '/admin/images?tab=Repairs',
        badge: 'Repairs',
        description: 'Diagnostic tools, hydraulic lifts, and auto mechanics at work.',
        section: 'Media & Images',
      },
      {
        label: 'Auto Parts Store Photography',
        path: '/admin/images?tab=Parts',
        badge: 'Parts',
        description: 'Genuine replacement parts, batteries, tires, and catalog photos.',
        section: 'Media & Images',
      },
      {
        label: 'Blog & Editorial Cover Images',
        path: '/admin/images?tab=Blog',
        badge: 'Blog',
        description: 'Editorial post featured graphics and road safety banners.',
        section: 'Media & Images',
      },
      {
        label: 'Facility & Customer Desk Media',
        path: '/admin/images?tab=Contact',
        badge: 'Contact',
        description: 'Customer support center, dispatch room, and workshop location photos.',
        section: 'Media & Images',
      },
      {
        label: 'Team & Technician Workplace Photos',
        path: '/admin/images?tab=Careers',
        badge: 'Careers',
        description: 'Field technicians, master mechanics, and dispatch team photos.',
        section: 'Media & Images',
      },
      {
        label: 'Global Branding Assets & Emblems',
        path: '/admin/images?tab=Global',
        badge: 'Global',
        description: 'Official badges, certifications, guarantee stamps, and icons.',
        section: 'Media & Images',
      },
    ],
  },
  {
    sectionTitle: 'Appearance & Brand Theme',
    sectionDescription: 'Live theme palette adjustments, brand colors, contrast validation, and corporate logo assets.',
    iconName: 'Palette',
    links: [
      {
        label: 'Brand Colors & Theme Palette',
        path: '/admin/colors',
        badge: 'Colors & Theme',
        description: 'Primary brand teal, dark background, accent red, and WCAG contrast audit.',
        section: 'Appearance',
      },
      {
        label: 'Company Logo & Favicon',
        path: '/admin/logo',
        badge: 'Logo & Favicon',
        description: 'Brand badge upload, SVG/PNG formats, dimensions, and browser icon.',
        section: 'Appearance',
      },
    ],
  },
  {
    sectionTitle: 'Channels, Menus & Navigation Links',
    sectionDescription: 'Manage phone hotlines, WhatsApp integration, social networks, and navigation menus.',
    iconName: 'Link2',
    links: [
      {
        label: 'Contact Channels & Navigation Settings',
        path: '/admin/links',
        badge: 'Links Overview',
        description: 'Manage touchpoints, hotlines, social media URLs, and site menus.',
        section: 'Links & Navigation',
      },
      {
        label: '24/7 Hotlines & WhatsApp Dispatch',
        path: '/admin/links#hotlines',
        badge: 'Dispatch Hotlines',
        description: 'Emergency dispatch telephone, WhatsApp prefilled message, and office address.',
        section: 'Links & Navigation',
      },
      {
        label: 'Official Social Media Channels',
        path: '/admin/links#socials',
        badge: 'Social Media',
        description: 'Facebook, Twitter/X, Instagram, LinkedIn, TikTok, and YouTube links.',
        section: 'Links & Navigation',
      },
      {
        label: 'Header Navigation Menu Links',
        path: '/admin/links#header-menu',
        badge: 'Header Menu',
        description: 'Configure top navigation items, display order, and live visibility.',
        section: 'Links & Navigation',
      },
      {
        label: 'Footer Quick Links Menu',
        path: '/admin/links#quick-links',
        badge: 'Footer Quick',
        description: 'Manage primary footer quick links and shortcuts.',
        section: 'Links & Navigation',
      },
      {
        label: 'Footer Service Lines Menu',
        path: '/admin/links#service-links',
        badge: 'Footer Services',
        description: 'Manage secondary footer service category links.',
        section: 'Links & Navigation',
      },
    ],
  },
  {
    sectionTitle: 'Admin Profile, Security & Backups',
    sectionDescription: 'Administrator credentials, cryptographic security, business contact information, and data backups.',
    iconName: 'User',
    links: [
      {
        label: 'Admin Profile & System Settings',
        path: '/admin/profile',
        badge: 'Profile Overview',
        description: 'Administrator identity, business data, security credentials, and backups.',
        section: 'Profile & Settings',
      },
      {
        label: 'Administrator Profile & Avatar',
        path: '/admin/profile?tab=profile',
        badge: 'Admin Profile',
        description: 'Admin display name, avatar photo, administrative role, and internal email.',
        section: 'Profile & Settings',
      },
      {
        label: 'Business Profile & Operations Info',
        path: '/admin/profile?tab=business',
        badge: 'Business Profile',
        description: 'Legal corporate name, short brand name, tagline, and registered address.',
        section: 'Profile & Settings',
      },
      {
        label: 'Password & Security Credentials',
        path: '/admin/profile?tab=security',
        badge: 'Security & Auth',
        description: 'Update cryptographic password, verify strength meter, and review audit.',
        section: 'Profile & Settings',
      },
      {
        label: 'Data Backup, Export & Restore',
        path: '/admin/profile?tab=backup',
        badge: 'Backup & Restore',
        description: 'Export full JSON backup, restore from file, and view storage metrics.',
        section: 'Profile & Settings',
      },
    ],
  },
  {
    sectionTitle: 'Pro Forma Invoices & Financial Documents',
    sectionDescription: 'Manage quotes, heavy haulage fee estimates, customer accounts receivable, and printable A4 documents.',
    iconName: 'FileText',
    links: [
      {
        label: 'Pro Forma Invoices Manager',
        path: '/admin/invoices',
        badge: 'Invoices',
        description: 'Create, compute taxes & discounts, duplicate, and print A4 pro forma invoices.',
        section: 'Financial Suite',
      },
      {
        label: 'Official Receipts & Payments',
        path: '/admin/receipts',
        badge: 'Receipts',
        description: 'Record cash, MoMo & bank payments, settle invoices, and issue receipts.',
        section: 'Financial Suite',
      },
      {
        label: 'Customer Billing Directory',
        path: '/admin/customers',
        badge: 'Customers',
        description: 'Manage client accounts, contact information, and linked transaction history.',
        section: 'Financial Suite',
      },
      {
        label: 'Document Templates & Settings',
        path: '/admin/doc-settings',
        badge: 'Billing Settings',
        description: 'Configure corporate letterhead, payment instructions, and terms & conditions.',
        section: 'Financial Suite',
      },
    ],
  },
  {
    sectionTitle: 'Image Studio & Media Management',
    sectionDescription: 'Deterministic aspect cropping, pixel dimension scaling, text/logo watermarking, and media exports.',
    iconName: 'Image',
    links: [
      {
        label: 'Image Studio & Editor',
        path: '/admin/image-studio',
        badge: 'Image Studio',
        description: 'Deterministic 5-aspect ratio cropping (1:1, 3:2, 2:3, 16:9, 9:16), pixel scaling, and overlays.',
        section: 'Studio & Media',
      },
      {
        label: 'Data Backup, Export & Restore Center',
        path: '/admin/backup',
        badge: 'Data Backups',
        description: 'Full database JSON backups, CSV spreadsheet exports, and audit activity trail.',
        section: 'Studio & Media',
      },
    ],
  },
];

export const ADMIN_PAGES: SitemapLink[] = ADMIN_SECTIONS.flatMap((sec) => sec.links);

export const MAIN_PAGES: SitemapLink[] = [
  { label: 'Home Page', path: '/' },
  { label: 'Website Search', path: '/search' },
  { label: 'Contact & Dispatch Center', path: '/contact' },
  { label: 'Careers', path: '/careers' },
  { label: 'Media Gallery', path: '/gallery' },
  { label: 'Frequently Asked Questions', path: '/faqs' },
  { label: 'Website Sitemap', path: '/sitemap' }
];

export const SERVICES: SitemapLink[] = [
  { label: 'All Services Overview', path: '/services' },
  { label: 'Emergency Towing', path: '/towing' },
  { label: 'Haulage & Heavy Transport', path: '/haulage' },
  { label: 'Auto Repairs & Diagnostics', path: '/repairs' },
  { label: 'Body Works & Spray Painting', path: '/body-works' },
  { label: 'Commercial Fleet Maintenance', path: '/fleet' }
];

export const FLEET_INVENTORY: SitemapLink[] = [
  { label: 'Car Sales', path: '/sales' },
  { label: 'Car Rentals', path: '/rental' },
  { label: 'Auto Parts Store', path: '/parts' }
];

export const BLOG: SitemapLink[] = [
  { label: 'Blog & Automotive Hub', path: '/blog' }
];

export const LEGAL_POLICIES: SitemapLink[] = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms-conditions' },
  { label: 'Towing Service Terms', path: '/towing-service-terms' },
  { label: 'Cancellation & Refund Policy', path: '/cancellation-refund-policy' },
  { label: 'Pricing & Payment Policy', path: '/pricing-payment-policy' },
  { label: 'Website Disclaimer', path: '/disclaimer' },
  { label: 'Cookie Policy', path: '/cookie-policy' },
  { label: 'Service Area Policy', path: '/service-area-policy' },
  { label: 'Emergency Service Policy', path: '/emergency-service-policy' },
  { label: 'Complaints Policy', path: '/complaints-policy' },
  { label: 'Car Damage & Liability Policy', path: '/car-damage-liability-policy' },
  { label: 'Accessibility Statement', path: '/accessibility-statement' }
];

export const SERVICE_AREAS: SitemapLink[] = [
  {
    "label": "Service Areas Directory",
    "path": "/service-areas"
  },
  {
    "label": "Abeka Towing & Transport",
    "path": "/service-areas/abeka"
  },
  {
    "label": "Abuakwa To Accra Towing & Transport",
    "path": "/service-areas/abuakwa-to-accra"
  },
  {
    "label": "Aburi To Accra Towing & Transport",
    "path": "/service-areas/aburi-to-accra"
  },
  {
    "label": "Accra To Abuakwa Towing & Transport",
    "path": "/service-areas/accra-to-abuakwa"
  },
  {
    "label": "Accra To Aburi Towing & Transport",
    "path": "/service-areas/accra-to-aburi"
  },
  {
    "label": "Accra To Aflao Towing & Transport",
    "path": "/service-areas/accra-to-aflao"
  },
  {
    "label": "Accra To Agona Nkwanta Towing & Transport",
    "path": "/service-areas/accra-to-agona-nkwanta"
  },
  {
    "label": "Accra To Agona Towing & Transport",
    "path": "/service-areas/accra-to-agona"
  },
  {
    "label": "Accra To Akontombra Towing & Transport",
    "path": "/service-areas/accra-to-akontombra"
  },
  {
    "label": "Accra To Akropong Towing & Transport",
    "path": "/service-areas/accra-to-akropong"
  },
  {
    "label": "Accra To Akwatia Towing & Transport",
    "path": "/service-areas/accra-to-akwatia"
  },
  {
    "label": "Accra To Akyem Oda Towing & Transport",
    "path": "/service-areas/accra-to-akyem-oda"
  },
  {
    "label": "Accra To Apam Towing & Transport",
    "path": "/service-areas/accra-to-apam"
  },
  {
    "label": "Accra To Asamankese Towing & Transport",
    "path": "/service-areas/accra-to-asamankese"
  },
  {
    "label": "Accra To Asankragwa Towing & Transport",
    "path": "/service-areas/accra-to-asankragwa"
  },
  {
    "label": "Accra To Asante Akim Towing & Transport",
    "path": "/service-areas/accra-to-asante-akim"
  },
  {
    "label": "Accra To Assin Fosu Towing & Transport",
    "path": "/service-areas/accra-to-assin-fosu"
  },
  {
    "label": "Accra To Atebubu Towing & Transport",
    "path": "/service-areas/accra-to-atebubu"
  },
  {
    "label": "Accra To Atonsu Towing & Transport",
    "path": "/service-areas/accra-to-atonsu"
  },
  {
    "label": "Accra To Axim Towing & Transport",
    "path": "/service-areas/accra-to-axim"
  },
  {
    "label": "Accra To Bawdie Towing & Transport",
    "path": "/service-areas/accra-to-bawdie"
  },
  {
    "label": "Accra To Bawku Towing & Transport",
    "path": "/service-areas/accra-to-bawku"
  },
  {
    "label": "Accra To Bechem Towing & Transport",
    "path": "/service-areas/accra-to-bechem"
  },
  {
    "label": "Accra To Begoro Towing & Transport",
    "path": "/service-areas/accra-to-begoro"
  },
  {
    "label": "Accra To Bekwai Towing & Transport",
    "path": "/service-areas/accra-to-bekwai"
  },
  {
    "label": "Accra To Berekum Towing & Transport",
    "path": "/service-areas/accra-to-berekum"
  },
  {
    "label": "Accra To Bibiani Towing & Transport",
    "path": "/service-areas/accra-to-bibiani"
  },
  {
    "label": "Accra To Bodi Towing & Transport",
    "path": "/service-areas/accra-to-bodi"
  },
  {
    "label": "Accra To Bogoso Towing & Transport",
    "path": "/service-areas/accra-to-bogoso"
  },
  {
    "label": "Accra To Bole Towing & Transport",
    "path": "/service-areas/accra-to-bole"
  },
  {
    "label": "Accra To Bolgatanga Towing & Transport",
    "path": "/service-areas/accra-to-bolgatanga"
  },
  {
    "label": "Accra To Buipe Towing & Transport",
    "path": "/service-areas/accra-to-buipe"
  },
  {
    "label": "Accra To Cape Coast Towing & Transport",
    "path": "/service-areas/accra-to-cape-coast"
  },
  {
    "label": "Accra To Daboase Towing & Transport",
    "path": "/service-areas/accra-to-daboase"
  },
  {
    "label": "Accra To Daboya Towing & Transport",
    "path": "/service-areas/accra-to-daboya"
  },
  {
    "label": "Accra To Dadieso Towing & Transport",
    "path": "/service-areas/accra-to-dadieso"
  },
  {
    "label": "Accra To Dambai Towing & Transport",
    "path": "/service-areas/accra-to-dambai"
  },
  {
    "label": "Accra To Damongo Towing & Transport",
    "path": "/service-areas/accra-to-damongo"
  },
  {
    "label": "Accra To Donkorkrom Towing & Transport",
    "path": "/service-areas/accra-to-donkorkrom"
  },
  {
    "label": "Accra To Dormaa Ahenkro Towing & Transport",
    "path": "/service-areas/accra-to-dormaa-ahenkro"
  },
  {
    "label": "Accra To Duayaw Nkwanta Towing & Transport",
    "path": "/service-areas/accra-to-duayaw-nkwanta"
  },
  {
    "label": "Accra To Dunkwa On Offin Towing & Transport",
    "path": "/service-areas/accra-to-dunkwa-on-offin"
  },
  {
    "label": "Accra To Ejisu Towing & Transport",
    "path": "/service-areas/accra-to-ejisu"
  },
  {
    "label": "Accra To Elmina Towing & Transport",
    "path": "/service-areas/accra-to-elmina"
  },
  {
    "label": "Accra To Elubo Towing & Transport",
    "path": "/service-areas/accra-to-elubo"
  },
  {
    "label": "Accra To Enchi Towing & Transport",
    "path": "/service-areas/accra-to-enchi"
  },
  {
    "label": "Accra To Fomena Towing & Transport",
    "path": "/service-areas/accra-to-fomena"
  },
  {
    "label": "Accra To Fumbisi Towing & Transport",
    "path": "/service-areas/accra-to-fumbisi"
  },
  {
    "label": "Accra To Gambaga Towing & Transport",
    "path": "/service-areas/accra-to-gambaga"
  },
  {
    "label": "Accra To Goaso Towing & Transport",
    "path": "/service-areas/accra-to-goaso"
  },
  {
    "label": "Accra To Half Assini Towing & Transport",
    "path": "/service-areas/accra-to-half-assini"
  },
  {
    "label": "Accra To Hamile Towing & Transport",
    "path": "/service-areas/accra-to-hamile"
  },
  {
    "label": "Accra To Ho Towing & Transport",
    "path": "/service-areas/accra-to-ho"
  },
  {
    "label": "Accra To Hohoe Towing & Transport",
    "path": "/service-areas/accra-to-hohoe"
  },
  {
    "label": "Accra To Hwidiem Towing & Transport",
    "path": "/service-areas/accra-to-hwidiem"
  },
  {
    "label": "Accra To Jasikan Towing & Transport",
    "path": "/service-areas/accra-to-jasikan"
  },
  {
    "label": "Accra To Jirapa Towing & Transport",
    "path": "/service-areas/accra-to-jirapa"
  },
  {
    "label": "Accra To Juaben Towing & Transport",
    "path": "/service-areas/accra-to-juaben"
  },
  {
    "label": "Accra To Juaboso Towing & Transport",
    "path": "/service-areas/accra-to-juaboso"
  },
  {
    "label": "Accra To Kadjebi Towing & Transport",
    "path": "/service-areas/accra-to-kadjebi"
  },
  {
    "label": "Accra To Karaga Towing & Transport",
    "path": "/service-areas/accra-to-karaga"
  },
  {
    "label": "Accra To Kenyasi Towing & Transport",
    "path": "/service-areas/accra-to-kenyasi"
  },
  {
    "label": "Accra To Keta Towing & Transport",
    "path": "/service-areas/accra-to-keta"
  },
  {
    "label": "Accra To Kete Krachi Towing & Transport",
    "path": "/service-areas/accra-to-kete-krachi"
  },
  {
    "label": "Accra To Kintampo Towing & Transport",
    "path": "/service-areas/accra-to-kintampo"
  },
  {
    "label": "Accra To Koforidua Towing & Transport",
    "path": "/service-areas/accra-to-koforidua"
  },
  {
    "label": "Accra To Konongo Towing & Transport",
    "path": "/service-areas/accra-to-konongo"
  },
  {
    "label": "Accra To Kumasi Towing & Transport",
    "path": "/service-areas/accra-to-kumasi"
  },
  {
    "label": "Accra To Kwame Danso Towing & Transport",
    "path": "/service-areas/accra-to-kwame-danso"
  },
  {
    "label": "Accra To Lawra Towing & Transport",
    "path": "/service-areas/accra-to-lawra"
  },
  {
    "label": "Accra To Mampong Towing & Transport",
    "path": "/service-areas/accra-to-mampong"
  },
  {
    "label": "Accra To Mankessim Towing & Transport",
    "path": "/service-areas/accra-to-mankessim"
  },
  {
    "label": "Accra To Mim Towing & Transport",
    "path": "/service-areas/accra-to-mim"
  },
  {
    "label": "Accra To Mpohor Towing & Transport",
    "path": "/service-areas/accra-to-mpohor"
  },
  {
    "label": "Accra To Nalerigu Towing & Transport",
    "path": "/service-areas/accra-to-nalerigu"
  },
  {
    "label": "Accra To Nandom Towing & Transport",
    "path": "/service-areas/accra-to-nandom"
  },
  {
    "label": "Accra To Navrongo Towing & Transport",
    "path": "/service-areas/accra-to-navrongo"
  },
  {
    "label": "Accra To Nkawie Towing & Transport",
    "path": "/service-areas/accra-to-nkawie"
  },
  {
    "label": "Accra To Nkawkaw Towing & Transport",
    "path": "/service-areas/accra-to-nkawkaw"
  },
  {
    "label": "Accra To Nkoranza Towing & Transport",
    "path": "/service-areas/accra-to-nkoranza"
  },
  {
    "label": "Accra To Nkwanta South Towing & Transport",
    "path": "/service-areas/accra-to-nkwanta-south"
  },
  {
    "label": "Accra To Nkwanta Towing & Transport",
    "path": "/service-areas/accra-to-nkwanta"
  },
  {
    "label": "Accra To Nsawam Towing & Transport",
    "path": "/service-areas/accra-to-nsawam"
  },
  {
    "label": "Accra To Obuasi Towing & Transport",
    "path": "/service-areas/accra-to-obuasi"
  },
  {
    "label": "Accra To Odumase Krobo Towing & Transport",
    "path": "/service-areas/accra-to-odumase-krobo"
  },
  {
    "label": "Accra To Offinso Towing & Transport",
    "path": "/service-areas/accra-to-offinso"
  },
  {
    "label": "Accra To Paga Towing & Transport",
    "path": "/service-areas/accra-to-paga"
  },
  {
    "label": "Accra To Prang Towing & Transport",
    "path": "/service-areas/accra-to-prang"
  },
  {
    "label": "Accra To Prestea Towing & Transport",
    "path": "/service-areas/accra-to-prestea"
  },
  {
    "label": "Accra To Salaga Towing & Transport",
    "path": "/service-areas/accra-to-salaga"
  },
  {
    "label": "Accra To Samreboi Towing & Transport",
    "path": "/service-areas/accra-to-samreboi"
  },
  {
    "label": "Accra To Sandema Towing & Transport",
    "path": "/service-areas/accra-to-sandema"
  },
  {
    "label": "Accra To Savelugu Towing & Transport",
    "path": "/service-areas/accra-to-savelugu"
  },
  {
    "label": "Accra To Sefwi Bekwai Towing & Transport",
    "path": "/service-areas/accra-to-sefwi-bekwai"
  },
  {
    "label": "Accra To Sefwi Wiawso Towing & Transport",
    "path": "/service-areas/accra-to-sefwi-wiawso"
  },
  {
    "label": "Accra To Sekondi Towing & Transport",
    "path": "/service-areas/accra-to-sekondi"
  },
  {
    "label": "Accra To Shama Towing & Transport",
    "path": "/service-areas/accra-to-shama"
  },
  {
    "label": "Accra To Sogakope Towing & Transport",
    "path": "/service-areas/accra-to-sogakope"
  },
  {
    "label": "Accra To Somanya Towing & Transport",
    "path": "/service-areas/accra-to-somanya"
  },
  {
    "label": "Accra To Suhum Towing & Transport",
    "path": "/service-areas/accra-to-suhum"
  },
  {
    "label": "Accra To Sunyani Towing & Transport",
    "path": "/service-areas/accra-to-sunyani"
  },
  {
    "label": "Accra To Takoradi Towing & Transport",
    "path": "/service-areas/accra-to-takoradi"
  },
  {
    "label": "Accra To Tamale Towing & Transport",
    "path": "/service-areas/accra-to-tamale"
  },
  {
    "label": "Accra To Tarkwa Towing & Transport",
    "path": "/service-areas/accra-to-tarkwa"
  },
  {
    "label": "Accra To Techiman Towing & Transport",
    "path": "/service-areas/accra-to-techiman"
  },
  {
    "label": "Accra To Tepa Towing & Transport",
    "path": "/service-areas/accra-to-tepa"
  },
  {
    "label": "Accra To Tolon Towing & Transport",
    "path": "/service-areas/accra-to-tolon"
  },
  {
    "label": "Accra To Tumu Towing & Transport",
    "path": "/service-areas/accra-to-tumu"
  },
  {
    "label": "Accra To Wa Towing & Transport",
    "path": "/service-areas/accra-to-wa"
  },
  {
    "label": "Accra To Walewale Towing & Transport",
    "path": "/service-areas/accra-to-walewale"
  },
  {
    "label": "Accra To Wassa Akropong Towing & Transport",
    "path": "/service-areas/accra-to-wassa-akropong"
  },
  {
    "label": "Accra To Wenchi Towing & Transport",
    "path": "/service-areas/accra-to-wenchi"
  },
  {
    "label": "Accra To Winneba Towing & Transport",
    "path": "/service-areas/accra-to-winneba"
  },
  {
    "label": "Accra To Yeji Towing & Transport",
    "path": "/service-areas/accra-to-yeji"
  },
  {
    "label": "Accra To Yendi Towing & Transport",
    "path": "/service-areas/accra-to-yendi"
  },
  {
    "label": "Accra To Zebilla Towing & Transport",
    "path": "/service-areas/accra-to-zebilla"
  },
  {
    "label": "Accra Towing & Transport",
    "path": "/service-areas/accra"
  },
  {
    "label": "Achimota Towing & Transport",
    "path": "/service-areas/achimota"
  },
  {
    "label": "Adenta Towing & Transport",
    "path": "/service-areas/adenta"
  },
  {
    "label": "Aflao To Accra Towing & Transport",
    "path": "/service-areas/aflao-to-accra"
  },
  {
    "label": "Agona Nkwanta To Accra Towing & Transport",
    "path": "/service-areas/agona-nkwanta-to-accra"
  },
  {
    "label": "Agona To Accra Towing & Transport",
    "path": "/service-areas/agona-to-accra"
  },
  {
    "label": "Airport Residential Towing & Transport",
    "path": "/service-areas/airport-residential"
  },
  {
    "label": "Akontombra To Accra Towing & Transport",
    "path": "/service-areas/akontombra-to-accra"
  },
  {
    "label": "Akropong To Accra Towing & Transport",
    "path": "/service-areas/akropong-to-accra"
  },
  {
    "label": "Akwatia To Accra Towing & Transport",
    "path": "/service-areas/akwatia-to-accra"
  },
  {
    "label": "Akyem Oda To Accra Towing & Transport",
    "path": "/service-areas/akyem-oda-to-accra"
  },
  {
    "label": "Amasaman Towing & Transport",
    "path": "/service-areas/amasaman"
  },
  {
    "label": "Apam To Accra Towing & Transport",
    "path": "/service-areas/apam-to-accra"
  },
  {
    "label": "Asamankese To Accra Towing & Transport",
    "path": "/service-areas/asamankese-to-accra"
  },
  {
    "label": "Asankragwa To Accra Towing & Transport",
    "path": "/service-areas/asankragwa-to-accra"
  },
  {
    "label": "Asante Akim To Accra Towing & Transport",
    "path": "/service-areas/asante-akim-to-accra"
  },
  {
    "label": "Ashaiman Towing & Transport",
    "path": "/service-areas/ashaiman"
  },
  {
    "label": "Assin Fosu To Accra Towing & Transport",
    "path": "/service-areas/assin-fosu-to-accra"
  },
  {
    "label": "Atebubu To Accra Towing & Transport",
    "path": "/service-areas/atebubu-to-accra"
  },
  {
    "label": "Atonsu To Accra Towing & Transport",
    "path": "/service-areas/atonsu-to-accra"
  },
  {
    "label": "Axim To Accra Towing & Transport",
    "path": "/service-areas/axim-to-accra"
  },
  {
    "label": "Ayawaso Towing & Transport",
    "path": "/service-areas/ayawaso"
  },
  {
    "label": "Bawdie To Accra Towing & Transport",
    "path": "/service-areas/bawdie-to-accra"
  },
  {
    "label": "Bawku To Accra Towing & Transport",
    "path": "/service-areas/bawku-to-accra"
  },
  {
    "label": "Bechem To Accra Towing & Transport",
    "path": "/service-areas/bechem-to-accra"
  },
  {
    "label": "Begoro To Accra Towing & Transport",
    "path": "/service-areas/begoro-to-accra"
  },
  {
    "label": "Bekwai To Accra Towing & Transport",
    "path": "/service-areas/bekwai-to-accra"
  },
  {
    "label": "Berekum To Accra Towing & Transport",
    "path": "/service-areas/berekum-to-accra"
  },
  {
    "label": "Bibiani To Accra Towing & Transport",
    "path": "/service-areas/bibiani-to-accra"
  },
  {
    "label": "Bodi To Accra Towing & Transport",
    "path": "/service-areas/bodi-to-accra"
  },
  {
    "label": "Bogoso To Accra Towing & Transport",
    "path": "/service-areas/bogoso-to-accra"
  },
  {
    "label": "Bolgatanga To Accra Towing & Transport",
    "path": "/service-areas/bolgatanga-to-accra"
  },
  {
    "label": "Buipe To Accra Towing & Transport",
    "path": "/service-areas/buipe-to-accra"
  },
  {
    "label": "Burma Camp Towing & Transport",
    "path": "/service-areas/burma-camp"
  },
  {
    "label": "Cape Coast To Accra Towing & Transport",
    "path": "/service-areas/cape-coast-to-accra"
  },
  {
    "label": "Circle Towing & Transport",
    "path": "/service-areas/circle"
  },
  {
    "label": "Daboase To Accra Towing & Transport",
    "path": "/service-areas/daboase-to-accra"
  },
  {
    "label": "Daboya To Accra Towing & Transport",
    "path": "/service-areas/daboya-to-accra"
  },
  {
    "label": "Dadieso To Accra Towing & Transport",
    "path": "/service-areas/dadieso-to-accra"
  },
  {
    "label": "Dambai To Accra Towing & Transport",
    "path": "/service-areas/dambai-to-accra"
  },
  {
    "label": "Damongo To Accra Towing & Transport",
    "path": "/service-areas/damongo-to-accra"
  },
  {
    "label": "Dansoman Towing & Transport",
    "path": "/service-areas/dansoman"
  },
  {
    "label": "Dawhenya Towing & Transport",
    "path": "/service-areas/dawhenya"
  },
  {
    "label": "Dodowa Towing & Transport",
    "path": "/service-areas/dodowa"
  },
  {
    "label": "Donkorkrom To Accra Towing & Transport",
    "path": "/service-areas/donkorkrom-to-accra"
  },
  {
    "label": "Dormaa Ahenkro To Accra Towing & Transport",
    "path": "/service-areas/dormaa-ahenkro-to-accra"
  },
  {
    "label": "Duayaw Nkwanta To Accra Towing & Transport",
    "path": "/service-areas/duayaw-nkwanta-to-accra"
  },
  {
    "label": "Dunkwa On Offin To Accra Towing & Transport",
    "path": "/service-areas/dunkwa-on-offin-to-accra"
  },
  {
    "label": "Dzorwulu Towing & Transport",
    "path": "/service-areas/dzorwulu"
  },
  {
    "label": "East Legon Towing & Transport",
    "path": "/service-areas/east-legon"
  },
  {
    "label": "Ejisu To Accra Towing & Transport",
    "path": "/service-areas/ejisu-to-accra"
  },
  {
    "label": "Elmina To Accra Towing & Transport",
    "path": "/service-areas/elmina-to-accra"
  },
  {
    "label": "Elubo To Accra Towing & Transport",
    "path": "/service-areas/elubo-to-accra"
  },
  {
    "label": "Enchi To Accra Towing & Transport",
    "path": "/service-areas/enchi-to-accra"
  },
  {
    "label": "Fomena To Accra Towing & Transport",
    "path": "/service-areas/fomena-to-accra"
  },
  {
    "label": "Fumbisi To Accra Towing & Transport",
    "path": "/service-areas/fumbisi-to-accra"
  },
  {
    "label": "Gambaga To Accra Towing & Transport",
    "path": "/service-areas/gambaga-to-accra"
  },
  {
    "label": "Goaso To Accra Towing & Transport",
    "path": "/service-areas/goaso-to-accra"
  },
  {
    "label": "Gushegu To Accra Towing & Transport",
    "path": "/service-areas/gushegu-to-accra"
  },
  {
    "label": "Half Assini To Accra Towing & Transport",
    "path": "/service-areas/half-assini-to-accra"
  },
  {
    "label": "Hamile To Accra Towing & Transport",
    "path": "/service-areas/hamile-to-accra"
  },
  {
    "label": "Ho To Accra Towing & Transport",
    "path": "/service-areas/ho-to-accra"
  },
  {
    "label": "Hohoe To Accra Towing & Transport",
    "path": "/service-areas/hohoe-to-accra"
  },
  {
    "label": "Hwidiem To Accra Towing & Transport",
    "path": "/service-areas/hwidiem-to-accra"
  },
  {
    "label": "Jasikan To Accra Towing & Transport",
    "path": "/service-areas/jasikan-to-accra"
  },
  {
    "label": "Jirapa To Accra Towing & Transport",
    "path": "/service-areas/jirapa-to-accra"
  },
  {
    "label": "Juaben To Accra Towing & Transport",
    "path": "/service-areas/juaben-to-accra"
  },
  {
    "label": "Juaboso To Accra Towing & Transport",
    "path": "/service-areas/juaboso-to-accra"
  },
  {
    "label": "Kadjebi To Accra Towing & Transport",
    "path": "/service-areas/kadjebi-to-accra"
  },
  {
    "label": "Kaneshie Towing & Transport",
    "path": "/service-areas/kaneshie"
  },
  {
    "label": "Karaga To Accra Towing & Transport",
    "path": "/service-areas/karaga-to-accra"
  },
  {
    "label": "Kasoa Towing & Transport",
    "path": "/service-areas/kasoa"
  },
  {
    "label": "Kenyasi To Accra Towing & Transport",
    "path": "/service-areas/kenyasi-to-accra"
  },
  {
    "label": "Keta To Accra Towing & Transport",
    "path": "/service-areas/keta-to-accra"
  },
  {
    "label": "Kete Krachi To Accra Towing & Transport",
    "path": "/service-areas/kete-krachi-to-accra"
  },
  {
    "label": "Kintampo To Accra Towing & Transport",
    "path": "/service-areas/kintampo-to-accra"
  },
  {
    "label": "Koforidua To Accra Towing & Transport",
    "path": "/service-areas/koforidua-to-accra"
  },
  {
    "label": "Konongo To Accra Towing & Transport",
    "path": "/service-areas/konongo-to-accra"
  },
  {
    "label": "Korle Klottey Towing & Transport",
    "path": "/service-areas/korle-klottey"
  },
  {
    "label": "Kpone Towing & Transport",
    "path": "/service-areas/kpone"
  },
  {
    "label": "Kumasi To Accra Towing & Transport",
    "path": "/service-areas/kumasi-to-accra"
  },
  {
    "label": "Kwame Danso To Accra Towing & Transport",
    "path": "/service-areas/kwame-danso-to-accra"
  },
  {
    "label": "Kwashieman Towing & Transport",
    "path": "/service-areas/kwashieman"
  },
  {
    "label": "La Towing & Transport",
    "path": "/service-areas/la"
  },
  {
    "label": "Labadi Towing & Transport",
    "path": "/service-areas/labadi"
  },
  {
    "label": "Lakeside Towing & Transport",
    "path": "/service-areas/lakeside"
  },
  {
    "label": "Lawra To Accra Towing & Transport",
    "path": "/service-areas/lawra-to-accra"
  },
  {
    "label": "Madina Towing & Transport",
    "path": "/service-areas/madina"
  },
  {
    "label": "Mampong To Accra Towing & Transport",
    "path": "/service-areas/mampong-to-accra"
  },
  {
    "label": "Mankessim To Accra Towing & Transport",
    "path": "/service-areas/mankessim-to-accra"
  },
  {
    "label": "Mim To Accra Towing & Transport",
    "path": "/service-areas/mim-to-accra"
  },
  {
    "label": "Mpohor To Accra Towing & Transport",
    "path": "/service-areas/mpohor-to-accra"
  },
  {
    "label": "Nalerigu To Accra Towing & Transport",
    "path": "/service-areas/nalerigu-to-accra"
  },
  {
    "label": "Nandom To Accra Towing & Transport",
    "path": "/service-areas/nandom-to-accra"
  },
  {
    "label": "Navrongo To Accra Towing & Transport",
    "path": "/service-areas/navrongo-to-accra"
  },
  {
    "label": "Nima Towing & Transport",
    "path": "/service-areas/nima"
  },
  {
    "label": "Ningo Prampram Towing & Transport",
    "path": "/service-areas/ningo-prampram"
  },
  {
    "label": "Nkawie To Accra Towing & Transport",
    "path": "/service-areas/nkawie-to-accra"
  },
  {
    "label": "Nkawkaw To Accra Towing & Transport",
    "path": "/service-areas/nkawkaw-to-accra"
  },
  {
    "label": "Nkoranza To Accra Towing & Transport",
    "path": "/service-areas/nkoranza-to-accra"
  },
  {
    "label": "Nkwanta South To Accra Towing & Transport",
    "path": "/service-areas/nkwanta-south-to-accra"
  },
  {
    "label": "Nkwanta To Accra Towing & Transport",
    "path": "/service-areas/nkwanta-to-accra"
  },
  {
    "label": "Nsawam To Accra Towing & Transport",
    "path": "/service-areas/nsawam-to-accra"
  },
  {
    "label": "Nungua Towing & Transport",
    "path": "/service-areas/nungua"
  },
  {
    "label": "Obuasi To Accra Towing & Transport",
    "path": "/service-areas/obuasi-to-accra"
  },
  {
    "label": "Odumase Krobo To Accra Towing & Transport",
    "path": "/service-areas/odumase-krobo-to-accra"
  },
  {
    "label": "Offinso To Accra Towing & Transport",
    "path": "/service-areas/offinso-to-accra"
  },
  {
    "label": "Osu Towing & Transport",
    "path": "/service-areas/osu"
  },
  {
    "label": "Paga To Accra Towing & Transport",
    "path": "/service-areas/paga-to-accra"
  },
  {
    "label": "Pokuase Towing & Transport",
    "path": "/service-areas/pokuase"
  },
  {
    "label": "Prampram Towing & Transport",
    "path": "/service-areas/prampram"
  },
  {
    "label": "Prang To Accra Towing & Transport",
    "path": "/service-areas/prang-to-accra"
  },
  {
    "label": "Prestea To Accra Towing & Transport",
    "path": "/service-areas/prestea-to-accra"
  },
  {
    "label": "Salaga To Accra Towing & Transport",
    "path": "/service-areas/salaga-to-accra"
  },
  {
    "label": "Samreboi To Accra Towing & Transport",
    "path": "/service-areas/samreboi-to-accra"
  },
  {
    "label": "Sandema To Accra Towing & Transport",
    "path": "/service-areas/sandema-to-accra"
  },
  {
    "label": "Savelugu To Accra Towing & Transport",
    "path": "/service-areas/savelugu-to-accra"
  },
  {
    "label": "Sefwi Bekwai To Accra Towing & Transport",
    "path": "/service-areas/sefwi-bekwai-to-accra"
  },
  {
    "label": "Sefwi Wiawso To Accra Towing & Transport",
    "path": "/service-areas/sefwi-wiawso-to-accra"
  },
  {
    "label": "Sekondi To Accra Towing & Transport",
    "path": "/service-areas/sekondi-to-accra"
  },
  {
    "label": "Shama To Accra Towing & Transport",
    "path": "/service-areas/shama-to-accra"
  },
  {
    "label": "Sogakope To Accra Towing & Transport",
    "path": "/service-areas/sogakope-to-accra"
  },
  {
    "label": "Somanya To Accra Towing & Transport",
    "path": "/service-areas/somanya-to-accra"
  },
  {
    "label": "Spintex Towing & Transport",
    "path": "/service-areas/spintex"
  },
  {
    "label": "Suhum To Accra Towing & Transport",
    "path": "/service-areas/suhum-to-accra"
  },
  {
    "label": "Sunyani To Accra Towing & Transport",
    "path": "/service-areas/sunyani-to-accra"
  },
  {
    "label": "Takoradi To Accra Towing & Transport",
    "path": "/service-areas/takoradi-to-accra"
  },
  {
    "label": "Tamale To Accra Towing & Transport",
    "path": "/service-areas/tamale-to-accra"
  },
  {
    "label": "Tarkwa To Accra Towing & Transport",
    "path": "/service-areas/tarkwa-to-accra"
  },
  {
    "label": "Techiman To Accra Towing & Transport",
    "path": "/service-areas/techiman-to-accra"
  },
  {
    "label": "Tema Towing & Transport",
    "path": "/service-areas/tema"
  },
  {
    "label": "Tepa To Accra Towing & Transport",
    "path": "/service-areas/tepa-to-accra"
  },
  {
    "label": "Tesano Towing & Transport",
    "path": "/service-areas/tesano"
  },
  {
    "label": "Teshie Towing & Transport",
    "path": "/service-areas/teshie"
  },
  {
    "label": "Tolon To Accra Towing & Transport",
    "path": "/service-areas/tolon-to-accra"
  },
  {
    "label": "Tumu To Accra Towing & Transport",
    "path": "/service-areas/tumu-to-accra"
  },
  {
    "label": "Wa To Accra Towing & Transport",
    "path": "/service-areas/wa-to-accra"
  },
  {
    "label": "Walewale To Accra Towing & Transport",
    "path": "/service-areas/walewale-to-accra"
  },
  {
    "label": "Wassa Akropong To Accra Towing & Transport",
    "path": "/service-areas/wassa-akropong-to-accra"
  },
  {
    "label": "Weija Gbawe Towing & Transport",
    "path": "/service-areas/weija-gbawe"
  },
  {
    "label": "Wenchi To Accra Towing & Transport",
    "path": "/service-areas/wenchi-to-accra"
  },
  {
    "label": "Winneba To Accra Towing & Transport",
    "path": "/service-areas/winneba-to-accra"
  },
  {
    "label": "Yeji To Accra Towing & Transport",
    "path": "/service-areas/yeji-to-accra"
  },
  {
    "label": "Yendi To Accra Towing & Transport",
    "path": "/service-areas/yendi-to-accra"
  },
  {
    "label": "Zebilla To Accra Towing & Transport",
    "path": "/service-areas/zebilla-to-accra"
  }
];

export const SITEMAP_DATA: SitemapCategory[] = [
  {
    title: 'Main Pages',
    iconName: 'Home',
    links: MAIN_PAGES
  },
  {
    title: 'Services',
    iconName: 'Wrench',
    links: SERVICES
  },
  {
    title: 'Inventory (Cars, Rentals, Parts)',
    iconName: 'Car',
    links: FLEET_INVENTORY
  },
  {
    title: 'Blog',
    iconName: 'BookOpen',
    links: BLOG
  },
  {
    title: 'Service Areas',
    iconName: 'Map',
    links: SERVICE_AREAS
  },
  {
    title: 'Policies',
    iconName: 'ShieldCheck',
    links: LEGAL_POLICIES
  }
];

export const ADMIN_CATEGORY: SitemapCategory = {
  title: 'Admin',
  iconName: 'Lock',
  links: ADMIN_PAGES
};
