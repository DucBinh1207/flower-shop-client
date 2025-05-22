export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cod" | "bank_transfer" ;
  paymentStatus: "pending" | "paid" | "failed";
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  notes: string | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export const orders: Order[] = [
  {
    id: "1",
    userId: "2",
    customerName: "Nguyễn Thị Thanh",
    customerEmail: "nguyenquocdung@gmail.com",
    customerPhone: "0912345678",
    shippingAddress: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    status: "delivered",
    paymentMethod: "cod",
    paymentStatus: "paid",
    subtotal: 289000,
    shippingFee: 30000,
    discount: 0,
    total: 319000,
    notes: null,
    items: [
      {
        id: 1,
        orderId: 1,
        productId: 1,
        productName: "Hạt giống Hoa Hồng Đỏ",
        productImage:
          "https://images.unsplash.com/photo-1548957459-d31dad5a285a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 75000,
        quantity: 2,
        subtotal: 150000,
      },
      {
        id: 2,
        orderId: 1,
        productId: 2,
        productName: "Hạt giống Hoa Hướng Dương Khổng Lồ",
        productImage:
          "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 45000,
        quantity: 1,
        subtotal: 45000,
      },
      {
        id: 3,
        orderId: 1,
        productId: 4,
        productName: "Hạt giống Hoa Cúc Đa Sắc",
        productImage:
          "https://images.unsplash.com/photo-1598187079701-06343c10209a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 59000,
        quantity: 1,
        subtotal: 59000,
      },
      {
        id: 4,
        orderId: 1,
        productId: 5,
        productName: "Hạt giống Hoa Tulip Rainbow",
        productImage:
          "https://images.unsplash.com/photo-1553530979-212c46e0265d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 95000,
        quantity: 1,
        subtotal: 95000,
      },
    ],
    createdAt: "2023-02-25",
    updatedAt: "2023-03-02",
  },
  {
    id: "2",
    userId: "3",
    customerName: "Trần Văn Minh",
    customerEmail: "tranvanminh@gmail.com",
    customerPhone: "0923456789",
    shippingAddress: "456 Đường Lê Lợi, Quận 5, TP.HCM",
    status: "delivered",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    subtotal: 150000,
    shippingFee: 30000,
    discount: 0,
    total: 180000,
    notes: "Giao hàng vào buổi sáng",
    items: [
      {
        id: 5,
        orderId: 2,
        productId: 5,
        productName: "Hạt giống Hoa Tulip Rainbow",
        productImage:
          "https://images.unsplash.com/photo-1553530979-212c46e0265d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 95000,
        quantity: 1,
        subtotal: 95000,
      },
      {
        id: 6,
        orderId: 2,
        productId: 7,
        productName: "Hạt giống Hoa Cẩm Tú Cầu",
        productImage:
          "https://images.unsplash.com/photo-1440713017205-02904f447e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 85000,
        quantity: 1,
        subtotal: 85000,
      },
    ],
    createdAt: "2023-04-15",
    updatedAt: "2023-04-20",
  },
  {
    id: "3",
    userId: "44",
    customerName: "Lê Thị Hương",
    customerEmail: "lethihuong@gmail.com",
    customerPhone: "0934567890",
    shippingAddress: "789 Đường Phan Đình Phùng, Quận 3, TP.HCM",
    status: "shipped",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    subtotal: 298000,
    shippingFee: 30000,
    discount: 50000,
    total: 278000,
    notes: "Để hàng ở bảo vệ",
    items: [
      {
        id: 7,
        orderId: 3,
        productId: 3,
        productName: "Hạt giống Hoa Lan Hồ Điệp",
        productImage:
          "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 120000,
        quantity: 1,
        subtotal: 120000,
      },
      {
        id: 8,
        orderId: 3,
        productId: 6,
        productName: "Hạt giống Hoa Phong Lan Tím",
        productImage:
          "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 150000,
        quantity: 1,
        subtotal: 150000,
      },
      {
        id: 9,
        orderId: 3,
        productId: 8,
        productName: "Hạt giống Hoa Loa Kèn",
        productImage:
          "https://images.unsplash.com/photo-1589994160839-163cd867cfe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 64000,
        quantity: 1,
        subtotal: 64000,
      },
    ],
    createdAt: "2023-09-05",
    updatedAt: "2023-09-08",
  },
  {
    id: "4",
    userId: "2",
    customerName: "Nguyễn Thị Thanh",
    customerEmail: "nguyenquocdung@gmail.com",
    customerPhone: "0912345678",
    shippingAddress: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    status: "processing",
    paymentMethod: "cod",
    paymentStatus: "pending",
    subtotal: 195000,
    shippingFee: 30000,
    discount: 0,
    total: 225000,
    notes: null,
    items: [
      {
        id: 10,
        orderId: 4,
        productId: 2,
        productName: "Hạt giống Hoa Hướng Dương Khổng Lồ",
        productImage:
          "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 45000,
        quantity: 2,
        subtotal: 90000,
      },
      {
        id: 11,
        orderId: 4,
        productId: 7,
        productName: "Hạt giống Hoa Cẩm Tú Cầu",
        productImage:
          "https://images.unsplash.com/photo-1440713017205-02904f447e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 85000,
        quantity: 1,
        subtotal: 85000,
      },
      {
        id: 12,
        orderId: 4,
        productId: 4,
        productName: "Hạt giống Hoa Cúc Đa Sắc",
        productImage:
          "https://images.unsplash.com/photo-1598187079701-06343c10209a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 59000,
        quantity: 1,
        subtotal: 59000,
      },
    ],
    createdAt: "2023-10-10",
    updatedAt: "2023-10-10",
  },
  {
    id: "5",
    userId: "5",
    customerName: "Phạm Văn Đức",
    customerEmail: "phamvanduc@gmail.com",
    customerPhone: "0945678901",
    shippingAddress: "234 Đường Lê Duẩn, Quận 1, TP.HCM",
    status: "pending",
    paymentMethod: "bank_transfer",
    paymentStatus: "pending",
    subtotal: 334000,
    shippingFee: 30000,
    discount: 0,
    total: 364000,
    notes: "Gọi điện trước khi giao hàng",
    items: [
      {
        id: 13,
        orderId: 5,
        productId: 1,
        productName: "Hạt giống Hoa Hồng Đỏ",
        productImage:
          "https://images.unsplash.com/photo-1548957459-d31dad5a285a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 75000,
        quantity: 1,
        subtotal: 75000,
      },
      {
        id: 14,
        orderId: 5,
        productId: 3,
        productName: "Hạt giống Hoa Lan Hồ Điệp",
        productImage:
          "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 120000,
        quantity: 1,
        subtotal: 120000,
      },
      {
        id: 15,
        orderId: 5,
        productId: 6,
        productName: "Hạt giống Hoa Phong Lan Tím",
        productImage:
          "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: 150000,
        quantity: 1,
        subtotal: 150000,
      },
    ],
    createdAt: "2023-10-12",
    updatedAt: "2023-10-12",
  },
];

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter((order) => order.userId === userId);
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find((order) => order.id === id);
};
