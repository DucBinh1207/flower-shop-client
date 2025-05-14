"use client";

import { useEffect, useState } from "react";
import {
  blogPosts,
  getBlogPostBySlug,
  getRecentBlogPosts,
} from "@/constants/blogPosts";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BlogPost } from "@/types/index";

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = () => {
      const foundPost = getBlogPostBySlug(slug);

      if (foundPost) {
        setPost(foundPost);

        // Get blog posts with similar tags
        const sameTags = blogPosts
          .filter(
            (p) =>
              p.id !== foundPost.id &&
              p.tags.some((tag) => foundPost.tags.includes(tag)),
          )
          .slice(0, 3);

        // If we don't have enough related posts, add recent posts
        let finalRelatedPosts = [...sameTags];
        if (finalRelatedPosts.length < 3) {
          const recentPosts = getRecentBlogPosts(5).filter(
            (p) =>
              p.id !== foundPost.id &&
              !finalRelatedPosts.some((rp) => rp.id === p.id),
          );

          finalRelatedPosts = [...finalRelatedPosts, ...recentPosts].slice(
            0,
            3,
          );
        }

        setRelatedPosts(finalRelatedPosts);
      } else {
        // Post not found, redirect to blog listing
        router.push("/blog");
      }

      setIsLoading(false);
    };

    fetchPost();
  }, [slug]);

  // Function to get reading time based on content length
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const numberOfWords = text.split(/\s/g).length;
    const readingTime = Math.ceil(numberOfWords / wordsPerMinute);
    return readingTime;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Bài viết không tồn tại
        </h1>
        <p className="mb-8 text-gray-600">
          Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-white transition-colors hover:bg-primary-dark"
        >
          <i className="bx bx-arrow-back mr-2"></i>
          Quay lại trang blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10">
      {/* Hero section */}
      <div className="relative mb-12 overflow-hidden bg-gradient-to-r from-primary/10 to-green-500/10 py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4yIiBjeD0iMTAiIGN5PSIxMCIgcj0iMiIvPjwvZz48L3N2Zz4=')] opacity-25"></div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-1/4 rounded-tr-full bg-gradient-to-tr from-green-500/10 to-transparent"></div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="rounded-full bg-white/80 px-3 py-1 text-sm text-primary backdrop-blur-sm transition-colors hover:bg-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 md:text-4xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <i className="bx bx-calendar mr-1.5"></i>
                <span>
                  {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex items-center">
                <i className="bx bx-time mr-1.5"></i>
                <span>{getReadingTime(post.content)} phút đọc</span>
              </div>
              <div className="flex items-center">
                <i className="bx bx-user mr-1.5"></i>
                <span>{post.authorName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-sm">
          {/* Featured image */}
          <div className="h-72 overflow-hidden sm:h-96">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Blog content */}
          <div className="p-6 sm:p-10">
            <div
              className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-800 prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-img:rounded-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author section */}
            <div className="mt-12 border-t border-gray-100 pt-8">
              <div className="flex items-center">
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorName)}&background=random`}
                    alt={post.authorName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {post.authorName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Chuyên gia về hạt giống và trồng hoa
                  </p>
                </div>
              </div>
            </div>

            {/* Tags & Sharing */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-gray-700">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Chia sẻ:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-600"
                    aria-label="Chia sẻ lên Facebook"
                  >
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-500"
                    aria-label="Chia sẻ lên Twitter"
                  >
                    <i className="bx bxl-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-red-100 hover:text-red-600"
                    aria-label="Chia sẻ qua email"
                  >
                    <i className="bx bx-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-6xl">
            <h2 className="relative mb-8 pl-5 text-2xl font-bold text-gray-800">
              <span className="absolute left-0 top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-full bg-primary"></span>
              Bài viết liên quan
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                >
                  <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center text-xs text-gray-500">
                        <i className="bx bx-calendar mr-1"></i>
                        <span>
                          {new Date(relatedPost.createdAt).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                      </div>
                      <h3 className="mb-2 line-clamp-2 font-semibold text-gray-800 transition-colors group-hover:text-primary">
                        {relatedPost.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
                        <span>Đọc tiếp</span>
                        <i className="bx bx-right-arrow-alt ml-1"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to blog */}
        <div className="mx-auto mt-12 max-w-4xl text-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-white transition-colors hover:bg-primary-dark"
          >
            <i className="bx bx-arrow-back mr-2"></i>
            Quay lại trang blog
          </Link>
        </div>
      </div>
    </div>
  );
}
