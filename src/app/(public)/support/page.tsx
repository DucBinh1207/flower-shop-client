export default function Page() {
   return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-800 text-center">Hỗ Trợ Khách Hàng</h1>
      <img
        src="https://plus.unsplash.com/premium_photo-1666299884107-2c2cf920ee59?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Customer Support"
        className="mb-6 w-full h-64 object-cover rounded-lg"
      />
      <p className="mb-4 text-gray-700">
        Đội ngũ hỗ trợ của SeedBloom luôn sẵn sàng đồng hành cùng bạn trong suốt quá trình mua sắm và trồng cây. Nếu bạn gặp bất kỳ vấn đề gì, đừng ngần ngại liên hệ với chúng tôi.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">1. Thời gian hỗ trợ</h2>
      <p className="mb-4 text-gray-700">
        - Thứ 2 - Thứ 7: 8:00 - 20:00 <br />
        - Chủ nhật: 9:00 - 17:00
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">2. Các kênh liên hệ</h2>
      <ul className="mb-4 text-gray-700 list-disc list-inside">
        <li>Email: support@seedbloom.vn</li>
        <li>Hotline: 0123 456 789</li>
        <li>Fanpage: facebook.com/seedbloom.vn</li>
        <li>Zalo: 0123 456 789</li>
      </ul>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">3. Hướng dẫn kỹ thuật</h2>
      <p className="mb-4 text-gray-700">
        Chúng tôi cung cấp tài liệu và video hướng dẫn trồng từng loại hoa. Ngoài ra, bạn có thể đặt lịch tư vấn 1-1 cùng chuyên gia nếu gặp khó khăn khi trồng.
      </p>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">4. Phản hồi & khiếu nại</h2>
      <p className="text-gray-700">
        Mọi góp ý, phản hồi hoặc khiếu nại sẽ được xử lý trong vòng 24 giờ làm việc. Hãy cho chúng tôi biết để ngày càng phục vụ bạn tốt hơn!
      </p>
    </div>
  );
}
