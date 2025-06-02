export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-800 text-center">Điều Khoản Sử Dụng</h1>
      <img
        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
        alt="Terms and Conditions"
        className="mb-6 w-full h-64 object-cover rounded-lg"
      />
      <p className="mb-4 text-gray-700">
        Khi truy cập và sử dụng website SeedBloom, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">1. Quyền sở hữu trí tuệ</h2>
      <p className="mb-4 text-gray-700">
        Tất cả nội dung trên website, bao gồm hình ảnh, văn bản, logo và thiết kế, thuộc quyền sở hữu của SeedBloom và được bảo vệ bởi luật pháp.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">2. Trách nhiệm người dùng</h2>
      <p className="mb-4 text-gray-700">
        Bạn cam kết không sử dụng website vào mục đích trái pháp luật, gây hại hoặc can thiệp vào hoạt động của website.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">3. Thay đổi điều khoản</h2>
      <p className="text-gray-700">
        SeedBloom có quyền thay đổi điều khoản sử dụng bất kỳ lúc nào. Những thay đổi sẽ được cập nhật trên website và có hiệu lực ngay khi đăng tải.
      </p>
    </div>
  );
}
