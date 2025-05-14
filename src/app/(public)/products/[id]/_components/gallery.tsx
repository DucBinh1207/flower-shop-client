"use client";

import { ProductDetail } from "@/types/index";
import { useState } from "react";

interface ProductGalleryProps {
  product: ProductDetail;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div>
      <div className="mb-4 overflow-hidden rounded-lg bg-white">
        <img
          src={selectedImage}
          alt={product.name}
          className="aspect-square h-auto w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {product.images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer overflow-hidden rounded-md border-2 ${selectedImage === image ? "border-primary" : "border-transparent"}`}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`${product.name} - ${index}`}
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
