export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatar: string;
  role: "admin" | "customer";
  createdAt: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@seedbloom.vn",
    password: "admin123",
    phone: "0901234567",
    address: "123 Đường Admin, Quận 1, TP.HCM",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "admin",
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    name: "Nguyễn Thị Thanh",
    email: "nguyenquocdung@gmail.com",
    password: "dung123",
    phone: "0912345678",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    avatar: "https://i.pravatar.cc/150?img=32",
    role: "customer",
    createdAt: "2023-01-15",
  },
  {
    id: 3,
    name: "Trần Văn Minh",
    email: "tranvanminh@gmail.com",
    password: "minh123",
    phone: "0923456789",
    address: "456 Đường Lê Lợi, Quận 5, TP.HCM",
    avatar: "https://i.pravatar.cc/150?img=59",
    role: "customer",
    createdAt: "2023-02-05",
  },
  {
    id: 4,
    name: "Lê Thị Hương",
    email: "lethihuong@gmail.com",
    password: "huong123",
    phone: "0934567890",
    address: "789 Đường Phan Đình Phùng, Quận 3, TP.HCM",
    avatar: "https://i.pravatar.cc/150?img=47",
    role: "customer",
    createdAt: "2023-02-20",
  },
  {
    id: 5,
    name: "Phạm Văn Đức",
    email: "phamvanduc@gmail.com",
    password: "duc123",
    phone: "0945678901",
    address: "234 Đường Lê Duẩn, Quận 1, TP.HCM",
    avatar: "https://i.pravatar.cc/150?img=68",
    role: "customer",
    createdAt: "2023-03-10",
  },
];

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const getUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

export const authenticateUser = (
  email: string,
  password: string,
): User | null => {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    // Omit password before returning
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  return null;
};
