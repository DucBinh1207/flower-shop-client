export default function Page() {
 return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-800 text-center">Chính Sách Bảo Mật</h1>
      <img
        src="https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Privacy Policy"
        className="mb-6 w-full h-64 object-cover rounded-lg"
      />
      <p className="mb-4 text-gray-700">
        SeedBloom cam kết bảo vệ quyền riêng tư của khách hàng. Chúng tôi thu thập và sử dụng thông tin cá nhân một cách minh bạch và tuân thủ các quy định pháp luật hiện hành.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">1. Thông tin thu thập</h2>
      <p className="mb-4 text-gray-700">
        Chúng tôi thu thập các thông tin như họ tên, địa chỉ, số điện thoại, email và thông tin thanh toán để xử lý đơn hàng và cung cấp dịch vụ tốt nhất.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">2. Mục đích sử dụng</h2>
      <p className="mb-4 text-gray-700">
        Thông tin cá nhân được sử dụng để xác nhận đơn hàng, giao hàng, hỗ trợ khách hàng và gửi thông tin khuyến mãi nếu được sự đồng ý của bạn.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">3. Bảo mật thông tin</h2>
      <p className="mb-4 text-gray-700">
        Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin cá nhân khỏi truy cập trái phép, mất mát hoặc phá hoại.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">4. Quyền của khách hàng</h2>
      <p className="text-gray-700">
        Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân của mình bằng cách liên hệ với chúng tôi qua email: support@seedbloom.vn.
      </p>
    </div>
  );
}
