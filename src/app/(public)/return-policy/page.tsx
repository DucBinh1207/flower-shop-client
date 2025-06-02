export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-800 text-center">Chính Sách Đổi Trả</h1>
      <img
        src="https://plus.unsplash.com/premium_photo-1728201191996-4d345403b461?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Return Policy"
        className="mb-6 w-full h-64 object-cover rounded-lg"
      />
      <p className="mb-4 text-gray-700">
        SeedBloom mong muốn mang đến sự hài lòng tuyệt đối cho khách hàng. Nếu bạn không hài lòng với sản phẩm, chúng tôi hỗ trợ đổi trả theo chính sách sau.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">1. Thời gian đổi trả</h2>
      <p className="mb-4 text-gray-700">
        Bạn có thể yêu cầu đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">2. Điều kiện đổi trả</h2>
      <p className="mb-4 text-gray-700">
        - Sản phẩm còn nguyên tem, nhãn, chưa qua sử dụng.
        <br />
        - Có hóa đơn mua hàng hoặc thông tin đơn hàng.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">3. Quy trình đổi trả</h2>
      <p className="text-gray-700">
        Vui lòng liên hệ bộ phận hỗ trợ khách hàng qua email: support@seedbloom.vn hoặc hotline: 0123 456 789 để được hướng dẫn chi tiết.
      </p>
    </div>
  );
}
