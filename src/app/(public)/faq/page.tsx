export default function Page() {
   return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-800 text-center">Câu Hỏi Thường Gặp (FAQ)</h1>
      <img
        src="https://plus.unsplash.com/premium_photo-1679870686437-2c3eb1de46d0?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="FAQ illustration"
        className="mb-6 w-full h-64 object-cover rounded-lg"
      />
      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">1. Tôi có thể đặt hàng qua những kênh nào?</h2>
          <p>
            Bạn có thể đặt hàng trực tiếp tại website SeedBloom.vn hoặc liên hệ qua fanpage Facebook, Zalo và hotline để được hỗ trợ.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">2. Tôi có thể thanh toán bằng hình thức nào?</h2>
          <p>
            Chúng tôi chấp nhận thanh toán qua cổng giao dịch của zalopay( zalopay, ngân hàng, VISA,...), hoặc thanh toán khi nhận hàng (COD).
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">3. Tôi có thể huỷ đơn hàng sau khi đặt không?</h2>
          <p>
            Bạn có thể huỷ đơn hàng nếu đơn chưa được giao cho đơn vị vận chuyển. Vui lòng liên hệ ngay với chúng tôi để hỗ trợ nhanh nhất.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">4. Hạt giống có thể bảo quản trong bao lâu?</h2>
          <p>
            Hạt giống có hạn sử dụng từ 6 đến 18 tháng tùy loại. Bảo quản nơi khô ráo, thoáng mát để đảm bảo chất lượng hạt tốt nhất.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">5. Nếu tôi trồng không nảy mầm thì sao?</h2>
          <p>
            Trong trường hợp sản phẩm có vấn đề chất lượng, chúng tôi sẵn sàng hỗ trợ đổi trả miễn phí hoặc tư vấn kỹ thuật tận tình.
          </p>
        </div>
      </div>
    </div>
  );
}
