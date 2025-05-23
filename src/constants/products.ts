import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Hạt giống Hoa Hồng Đỏ",
    slug: "hat-giong-hoa-hong-do",
    description:
      "Hạt giống hoa hồng đỏ chất lượng cao, dễ trồng và cho tỷ lệ nảy mầm cao. Hoa hồng đỏ mang vẻ đẹp rực rỡ, quyến rũ và là biểu tượng của tình yêu nồng cháy. Chúng thích hợp trồng trong vườn nhà, công viên hoặc làm quà tặng cho người thân yêu.",
    shortDescription:
      "Hạt giống hoa hồng đỏ chất lượng cao, dễ trồng và cho tỷ lệ nảy mầm cao.",
    price: 75000,
    originalPrice: 100000,
    discount: 25,
    categoryId: "1",
    supplierId: "1",
    image:
      "https://images.unsplash.com/photo-1548957459-d31dad5a285a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1548957459-d31dad5a285a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 32,
    isBestSeller: false,
    isNew: false,
    stock: 100,
    packageSize: "Gói 50 hạt",
    seedCount: 50,
    howToPlant:
      "1. Ngâm hạt trong nước ấm 24 giờ trước khi gieo.\n2. Gieo hạt vào đất ẩm, phủ một lớp đất mỏng.\n3. Giữ ẩm đều và đặt ở nơi có ánh sáng tán xạ.\n4. Hạt nảy mầm sau 7-14 ngày.\n5. Khi cây con cao khoảng 10cm, có thể đem trồng ra vườn.",
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Hạt giống Hoa Hướng Dương Khổng Lồ",
    slug: "hat-giong-hoa-huong-duong-khong-lo",
    description:
      "Hạt giống hoa hướng dương khổng lồ với đường kính hoa có thể đạt tới 30cm. Hoa hướng dương là biểu tượng của sự lạc quan, niềm vui và sức sống mãnh liệt. Loại hoa này rất dễ trồng, thích hợp cho người mới bắt đầu và có thể thu hoạch hạt để ăn hoặc ép dầu.",
    shortDescription:
      "Hạt giống hoa hướng dương khổng lồ với đường kính hoa có thể đạt tới 30cm.",
    price: 45000,
    originalPrice: null,
    discount: null,
    categoryId: "2",
    supplierId: "1",
    image:
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551667053-64123467a756?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598755257130-c2aaca1f061c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 5,
    reviewCount: 56,
    isBestSeller: true,
    isNew: false,
    stock: 150,
    packageSize: "Gói 20 hạt",
    seedCount: 20,
    howToPlant:
      "1. Gieo hạt trực tiếp vào đất ở nơi có ánh nắng đầy đủ.\n2. Hạt nên được gieo cách nhau 30-45cm.\n3. Phủ một lớp đất mỏng 1-2cm và giữ ẩm.\n4. Hạt nảy mầm sau 7-10 ngày.\n5. Tưới nước đều đặn, nhất là trong thời kỳ ra hoa.",
    createdAt: "2023-02-20",
  },
  {
    id: "3",
    name: "Hạt giống Hoa Lan Hồ Điệp",
    slug: "hat-giong-hoa-lan-ho-diep",
    description:
      "Hạt giống hoa lan hồ điệp cao cấp, được chọn lọc từ những giống lan quý. Hoa lan hồ điệp nổi tiếng với vẻ đẹp thanh lịch, tinh tế và khả năng nở hoa lâu dài. Thích hợp trồng trong nhà, văn phòng hoặc làm quà tặng trong các dịp đặc biệt.",
    shortDescription:
      "Hạt giống hoa lan hồ điệp cao cấp, được chọn lọc từ những giống lan quý.",
    price: 120000,
    originalPrice: null,
    discount: null,
    categoryId: "3",
    supplierId: "1",
    image:
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561897615-0963be0be372?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627839047916-fe3d3ffe2f75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4,
    reviewCount: 18,
    isBestSeller: false,
    isNew: true,
    stock: 80,
    packageSize: "Gói 30 hạt",
    seedCount: 30,
    howToPlant:
      "1. Lan hồ điệp cần được gieo trong môi trường đặc biệt.\n2. Sử dụng giá thể chuyên dụng cho lan gồm vỏ cây, than củi, rêu sphagnum.\n3. Duy trì độ ẩm cao và nhiệt độ ổn định 20-25°C.\n4. Hạt nảy mầm sau 3-6 tháng.\n5. Cung cấp ánh sáng tán xạ và tránh ánh nắng trực tiếp.",
    createdAt: "2023-07-10",
  },
  {
    id: "4",
    name: "Hạt giống Hoa Cúc Đa Sắc",
    slug: "hat-giong-hoa-cuc-da-sac",
    description:
      "Hạt giống hoa cúc đa sắc với nhiều màu sắc rực rỡ trong cùng một gói hạt. Hoa cúc dễ trồng, ra nhiều hoa và có thời gian nở dài. Thích hợp trồng trong vườn, ban công hoặc trồng trong chậu trang trí nhà cửa.",
    shortDescription:
      "Hạt giống hoa cúc đa sắc với nhiều màu sắc rực rỡ trong cùng một gói hạt.",
    price: 59000,
    originalPrice: 70000,
    discount: 15,
    categoryId: "4",
    supplierId: "1",
    image:
      "https://images.unsplash.com/photo-1598187079701-06343c10209a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1598187079701-06343c10209a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612803751782-48f5d098cea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580483046931-aaba29b81601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 3.5,
    reviewCount: 24,
    isBestSeller: false,
    isNew: false,
    stock: 200,
    packageSize: "Gói 100 hạt",
    seedCount: 100,
    howToPlant:
      "1. Gieo hạt vào đất mềm, phủ lớp đất mỏng 3-5mm.\n2. Giữ đất ẩm và đặt ở nơi có ánh sáng đầy đủ.\n3. Hạt nảy mầm sau 7-14 ngày.\n4. Khi cây con cao 5-7cm, cấy ra chậu riêng hoặc vườn.\n5. Cây ra hoa sau khoảng 2-3 tháng từ khi gieo hạt.",
    createdAt: "2023-03-25",
  },
  {
    id: "5",
    name: "Hạt giống Hoa Tulip Rainbow",
    slug: "hat-giong-hoa-tulip-rainbow",
    description:
      "Hạt giống hoa tulip Rainbow với nhiều màu sắc phong phú. Tulip là loài hoa nổi tiếng với vẻ đẹp lộng lẫy, sang trọng, tượng trưng cho tình yêu hoàn hảo và sự thịnh vượng. Rất thích hợp cho việc trang trí vườn, công viên hoặc làm hoa cắt cành.",
    shortDescription:
      "Hạt giống hoa tulip Rainbow với nhiều màu sắc phong phú.",
    price: 95000,
    originalPrice: null,
    discount: null,
    categoryId: "5",
    supplierId: "1",
    image:
      "https://images.unsplash.com/photo-1553530979-212c46e0265d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553530979-212c46e0265d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518701005037-d53b527c0208?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626015156036-41982aa1384f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 47,
    isBestSeller: true,
    isNew: false,
    stock: 50,
    packageSize: "Gói 15 hạt",
    seedCount: 15,
    howToPlant:
      "1. Gieo hạt vào đất giàu dinh dưỡng vào mùa thu.\n2. Phủ lớp đất 5-7cm.\n3. Giữ ẩm đều và thoát nước tốt.\n4. Hạt nảy mầm sau khoảng 2-3 tuần.\n5. Cây sẽ ra hoa vào mùa xuân năm sau.",
    createdAt: "2023-05-05",
  },
  {
    id: "6",
    name: "Hạt giống Hoa Phong Lan Tím",
    slug: "hat-giong-hoa-phong-lan-tim",
    description:
      "Hạt giống hoa phong lan tím quý hiếm với màu sắc tím đậm quyến rũ. Phong lan tím mang vẻ đẹp quý phái, thanh lịch và là biểu tượng của sự sang trọng. Thích hợp trồng trong nhà, làm quà tặng hoặc sưu tầm.",
    shortDescription:
      "Hạt giống hoa phong lan tím quý hiếm với màu sắc tím đậm quyến rũ.",
    price: 150000,
    originalPrice: null,
    discount: null,
    categoryId: "6",
    supplierId: "1",
    image:
      "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574243121728-0889973f300c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572454591674-2739f30d8c40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4,
    reviewCount: 12,
    isBestSeller: false,
    isNew: true,
    stock: 30,
    packageSize: "Gói 10 hạt",
    seedCount: 10,
    howToPlant:
      "1. Sử dụng giá thể đặc biệt cho lan gồm vỏ cây, than củi và rêu sphagnum.\n2. Gieo hạt trên bề mặt giá thể, không cần phủ đất.\n3. Duy trì độ ẩm cao và nhiệt độ ổn định 22-27°C.\n4. Đặt ở nơi có ánh sáng tán xạ, tránh ánh nắng trực tiếp.\n5. Hạt nảy mầm sau 4-8 tháng.",
    createdAt: "2023-08-15",
  },
  {
    id: "7",
    name: "Hạt giống Hoa Cẩm Tú Cầu",
    slug: "hat-giong-hoa-cam-tu-cau",
    description:
      "Hạt giống hoa cẩm tú cầu với những cụm hoa to tròn đẹp mắt. Cẩm tú cầu là loài hoa mang ý nghĩa về lòng biết ơn, sự phong phú và sự hiểu biết. Thích hợp trồng trong vườn, công viên hoặc làm hoa cắt cành.",
    shortDescription:
      "Hạt giống hoa cẩm tú cầu với những cụm hoa to tròn đẹp mắt.",
    price: 85000,
    originalPrice: null,
    discount: null,
    categoryId: "7",
    supplierId: "1",
    image:
      "https://images.unsplash.com/photo-1440713017205-02904f447e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1440713017205-02904f447e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563244940-4f2a25ef3fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591312113029-fce3584945ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4,
    reviewCount: 21,
    isBestSeller: false,
    isNew: false,
    stock: 75,
    packageSize: "Gói 25 hạt",
    seedCount: 25,
    howToPlant:
      "1. Gieo hạt vào đất ẩm, phủ lớp đất mỏng.\n2. Đặt ở nơi có ánh sáng nhưng không có ánh nắng trực tiếp.\n3. Duy trì nhiệt độ 18-25°C và độ ẩm cao.\n4. Hạt nảy mầm sau 14-21 ngày.\n5. Cấy cây con vào chậu riêng khi có 2-3 lá thật.",
    createdAt: "2023-04-12",
  },
  {
    id: "8",
    name: "Hạt giống Hoa Loa Kèn",
    slug: "hat-giong-hoa-loa-ken",
    description:
      "Hạt giống hoa loa kèn với những bông hoa trắng tinh khiết, thơm ngát. Hoa loa kèn tượng trưng cho sự thuần khiết, niềm vui và sự hồi sinh. Phù hợp trồng trong vườn, ban công hoặc làm hoa cắt cành trang trí nhà cửa.",
    shortDescription:
      "Hạt giống hoa loa kèn với những bông hoa trắng tinh khiết, thơm ngát.",
    price: 64000,
    originalPrice: 80000,
    discount: 20,
    categoryId: "8",
    supplierId: "1",
    image:
      "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587889941010-2aeb2e78c803?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601579112934-23a7f8b7db51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 3,
    reviewCount: 9,
    isBestSeller: false,
    isNew: false,
    stock: 60,
    packageSize: "Gói 15 hạt",
    seedCount: 15,
    howToPlant:
      "1. Gieo hạt vào đất ẩm, phủ lớp đất mỏng khoảng 1cm.\n2. Duy trì độ ẩm đều và nhiệt độ khoảng 20-25°C.\n3. Đặt ở nơi có ánh sáng tốt nhưng tránh ánh nắng trực tiếp.\n4. Hạt nảy mầm sau 2-3 tuần.\n5. Cấy cây con ra chậu riêng khi có 3-4 lá thật.",
    createdAt: "2023-06-20",
  },
];

export const searchProductsByName = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery),
  );
};
