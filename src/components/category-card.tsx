import Link from "next/link";

import type { Category } from "../types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?categoryId=${category.id}`}
      className="group"
    >
      <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="h-32 overflow-hidden md:h-36">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3 text-center">
          <h3 className="font-medium text-gray-800">{category.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {category.productCount} sản phẩm
          </p>
        </div>
      </div>
    </Link>
  );
}
