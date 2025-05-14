import { getCategories } from "@/api/categories-api";
import { CategoryCard } from "@/components/category-card";
import { PageLoading } from "@/components/page-loading";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CategorySession() {
  const {
    data: { data: categories = [] } = {},
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getCategories({
        limit: 6,
      }),
  });

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-montserrat text-2xl font-bold text-gray-800">
          Danh mục nổi bật
        </h2>
        <Link
          href="/categories"
          className="flex items-center font-medium text-primary hover:text-primary-dark"
        >
          <span>Xem tất cả</span>
          <i className="bx bx-right-arrow-alt ml-1" />
        </Link>
      </div>

      {isLoadingCategories ? (
        <div className="flex items-center justify-center p-10">
          <PageLoading />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      )}
    </section>
  );
}
