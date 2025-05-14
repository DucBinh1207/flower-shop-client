export interface Comment {
  id: string;
  productId: string;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  createdAt: string;
}

export const comments: Comment[] = [
  {
    id: " 1",
    productId: " 1",
    userId: 2,
    userName: "Nguyễn Thị Thanh",
    userAvatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    content:
      "Tôi đã mua hạt giống hoa hồng từ SeedBloom và thực sự ấn tượng với chất lượng. Tỷ lệ nảy mầm cao và cây phát triển khỏe mạnh. Sẽ tiếp tục ủng hộ shop!",
    createdAt: "2023-02-15",
  },
  {
    id: " 2",
    productId: " 1",
    userId: 3,
    userName: "Trần Văn Minh",
    userAvatar: "https://i.pravatar.cc/150?img=59",
    rating: 4,
    content:
      "Hạt giống chất lượng tốt, tuy nhiên đóng gói có thể cải thiện thêm. Hoa nở rất đẹp, màu sắc rực rỡ đúng như mô tả.",
    createdAt: "2023-02-20",
  },
  {
    id: " 3",
    productId: " 1",
    userId: 4,
    userName: "Lê Thị Hương",
    userAvatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    content:
      "Đây là lần đầu tiên tôi trồng hoa hồng từ hạt giống và kết quả thật đáng ngạc nhiên. Cảm ơn shop vì những hướng dẫn chi tiết kèm theo sản phẩm!",
    createdAt: "2023-03-05",
  },
  {
    id: " 4",
    productId: " 1",
    userId: 5,
    userName: "Phạm Văn Đức",
    userAvatar: "https://i.pravatar.cc/150?img=68",
    rating: 4,
    content:
      "Hạt giống tốt, tuy nhiên thời gian nảy mầm hơi lâu hơn so với mô tả. Nhưng kết quả cuối cùng rất đáng hài lòng. Shop tư vấn nhiệt tình.",
    createdAt: "2023-03-15",
  },
  {
    id: " 5",
    productId: " 2",
    userId: 2,
    userName: "Nguyễn Thị Thanh",
    userAvatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    content:
      "Hoa hướng dương mọc rất nhanh và khỏe, chỉ sau 2 tháng đã bắt đầu ra hoa. Kích thước hoa lớn hơn mong đợi, rất đẹp!",
    createdAt: "2023-03-25",
  },
  {
    id: " 6",
    productId: " 2",
    userId: 6,
    userName: "Hoàng Văn Nam",
    userAvatar: "https://i.pravatar.cc/150?img=52",
    rating: 5,
    content:
      "Tôi mua hạt giống này để dạy con cách trồng cây và kết quả thật tuyệt vời. Cây mọc nhanh, khỏe và hoa rất to. Sẽ mua lại!",
    createdAt: "2023-04-02",
  },
  {
    id: " 7",
    productId: " 3",
    userId: 7,
    userName: "Trần Thị Mai",
    userAvatar: "https://i.pravatar.cc/150?img=41",
    rating: 4,
    content:
      "Hoa lan hồ điệp khá khó trồng từ hạt nhưng với hướng dẫn chi tiết từ shop, tôi đã thành công. Tuy nhiên, cần kiên nhẫn vì thời gian nảy mầm khá lâu.",
    createdAt: "2023-08-10",
  },
  {
    id: " 8",
    productId: " 3",
    userId: 8,
    userName: "Lý Văn Tùng",
    userAvatar: "https://i.pravatar.cc/150?img=53",
    rating: 3,
    content:
      "Quá trình trồng lan từ hạt khá phức tạp và cần nhiều điều kiện đặc biệt. Tỷ lệ nảy mầm không cao lắm, nhưng những cây sống được rất đẹp.",
    createdAt: "2023-09-05",
  },
  {
    id: " 9",
    productId: " 4",
    userId: 4,
    userName: "Lê Thị Hương",
    userAvatar: "https://i.pravatar.cc/150?img=47",
    rating: 4,
    content:
      "Hoa cúc rất dễ trồng và ra nhiều hoa. Tỷ lệ nảy mầm cao. Tuy nhiên, màu sắc hoa không đa dạng như mong đợi.",
    createdAt: "2023-04-15",
  },
  {
    id: " 10",
    productId: " 4",
    userId: 9,
    userName: "Võ Thị Lan",
    userAvatar: "https://i.pravatar.cc/150?img=39",
    rating: 3,
    content:
      "Hạt giống tốt nhưng cần cải thiện vấn đề đa dạng màu sắc. Phần lớn hoa nở ra màu vàng thay vì đa sắc như mô tả.",
    createdAt: "2023-05-10",
  },
  {
    id: " 11",
    productId: " 5",
    userId: 10,
    userName: "Đỗ Văn Hùng",
    userAvatar: "https://i.pravatar.cc/150?img=70",
    rating: 5,
    content:
      "Hoa tulip nở rất đẹp và đúng màu như mô tả. Tuy nhiên cần chú ý thời vụ trồng và điều kiện thời tiết. Shop tư vấn rất tận tình!",
    createdAt: "2023-06-01",
  },
  {
    id: " 12",
    productId: " 5",
    userId: 3,
    userName: "Trần Văn Minh",
    userAvatar: "https://i.pravatar.cc/150?img=59",
    rating: 4,
    content:
      "Tulip hơi khó trồng trong điều kiện khí hậu Việt Nam, nhưng với hướng dẫn từ shop, tôi đã thành công. Hoa rất đẹp!",
    createdAt: "2023-06-15",
  },
  {
    id: " 13",
    productId: " 6",
    userId: 11,
    userName: "Nguyễn Thị Hà",
    userAvatar: "https://i.pravatar.cc/150?img=33",
    rating: 4,
    content:
      "Phong lan tím rất khó trồng từ hạt, nhưng tôi đã thử và kết quả khá ổn. Quá trình trồng cần nhiều kiên nhẫn và công sức.",
    createdAt: "2023-09-20",
  },
  {
    id: " 14",
    productId: " 6",
    userId: 12,
    userName: "Lê Văn Thành",
    userAvatar: "https://i.pravatar.cc/150?img=60",
    rating: 4,
    content:
      "Hạt giống chất lượng tốt, tuy nhiên thời gian nảy mầm và phát triển khá lâu. Cần kiên nhẫn và chăm sóc đúng cách.",
    createdAt: "2023-10-05",
  },
  {
    id: " 15",
    productId: " 7",
    userId: 13,
    userName: "Phạm Thị Ngọc",
    userAvatar: "https://i.pravatar.cc/150?img=49",
    rating: 5,
    content:
      "Hoa cẩm tú cầu rất dễ trồng và phát triển tốt. Màu sắc hoa đẹp, thời gian nở dài. Rất hài lòng với sản phẩm!",
    createdAt: "2023-05-12",
  },
  {
    id: " 16",
    productId: " 7",
    userId: 14,
    userName: "Trần Minh Tuấn",
    userAvatar: "https://i.pravatar.cc/150?img=61",
    rating: 3,
    content:
      "Tỷ lệ nảy mầm khá thấp, chỉ khoảng 60%. Tuy nhiên, những cây phát triển được cho hoa rất đẹp.",
    createdAt: "2023-06-02",
  },
  {
    id: " 17",
    productId: " 8",
    userId: 15,
    userName: "Vũ Thị Hồng",
    userAvatar: "https://i.pravatar.cc/150?img=45",
    rating: 3,
    content:
      "Hoa loa kèn khá khó trồng từ hạt, cần nhiều thời gian và công sức. Tỷ lệ nảy mầm không cao lắm.",
    createdAt: "2023-07-15",
  },
  {
    id: " 18",
    productId: " 8",
    userId: 5,
    userName: "Phạm Văn Đức",
    userAvatar: "https://i.pravatar.cc/150?img=68",
    rating: 3,
    content:
      "Quá trình trồng khá phức tạp, cần kiên nhẫn. Tuy nhiên, kết quả không được như mong đợi. Tỷ lệ nảy mầm thấp.",
    createdAt: "2023-08-01",
  },
];

export const getCommentsByProductId = (productId: string): Comment[] => {
  return comments.filter((comment) => comment.productId === productId);
};

export const getAverageRatingByProductId = (productId: string): number => {
  const productComments = getCommentsByProductId(productId);
  if (productComments.length === 0) return 0;

  const sum = productComments.reduce(
    (total, comment) => total + comment.rating,
    0,
  );
  return parseFloat((sum / productComments.length).toFixed(1));
};
