import { Package, Truck, HeadphonesIcon, RefreshCw } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Sản phẩm chất lượng</h3>
            <p className="text-sm text-gray-600">
              Hạt giống được chọn lọc kỹ càng, đảm bảo tỷ lệ nảy mầm cao
            </p>
          </div>

          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              Vận chuyển nhanh chóng
            </h3>
            <p className="text-sm text-gray-600">
              Giao hàng toàn quốc từ 2-5 ngày, miễn phí cho đơn từ 300K
            </p>
          </div>

          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <HeadphonesIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Hỗ trợ chuyên nghiệp</h3>
            <p className="text-sm text-gray-600">
              Đội ngũ tư vấn viên giàu kinh nghiệm, sẵn sàng hỗ trợ 24/7
            </p>
          </div>

          <div className="flex flex-col items-center p-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <RefreshCw className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Đổi trả dễ dàng</h3>
            <p className="text-sm text-gray-600">
              Chính sách đổi trả trong 7 ngày nếu sản phẩm không đạt chất lượng
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
