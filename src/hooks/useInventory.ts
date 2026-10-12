/**
 * Santa Towing - Inventory Hooks
 * 
 * Provides reactive access to inventory collections stored in ContentContext/contentStorage:
 * - Cars for sale (`inventory.cars`)
 * - Rentals (`inventory.rentals`)
 * - Auto parts (`inventory.parts`)
 * - Gallery items (`inventory.gallery`)
 * - FAQs (`inventory.faqs`)
 * - Careers / Jobs (`inventory.careers`)
 * 
 * When no edits exist in storage, each hook cleanly falls back to its default dataset from
 * `src/data/inventoryDefaults.ts`, keeping the public website 100% identical.
 */

import { useContent } from './useContent';
import {
  DEFAULT_CARS,
  DEFAULT_RENTALS,
  DEFAULT_PARTS,
  DEFAULT_GALLERY,
  DEFAULT_FAQS,
  DEFAULT_CAREERS,
  InventoryCar,
  InventoryRental,
  InventoryPart,
  InventoryGalleryItem,
  InventoryFaq,
  InventoryCareer,
} from '../data/inventoryDefaults';

/**
 * Cars for Sale Hook
 * @param includeHidden If false (default), filters out hidden items for public view
 */
export function useInventoryCars(includeHidden = false): {
  cars: InventoryCar[];
  allCars: InventoryCar[];
  getCarByIdOrSlug: (idOrSlug: string | number | undefined) => InventoryCar | undefined;
} {
  const allCars = useContent<InventoryCar[]>('inventory.cars', DEFAULT_CARS);
  const safeCars = Array.isArray(allCars) && allCars.length > 0 ? allCars : DEFAULT_CARS;
  const cars = includeHidden ? safeCars : safeCars.filter(c => !c.hidden);

  const getCarByIdOrSlug = (idOrSlug: string | number | undefined): InventoryCar | undefined => {
    if (idOrSlug === undefined || idOrSlug === null || idOrSlug === '') return undefined;
    const searchStr = String(idOrSlug).toLowerCase();
    return safeCars.find(
      c => String(c.id).toLowerCase() === searchStr || (c.slug && c.slug.toLowerCase() === searchStr)
    );
  };

  return { cars, allCars: safeCars, getCarByIdOrSlug };
}

/**
 * Rentals Hook
 * @param includeHidden If false (default), filters out hidden items for public view
 */
export function useInventoryRentals(includeHidden = false): {
  rentals: InventoryRental[];
  allRentals: InventoryRental[];
  getRentalByIdOrSlug: (idOrSlug: string | number | undefined) => InventoryRental | undefined;
} {
  const allRentals = useContent<InventoryRental[]>('inventory.rentals', DEFAULT_RENTALS);
  const safeRentals = Array.isArray(allRentals) && allRentals.length > 0 ? allRentals : DEFAULT_RENTALS;
  const rentals = includeHidden ? safeRentals : safeRentals.filter(r => !r.hidden);

  const getRentalByIdOrSlug = (idOrSlug: string | number | undefined): InventoryRental | undefined => {
    if (idOrSlug === undefined || idOrSlug === null || idOrSlug === '') return undefined;
    const searchStr = String(idOrSlug).toLowerCase();
    return safeRentals.find(
      r =>
        String(r.id).toLowerCase() === searchStr ||
        (r.slug && r.slug.toLowerCase() === searchStr) ||
        (r.categorySlug && r.categorySlug.toLowerCase() === searchStr) ||
        (r.type && r.type.toLowerCase().includes(searchStr))
    );
  };

  return { rentals, allRentals: safeRentals, getRentalByIdOrSlug };
}

/**
 * Auto Parts Hook
 * @param includeHidden If false (default), filters out hidden items for public view
 */
export function useInventoryParts(includeHidden = false): {
  parts: InventoryPart[];
  allParts: InventoryPart[];
  getPartByIdOrSlug: (idOrSlug: string | number | undefined) => InventoryPart | undefined;
} {
  const allParts = useContent<InventoryPart[]>('inventory.parts', DEFAULT_PARTS);
  const safeParts = Array.isArray(allParts) && allParts.length > 0 ? allParts : DEFAULT_PARTS;
  const parts = includeHidden ? safeParts : safeParts.filter(p => !p.hidden);

  const getPartByIdOrSlug = (idOrSlug: string | number | undefined): InventoryPart | undefined => {
    if (idOrSlug === undefined || idOrSlug === null || idOrSlug === '') return undefined;
    const searchStr = String(idOrSlug).toLowerCase();
    return safeParts.find(
      p => String(p.id).toLowerCase() === searchStr || (p.slug && p.slug.toLowerCase() === searchStr)
    );
  };

  return { parts, allParts: safeParts, getPartByIdOrSlug };
}

/**
 * Gallery Hook
 * @param includeHidden If false (default), filters out hidden items for public view
 */
export function useInventoryGallery(includeHidden = false): {
  galleryItems: InventoryGalleryItem[];
  allGalleryItems: InventoryGalleryItem[];
} {
  const allGalleryItems = useContent<InventoryGalleryItem[]>('inventory.gallery', DEFAULT_GALLERY);
  const safeGallery = Array.isArray(allGalleryItems) && allGalleryItems.length > 0 ? allGalleryItems : DEFAULT_GALLERY;
  const galleryItems = includeHidden ? safeGallery : safeGallery.filter(g => !g.hidden);

  return { galleryItems, allGalleryItems: safeGallery };
}

/**
 * FAQs Hook
 * @param includeHidden If false (default), filters out hidden items for public view
 */
export function useInventoryFaqs(includeHidden = false): {
  faqs: InventoryFaq[];
  allFaqs: InventoryFaq[];
} {
  const invFaqs = useContent<InventoryFaq[] | null>('inventory.faqs', null);
  const textFaqs = useContent<InventoryFaq[] | null>('faqs.items', null);
  const rawFaqs = invFaqs || textFaqs || DEFAULT_FAQS;
  const safeFaqs = Array.isArray(rawFaqs) && rawFaqs.length > 0 ? rawFaqs : DEFAULT_FAQS;
  const faqs = includeHidden ? safeFaqs : safeFaqs.filter(f => !f.hidden);

  return { faqs, allFaqs: safeFaqs };
}

/**
 * Careers Hook
 * @param includeHidden If false (default), filters out hidden items for public view
 */
export function useInventoryCareers(includeHidden = false): {
  careers: InventoryCareer[];
  allCareers: InventoryCareer[];
  getCareerByIdOrSlug: (idOrSlug: string | number | undefined) => InventoryCareer | undefined;
} {
  const allCareers = useContent<InventoryCareer[]>('inventory.careers', DEFAULT_CAREERS);
  const safeCareers = Array.isArray(allCareers) && allCareers.length > 0 ? allCareers : DEFAULT_CAREERS;
  const careers = includeHidden ? safeCareers : safeCareers.filter(c => !c.hidden);

  const getCareerByIdOrSlug = (idOrSlug: string | number | undefined): InventoryCareer | undefined => {
    if (idOrSlug === undefined || idOrSlug === null || idOrSlug === '') return undefined;
    const searchStr = String(idOrSlug).toLowerCase();
    return safeCareers.find(
      c => String(c.id).toLowerCase() === searchStr || (c.slug && c.slug.toLowerCase() === searchStr)
    );
  };

  return { careers, allCareers: safeCareers, getCareerByIdOrSlug };
}
