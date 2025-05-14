import React from "react";

interface ProductHeaderProps {
  onAddProduct: () => void;
}

export default function ProductHeader({ onAddProduct }: ProductHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
      <button
        className="flex items-center rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
        onClick={onAddProduct}
      >
        <i className="bx bx-plus mr-2"></i>
        Thêm sản phẩm
      </button>
    </div>
  );
}
