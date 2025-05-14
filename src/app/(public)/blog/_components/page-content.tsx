"use client";

import { useState, useEffect } from "react";
import { blogPosts } from "@/constants/blogPosts";
import Link from "next/link";
import { BlogPost } from "@/types/index";

export default function PageContent() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Get all blog posts
    setPosts(blogPosts);

    // Extract unique categories from blog posts tags
    const allTags = blogPosts.flatMap((post) => post.tags);
    const uniqueTagsArray = Array.from(new Set(allTags));
    setCategories(uniqueTagsArray);
  }, []);

  // Filter posts by category and search term
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.tags.includes(selectedCategory);
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10">
      <div className="relative mb-10 overflow-hidden bg-gradient-to-r from-primary/10 to-green-500/10 py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4yIiBjeD0iMTAiIGN5PSIxMCIgcj0iMiIvPjwvZz48L3N2Zz4=')] opacity-25"></div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-1/4 rounded-tr-full bg-gradient-to-tr from-green-500/10 to-transparent"></div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Blog & Hướng Dẫn Trồng Hoa
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Khám phá các bài viết, mẹo và hướng dẫn để trồng những loài hoa
              đẹp nhất cho khu vườn của bạn
            </p>

            <div className="relative mx-auto max-w-2xl">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full rounded-full border border-gray-200 bg-white/80 px-5 py-3 pr-12 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="bx bx-search text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Left sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 mb-6 rounded-xl bg-white p-6 shadow-sm">
              <h3 className="relative mb-4 pl-4 text-lg font-semibold text-gray-900">
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary"></span>
                Danh mục
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategory === "all"
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    Tất cả bài viết
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="relative mb-4 pl-4 text-lg font-semibold text-gray-900">
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary"></span>
                  Bài viết nổi bật
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                    >
                      <div className="group flex gap-3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-16 w-20 flex-shrink-0 rounded-md object-cover transition-transform group-hover:scale-105"
                        />
                        <div>
                          <h4 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-primary">
                            {post.title}
                          </h4>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString(
                              "vi-VN",
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="relative mb-4 pl-4 text-lg font-semibold text-gray-900">
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary"></span>
                  Đăng ký nhận bản tin
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Nhận thông báo về các bài viết mới và mẹo trồng hoa hàng tuần.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                  >
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Main blog list */}
          <div className="lg:w-3/4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === "all"
                  ? "Tất cả bài viết"
                  : selectedCategory}
              </h2>
              <div className="text-sm text-gray-500">
                {filteredPosts.length} bài viết
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                <div className="mb-4 text-gray-400">
                  <i className="bx bx-search-alt-2 text-6xl"></i>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                  Không tìm thấy bài viết
                </h3>
                <p className="mb-4 text-gray-500">
                  Không có bài viết nào phù hợp với tìm kiếm của bạn.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="inline-flex items-center rounded-md bg-primary/10 px-4 py-2 text-primary transition-colors hover:bg-primary/20"
                >
                  <i className="bx bx-reset mr-2"></i>
                  Đặt lại tìm kiếm
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="md:flex">
                      <div className="h-60 overflow-hidden md:h-auto md:w-1/3">
                        <Link href={`/blog/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-primary">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorName)}&background=random`}
                                alt={post.authorName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-800">
                                {post.authorName}
                              </span>
                              <div className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString(
                                  "vi-VN",
                                )}
                              </div>
                            </div>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                          >
                            <span>Đọc tiếp</span>
                            <i className="bx bx-right-arrow-alt ml-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
