import Link from "next/link";
import type { BlogPost } from "../types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center text-sm text-gray-500">
          <span className="mr-4 flex items-center">
            <i className="bx bx-calendar mr-1" />
            <span>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
          </span>
          <span className="flex items-center">
            <i className="bx bx-user mr-1" />
            <span>{post.authorName}</span>
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold transition-colors duration-300 hover:text-primary">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mb-4 text-sm text-gray-600">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center text-sm font-medium text-primary hover:text-primary-dark"
        >
          <span>Đọc tiếp</span>
          <i className="bx bx-right-arrow-alt ml-1" />
        </Link>
      </div>
    </div>
  );
}
