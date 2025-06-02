/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";

import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 pb-8 pt-16 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="footer-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 20 L40 20 M20 0 L20 40"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#footer-pattern)"
          />
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-bl-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 h-1/4 w-1/4 rounded-tr-full bg-gradient-to-tr from-green-500/10 to-transparent blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mb-6 inline-block rounded-lg bg-white/5 p-4 backdrop-blur-sm">
              <Logo
                size="large"
                variant="light"
              />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-300">
              SeedBloom cung cấp các sản phẩm hạt giống hoa chất lượng cao, giúp
              bạn tạo nên khu vườn tuyệt đẹp của riêng mình. Chúng tôi cam kết
              mang đến những loại hạt giống tốt nhất cùng dịch vụ chuyên nghiệp.
            </p>

            <div className="mb-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Facebook"
              >
                <i className="bx bxl-facebook text-lg" />
              </a>
              <a
                href="#"
                className="rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Instagram"
              >
                <i className="bx bxl-instagram text-lg" />
              </a>
              <a
                href="#"
                className="rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="YouTube"
              >
                <i className="bx bxl-youtube text-lg" />
              </a>
              <a
                href="#"
                className="rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="TikTok"
              >
                <i className="bx bxl-tiktok text-lg" />
              </a>
            </div>

            <div className="mb-6">
              <p className="mb-3 font-medium text-white">
                Phương thức thanh toán:
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="rounded-md bg-white p-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/64/5968/5968299.png"
                    alt="Visa"
                    className="h-6 w-auto"
                  />
                </div>
                <div className="rounded-md bg-white p-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/64/5968/5968144.png"
                    alt="Mastercard"
                    className="h-6 w-auto"
                  />
                </div>
                <div className="rounded-md bg-white p-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/64/5968/5968220.png"
                    alt="Paypal"
                    className="h-6 w-auto"
                  />
                </div>
                <div className="rounded-md bg-white p-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/64/6033/6033926.png"
                    alt="COD"
                    className="h-6 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="space-y-4">
                <h3 className="relative inline-block text-lg font-semibold text-white">
                  Thông tin
                  <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-gradient-to-r from-primary to-green-400" />
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <Link
                      href="/about"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Về chúng tôi</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Chính sách bảo mật</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Điều khoản dịch vụ</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shipping-policy"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Chính sách vận chuyển</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/return-policy"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Chính sách đổi trả</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="relative inline-block text-lg font-semibold text-white">
                  Tài khoản
                  <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-gradient-to-r from-primary to-green-400" />
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <Link
                      href="/login"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Đăng nhập</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Đăng ký</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Giỏ hàng</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wishlist"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Yêu thích</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/orders"
                      className="group inline-flex items-center transition-colors hover:text-white"
                    >
                      <i className="bx bx-chevron-right -ml-4 mr-1 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      <span>Theo dõi đơn hàng</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="relative inline-block text-lg font-semibold text-white">
                  Liên hệ
                  <span className="absolute -bottom-1 left-0 h-0.5 w-12 bg-gradient-to-r from-primary to-green-400" />
                </h3>
                <ul className="space-y-4 text-sm text-gray-300">
                  <li className="flex items-start">
                    <div className="mr-3 shrink-0 rounded-md bg-white/10 p-2">
                      <i className="bx bx-map text-primary" />
                    </div>
                    <span>
                      Số 28 Nguyễn Phi Khanh, Thạc Gián, Thanh Khê, Đà Nẵng
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 shrink-0 rounded-md bg-white/10 p-2">
                      <i className="bx bx-phone text-primary" />
                    </div>
                    <span>0123.456.789</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 shrink-0 rounded-md bg-white/10 p-2">
                      <i className="bx bx-envelope text-primary" />
                    </div>
                    <span>info@seedbloom.vn</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 shrink-0 rounded-md bg-white/10 p-2">
                      <i className="bx bx-time text-primary" />
                    </div>
                    <span>8:00 - 20:00, Thứ Hai - Chủ Nhật</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <form className="mb-6 sm:mb-0 sm:w-96">
                  <p className="mb-2 font-medium text-white">
                    Đăng ký nhận thông tin
                  </p>
                  <p className="mb-3 text-sm text-gray-400">
                    Nhận thông tin về sản phẩm mới, khuyến mãi và mẹo trồng hoa.
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Nhập email của bạn"
                      className="flex-1 rounded-l-md px-4 py-2.5 text-gray-900 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-r-md bg-gradient-to-r from-primary to-green-500 px-4 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Đăng ký
                    </button>
                  </div>
                </form>

                <div className="flex items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6702/6702545.png"
                    alt="Chứng nhận"
                    className="h-10 w-auto"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      Đã xác thực
                    </span>
                    <span className="text-xs text-gray-400">
                      An toàn & Bảo mật
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center md:flex md:justify-between">
          <p className="mb-4 text-sm text-gray-400 md:mb-0">
            © 2023 SeedBloom. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              href="/blog"
              className="text-sm text-gray-400 hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-400 hover:text-white"
            >
              Liên hệ
            </Link>
            <Link
              href="/faq"
              className="text-sm text-gray-400 hover:text-white"
            >
              FAQ
            </Link>
            <Link
              href="/support"
              className="text-sm text-gray-400 hover:text-white"
            >
              Hỗ trợ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
