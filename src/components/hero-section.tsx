import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-primary-light">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="mb-4 font-montserrat text-3xl font-bold text-primary-dark md:text-4xl lg:text-5xl">
              Trồng hoa, <br />
              Gieo niềm vui mới
            </h1>
            <p className="mb-6 text-lg text-gray-700">
              Khám phá bộ sưu tập đa dạng các loại hạt giống hoa chất lượng cao,
              giúp khu vườn của bạn luôn rực rỡ sắc màu quanh năm.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/products"
                className="btn-primary"
              >
                <span>Mua ngay</span>
                <i className="bx bx-right-arrow-alt ml-2" />
              </Link>
              <Link
                href="/about"
                className="btn-secondary"
              >
                <span>Tìm hiểu thêm</span>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1527863280617-15596f92e5c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
              alt="Hình ảnh vườn hoa đẹp"
              className="h-80 w-full rounded-lg object-cover shadow-lg md:h-[400px]"
            />
          </div>
        </div>
      </div>
      <div className="from-gray-light absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t to-transparent" />
    </section>
  );
}
