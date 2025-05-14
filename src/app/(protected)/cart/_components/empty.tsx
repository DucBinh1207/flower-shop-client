import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Giỏ hàng của bạn
      </h1>
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <i className="bx bx-cart mb-4 text-8xl text-gray-300"></i>
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Giỏ hàng của bạn đang trống
          </h2>
          <p className="mb-6 text-gray-600">
            Hãy thêm sản phẩm vào giỏ hàng để tiến hành mua hàng.
          </p>
          <Link
            href="/"
            className="btn-primary"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
