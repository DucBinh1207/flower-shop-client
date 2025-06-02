export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
          Về Chúng Tôi
        </h1>

        <div className="mb-12 overflow-hidden rounded-lg bg-white shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
            alt="SeedBloom team"
            className="h-80 w-full object-cover md:h-96"
          />
          <div className="p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Câu chuyện của chúng tôi
            </h2>
            <p className="mb-4 text-gray-700">
              SeedBloom được thành lập vào năm 2018 bởi một nhóm những người đam
              mê làm vườn với mong muốn mang đến cho mọi người những hạt giống
              hoa chất lượng cao, góp phần tạo nên những khu vườn xinh đẹp và
              không gian sống xanh hơn.
            </p>
            <p className="mb-4 text-gray-700">
              Từ một cửa hàng nhỏ ở thành phố Hồ Chí Minh, chúng tôi đã không
              ngừng phát triển và hiện đã trở thành một trong những đơn vị cung
              cấp hạt giống hoa uy tín nhất tại Việt Nam, với hơn 500 loại hạt
              giống hoa từ khắp nơi trên thế giới.
            </p>
            <p className="text-gray-700">
              Sứ mệnh của chúng tôi là đơn giản: Giúp mọi người dễ dàng tạo ra
              không gian xanh và góc vườn đẹp của riêng mình, bất kể họ sống ở
              đâu và có bao nhiêu kinh nghiệm làm vườn.
            </p>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <i className="bx bx-check-shield text-3xl text-primary"></i>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              Sứ mệnh
            </h3>
            <p className="text-gray-700">
              Mang đến những hạt giống hoa chất lượng cao, đa dạng và phù hợp
              với điều kiện khí hậu Việt Nam, giúp mọi người dễ dàng tạo ra
              không gian sống xanh và đẹp.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <i className="bx bx-bulb text-3xl text-primary"></i>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              Tầm nhìn
            </h3>
            <p className="text-gray-700">
              Trở thành thương hiệu hàng đầu về cung cấp hạt giống hoa tại Việt
              Nam và khu vực Đông Nam Á, với sản phẩm chất lượng cao và dịch vụ
              khách hàng xuất sắc.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <i className="bx bx-heart text-3xl text-primary"></i>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              Giá trị cốt lõi
            </h3>
            <p className="text-gray-700">
              Chất lượng, tính trung thực, sự đổi mới, dịch vụ khách hàng và
              trách nhiệm với môi trường là những giá trị cốt lõi định hướng mọi
              hoạt động của chúng tôi.
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-lg bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Đội ngũ của chúng tôi
          </h2>

          <div className=" gap-6 justify-center flex">
            <div className="text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent("Trần Đức Bình")}&background=random`}
                alt="Nguyễn Thị Mai"
                className="mx-auto mb-3 h-32 w-32 rounded-full object-cover"
              />
              <h3 className="font-semibold text-gray-800">Trần Đức Bình</h3>
              <p className="text-primary">Nhà sáng lập</p>
            </div>
          </div>
        </div>

        <div className="mb-12 rounded-lg bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Cam kết của chúng tôi
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 mt-1 rounded-full bg-primary-light p-2">
                <i className="bx bx-check text-xl text-primary"></i>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">
                  Chất lượng hàng đầu
                </h3>
                <p className="text-gray-700">
                  Chúng tôi cam kết cung cấp hạt giống hoa chất lượng cao với tỷ
                  lệ nảy mầm tốt, được chọn lọc kỹ lưỡng từ các nhà cung cấp uy
                  tín trong và ngoài nước.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-1 rounded-full bg-primary-light p-2">
                <i className="bx bx-check text-xl text-primary"></i>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">
                  Hỗ trợ khách hàng
                </h3>
                <p className="text-gray-700">
                  Đội ngũ tư vấn viên giàu kinh nghiệm của chúng tôi luôn sẵn
                  sàng hỗ trợ bạn 24/7, từ việc chọn loại hạt giống phù hợp đến
                  các vấn đề về chăm sóc cây trồng.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-1 rounded-full bg-primary-light p-2">
                <i className="bx bx-check text-xl text-primary"></i>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-800">
                  Bảo vệ môi trường
                </h3>
                <p className="text-gray-700">
                  Chúng tôi cam kết thực hiện các biện pháp bảo vệ môi trường
                  trong mọi hoạt động kinh doanh, từ việc sử dụng bao bì thân
                  thiện với môi trường đến hỗ trợ các chương trình trồng cây
                  xanh.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-primary/10 p-6 text-center md:p-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Hãy kết nối với chúng tôi
          </h2>
          <p className="mb-6 text-gray-700">
            Chúng tôi luôn mong muốn được lắng nghe ý kiến từ khách hàng để
            không ngừng cải thiện sản phẩm và dịch vụ.
          </p>
          <a
            href="/contact"
            className="btn-primary inline-flex"
          >
            <span>Liên hệ ngay</span>
            <i className="bx bx-right-arrow-alt ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
