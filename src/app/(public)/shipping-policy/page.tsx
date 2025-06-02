export default function Page() {
    return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-800 text-center">Chính Sách Giao Hàng</h1>
      <img
        src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
        alt="Shipping Policy"
        className="mb-6 w-full h-64 object-cover rounded-lg"
      />
      <p className="mb-4 text-gray-700">
        SeedBloom cung cấp dịch vụ giao hàng toàn quốc với các đối tác vận chuyển uy tín, đảm bảo đơn hàng đến tay bạn nhanh chóng và an toàn.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">1. Thời gian giao hàng</h2>
      <p className="mb-4 text-gray-700">
        - Khu vực nội thành: 1-2 ngày làm việc.
        <br />
        - Khu vực ngoại thành và tỉnh thành khác: 3-5 ngày làm việc.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">2. Phí vận chuyển</h2>
      <p className="mb-4 text-gray-700">
        Phí vận chuyển được tính dựa trên trọng lượng đơn hàng và địa chỉ nhận hàng, sẽ được hiển thị rõ ràng trong quá trình thanh toán.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">3. Theo dõi đơn hàng</h2>
      <p className="text-gray-700">
        Sau khi đơn hàng được gửi đi, bạn sẽ nhận được mã vận đơn để theo dõi trạng thái giao hàng qua website của đối tác vận chuyển.
      </p>
    </div>
  );
}
