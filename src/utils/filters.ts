import { Product } from "../types";

type SortOption =
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating"
  | "popularity";

// Sort products
export function sortProducts(
  products: Product[],
  sortBy: SortOption,
): Product[] {
  switch (sortBy) {
    case "price-asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "newest":
      return [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "rating":
      return [...products].sort((a, b) => b.rating - a.rating);
    case "popularity":
      return [...products].sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return products;
  }
}

// Filter products by price range
export function filterByPriceRange(
  products: Product[],
  minPrice: number,
  maxPrice: number,
): Product[] {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice,
  );
}

// Filter products by special tags
export function filterByTags(
  products: Product[],
  options: { isNew?: boolean; isBestSeller?: boolean; hasDiscount?: boolean },
): Product[] {
  return products.filter((product) => {
    if (options.isNew && !product.isNew) return false;
    if (options.isBestSeller && !product.isBestSeller) return false;
    if (options.hasDiscount && !product.discount) return false;
    return true;
  });
}

// Format price to Vietnamese currency
export function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "₫";
}

// Calculate discount percentage
export function calculateDiscountPercentage(
  originalPrice: number,
  currentPrice: number,
): number {
  if (!originalPrice || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
