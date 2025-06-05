"use client";

import Link from "next/link";

import { BlogCard } from "@/components/blog-card";
import { CategoryCard } from "@/components/category-card";
import { FeatureCard } from "@/components/feature-card";
import { HeroSection } from "@/components/hero-section";
import { Newsletter } from "@/components/newsletter";
import { TestimonialCard } from "@/components/testimonial-card";
import { getRecentBlogPosts } from "@/constants/blogPosts";
import { categories } from "@/constants/categories";

import ProductSession from "./_components/product-session";
import CategorySession from "./_components/category-session";

export default function Page() {
  const featuredCategories = categories.slice(0, 6);
  const recentBlogPosts = getRecentBlogPosts(3);

  const features = [
    {
      icon: "bx-package",
      title: "Sản phẩm chất lượng",
      description: "Hạt giống được chọn lọc kỹ càng, đảm bảo tỷ lệ nảy mầm cao",
    },
    {
      icon: "bxs-truck",
      title: "Vận chuyển nhanh chóng",
      description: "Giao hàng toàn quốc từ 2-5 ngày, miễn phí cho đơn từ 300K",
    },
    {
      icon: "bx-support",
      title: "Hỗ trợ chuyên nghiệp",
      description: "Đội ngũ tư vấn viên giàu kinh nghiệm, sẵn sàng hỗ trợ 24/7",
    },
    {
      icon: "bx-refresh",
      title: "Đổi trả dễ dàng",
      description:
        "Chính sách đổi trả trong 7 ngày nếu sản phẩm không đạt chất lượng",
    },
  ];

  const testimonials = [
    {
      content:
        "Tôi đã mua hạt giống hoa hồng từ SeedBloom và thực sự ấn tượng với chất lượng. Tỷ lệ nảy mầm cao và cây phát triển khỏe mạnh. Sẽ tiếp tục ủng hộ shop!",
      name: "Nguyễn Thị Thanh",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5,
    },
    {
      content:
        "Nhân viên tư vấn rất nhiệt tình và chuyên nghiệp. Họ đã giúp tôi chọn được loại hạt giống phù hợp với khu vườn nhỏ của mình. Sản phẩm đúng như mô tả và giao hàng nhanh chóng.",
      name: "Trần Văn Minh",
      avatar: "https://i.pravatar.cc/150?img=59",
      rating: 4.5,
    },
    {
      content:
        "Đây là lần đầu tiên tôi trồng hoa từ hạt giống và thật bất ngờ khi thấy kết quả tuyệt vời như vậy. Bài viết hướng dẫn trên website rất chi tiết và dễ hiểu. Chắc chắn sẽ quay lại mua thêm.",
      name: "Lê Thị Hương",
      avatar: "https://i.pravatar.cc/150?img=47",
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <CategorySession />

      {/* Product Section */}
      <ProductSession />

      {/* Features Section */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-montserrat text-2xl font-bold text-gray-800">
            Bài viết hướng dẫn
          </h2>
          <Link
            href="/blog"
            className="flex items-center font-medium text-primary hover:text-primary-dark"
          >
            <span>Xem tất cả</span>
            <i className="bx bx-right-arrow-alt ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {recentBlogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="relative bg-primary/10 px-4 py-8 md:py-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
                alt="Bộ sưu tập hạt giống mùa xuân"
                className="mx-auto h-64 w-full rounded-lg object-cover shadow-lg md:h-80 md:w-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-10">
              <h2 className="mb-4 font-montserrat text-2xl font-bold text-primary md:text-3xl">
                Bộ sưu tập hạt giống mùa xuân 2024
              </h2>
              <p className="mb-6 text-gray-700">
                Khám phá bộ sưu tập hạt giống hoa đặc biệt dành cho mùa xuân với
                nhiều loại hoa đẹp, dễ trồng và phù hợp với khí hậu Việt Nam.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                {/* <Link href="/promotions" className="btn-primary">
                  <span>Khám phá ngay</span>
                  <i className="bx bx-right-arrow-alt ml-2" />
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h2 className="mb-2 font-montserrat text-2xl font-bold text-gray-800">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Chúng tôi luôn lắng nghe và cải thiện dịch vụ dựa trên phản hồi của
            khách hàng để mang đến trải nghiệm tốt nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
