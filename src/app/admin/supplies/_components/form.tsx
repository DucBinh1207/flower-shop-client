import { Supplier } from "@/types/index";
import React from "react";

interface SupplyFormFieldsProps {
  formData: Partial<Supplier>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Supplier>>>;
}

export default function SupplyFormFields({
  formData,
  setFormData,
}: SupplyFormFieldsProps) {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

     if (type === "checkbox") {
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

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Tên nhà cung cấp *
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
            Người liên hệ *
          </label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="text"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Số điện thoại *
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Địa chỉ *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Trạng thái *
          </label>

          <select
            name="status"
            value={formData.status || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngừng hoạt động</option>
          </select>
        </div>
      </div>
    </>
  );
}
