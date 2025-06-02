"use client";

import { useState } from "react";
import { Comment } from "@/constants/comments";
import { ProductDetail } from "@/types/index";

interface ProductTabsProps {
  product: ProductDetail;
  comments: Comment[];
}

export default function ProductTabs({ product, comments }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "description" | "howToPlant" | "reviews"
  >("description");

  return (
    <div className="mb-12">
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium ${activeTab === "description" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("description")}
          >
            Mô tả sản phẩm
          </button>
          <button
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium ${activeTab === "howToPlant" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("howToPlant")}
          >
            Hướng dẫn trồng
          </button>
        </div>
      </div>

      <div className="rounded-b-lg bg-white p-4">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-gray-700">
              {product.description}
            </p>
          </div>
        )}

        {activeTab === "howToPlant" && (
          <div className="prose max-w-none">
            <h3 className="mb-3 text-lg font-semibold">
              Hướng dẫn cách trồng {product.name}
            </h3>
            <p className="whitespace-pre-line text-gray-700">
              {product.howToPlant}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex items-start">
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="mr-4 h-12 w-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{comment.userName}</h4>
                        <div className="my-1 flex text-sm text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bx ${i < comment.rating ? "bxs-star" : "bx-star"}`}
                            ></i>
                          ))}
                          <span className="ml-2 text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString(
                              "vi-VN",
                            )}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-gray-500">
                Chưa có đánh giá nào cho sản phẩm này.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
