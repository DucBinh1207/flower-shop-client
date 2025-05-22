import React from "react";

interface CategoryHeaderProps {
  onAddCategory: () => void;
}

export default function CategoryHeader({ onAddCategory }: CategoryHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
      <button
        className="flex items-center rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
        onClick={onAddCategory}
      >
        <i className="bx bx-plus mr-2"></i>
        Thêm danh mục
      </button>
    </div>
  );
}
