// For simplicity, this file contains hardcoded location data for Vietnam
// In a real application, this would be fetched from an API

export interface LocationItem {
  id: number;
  name: string;
}

export const getCityList = (): LocationItem[] => [
  { id: 1, name: "TP. Hồ Chí Minh" },
  { id: 2, name: "Hà Nội" },
  { id: 3, name: "Đà Nẵng" },
  { id: 4, name: "Cần Thơ" },
  { id: 5, name: "Hải Phòng" },
];

export const getDistrictList = (cityId: number): LocationItem[] => {
  const districts: Record<number, LocationItem[]> = {
    1: [
      { id: 1, name: "Quận 1" },
      { id: 2, name: "Quận 2" },
      { id: 3, name: "Quận 3" },
      { id: 4, name: "Quận Bình Thạnh" },
      { id: 5, name: "Quận Gò Vấp" },
    ],
    2: [
      { id: 6, name: "Quận Ba Đình" },
      { id: 7, name: "Quận Hoàn Kiếm" },
      { id: 8, name: "Quận Hai Bà Trưng" },
      { id: 9, name: "Quận Đống Đa" },
      { id: 10, name: "Quận Cầu Giấy" },
    ],
    3: [
      { id: 11, name: "Quận Hải Châu" },
      { id: 12, name: "Quận Thanh Khê" },
      { id: 13, name: "Quận Sơn Trà" },
      { id: 14, name: "Quận Ngũ Hành Sơn" },
      { id: 15, name: "Quận Liên Chiểu" },
    ],
    4: [
      { id: 16, name: "Quận Ninh Kiều" },
      { id: 17, name: "Quận Bình Thủy" },
      { id: 18, name: "Quận Cái Răng" },
      { id: 19, name: "Quận Ô Môn" },
      { id: 20, name: "Quận Thốt Nốt" },
    ],
    5: [
      { id: 21, name: "Quận Hồng Bàng" },
      { id: 22, name: "Quận Ngô Quyền" },
      { id: 23, name: "Quận Lê Chân" },
      { id: 24, name: "Quận Hải An" },
      { id: 25, name: "Quận Kiến An" },
    ],
  };

  return districts[cityId] || [];
};

export const getWardList = (districtId: number): LocationItem[] => {
  // For simplicity, generate some wards for any district ID
  if (districtId >= 1 && districtId <= 25) {
    return [
      { id: districtId * 4 - 3, name: `Phường A${districtId}` },
      { id: districtId * 4 - 2, name: `Phường B${districtId}` },
      { id: districtId * 4 - 1, name: `Phường C${districtId}` },
      { id: districtId * 4, name: `Phường D${districtId}` },
    ];
  }

  return [];
};
