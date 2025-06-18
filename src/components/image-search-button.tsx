import { ChangeEvent, useRef, useState } from "react";
import { useProductStore } from "src/store/productStore";

export default function ImageSearchButton() {
  const imageRef = useRef<HTMLInputElement>(null);
  const { addProducts } = useProductStore();

  function selectImage() {
    if (imageRef?.current) {
      imageRef.current.click();
    }
  }

  async function handleSelectImage(e: ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) {
        alert("Vui lòng chọn một tệp hình ảnh hợp lệ.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      // Tạo form data và gọi API
      const formData = new FormData();
      formData.append("file", file); // field name là 'file'

      const res = await fetch("https://flower-shop-api-3v1s.onrender.com/api/v1/products/image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Lỗi từ API: ${errorText}`);
      }

      const data = await res.json();
      addProducts(data.data, reader.result as string);
      window.location.href = "/search";
    } catch (error) {
      console.error("Lỗi khi upload ảnh và lấy sản phẩm:", error);
    }
  }

  return (
    <div className="col-span-3">
      <button
        type="button"
        className="rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary"
        title="Tìm kiếm bằng hình ảnh"
        aria-label="Tìm kiếm bằng hình ảnh"
        onClick={selectImage}
      >
        <i className="bx bx-camera text-lg" />
      </button>
      <div>
        <div id="FileUpload">
          <div
            className="relative flex h-full w-full flex-col items-center justify-center"
            onClick={selectImage}
            style={{ width: "100%", height: "100%" }}
          >
            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              style={{ display: "none" }}
              multiple={false}
              onChange={handleSelectImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
