// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  categoryId: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isBestSeller: boolean;
  isNew: boolean;
  stock: number;
  packageSize: string;
  seedCount: number;
  howToPlant: string;
  createdAt: string;
}

export interface ProductDetail extends Omit<Product, "categoryId"> {
  categoryId: Category;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  authorId: number;
  authorName: string;
  createdAt: string;
  tags: string[];
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatar: string;
  role: "admin" | "customer";
  createdAt: string;
}

// Comment types
export interface Comment {
  id: string;
  productId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  createdAt: string;
}

// Cart types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Order types
export interface OrderItem {
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface Order {
  id?: string;
  orderId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  notes: string | null;
  items: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

export type ResponsePayment = {
  data: {
    paymentData: string;
  }
};


// Form types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  acceptTerms: boolean;
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes: string;
}

// Location types
export interface LocationItem {
  id: string;
  name: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  status: StatusSupplier;
  createdAt: string;
  updatedAt: string;
}

// Filter and sort types
export type SortOption =
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating"
  | "popularity";
export type PaymentMethod = "cod" | "bank_transfer" | "credit_card";
export type ProductFilter = "all" | "new" | "bestseller" | "sale";
export type StatusSupplier = "active" | "inactive" | "pending";

export type Ward = {
  name: string;
  code: string;
};

export type District = {
  name: string;
  code: string;
  "xa-phuong": Record<string, Ward>;
};

export type Province = {
  name: string;
  code: string;
  "quan-huyen": Record<string, District>;
};

export type VietnamAddressData = Record<string, Province>;
