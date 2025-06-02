import { getSuppliers } from "@/api/supply-api";
import { Category, Product } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAllCategory } from "../_hooks/use-categories";
import { StateSupplyQuery } from "../../supplies/_hooks/use-supplies";
import useConvertSearchStateToRequestParams from "@/hooks/use-convert-search-state-to-request-params";

interface ProductFormFieldsProps {
  formData: Partial<Product>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  categories: Category[];
  currentProduct: Product | null;
}

export default function ProductFormFields({
  formData,
  setFormData,
  categories,
  currentProduct,
}: ProductFormFieldsProps) {
  const querySupply = useConvertSearchStateToRequestParams<
    NonNullable<StateSupplyQuery>
  >({
    page: 1,
    limit: 100,
    search: "",
  });

  const { data: { data: suppliers = [] } = {}, isLoading: isLoadingSuppliers } =
    useQuery({
      queryKey: ["suppliers"],
      queryFn: () => getSuppliers(querySupply),
    });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (
      name === "name" &&
      (!formData.slug || formData.slug === currentProduct?.slug)
    ) {
      setFormData({
        ...formData,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else if (type === "number") {
      setFormData({
        ...formData,
        [name]:
          name === "categoryId"
            ? parseInt(value)
            : value
              ? parseFloat(value)
              : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages[index] = value;
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const handleAddImageUrl = () => {
    setFormData({
      ...formData,
      images: [...(formData.images || []), ""],
    });
  };

  const handleRemoveImageUrl = (index: number) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Tên sản phẩm *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            URL-friendly tên sản phẩm, tự động tạo từ tên
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Danh mục *
          </label>
          <select
            name="categoryId"
            value={formData.categoryId || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nhà cung cấp *
          </label>
          <select
            name="supplierId"
            value={formData.supplierId || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            {suppliers
              .filter((supply) => supply.status === "active")
              .map((supply) => (
                <option
                  key={supply.id}
                  value={supply.id}
                >
                  {supply.name}
                </option>
              ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            URL hình ảnh chính *
          </label>
          <input
            type="text"
            name="image"
            value={formData.image || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Giá (VNĐ) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Giá gốc (VNĐ)
          </label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Tồn kho *
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Kích thước gói
          </label>
          <input
            type="text"
            name="packageSize"
            value={formData.packageSize || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ví dụ: Gói 50 hạt"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Số lượng hạt
          </label>
          <input
            type="number"
            name="seedCount"
            value={formData.seedCount || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Giảm giá (%)
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            max="100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Mô tả ngắn
        </label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription || ""}
          onChange={handleInputChange}
          rows={2}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Mô tả chi tiết
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          rows={4}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Hướng dẫn trồng
        </label>
        <textarea
          name="howToPlant"
          value={formData.howToPlant || ""}
          onChange={handleInputChange}
          rows={4}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Hình ảnh bổ sung
        </label>
        {formData.images &&
          formData.images.map((imageUrl, index) => (
            <div
              key={index}
              className="mb-2 flex items-center"
            >
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                className="flex-1 rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nhập URL hình ảnh"
              />
              <button
                type="button"
                className="ml-2 p-2 text-red-600 hover:text-red-800"
                onClick={() => handleRemoveImageUrl(index)}
              >
                <i className="bx bx-trash"></i>
              </button>
            </div>
          ))}
        <button
          type="button"
          className="mt-2 flex items-center text-sm text-primary hover:text-primary-dark"
          onClick={handleAddImageUrl}
        >
          <i className="bx bx-plus mr-1"></i>
          Thêm hình ảnh
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew || false}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Sản phẩm mới</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isBestSeller"
            checked={formData.isBestSeller || false}
            onChange={handleInputChange}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Sản phẩm bán chạy</span>
        </label>
      </div>
    </>
  );
}
