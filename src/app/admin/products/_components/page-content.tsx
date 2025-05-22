"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ProductHeader from "./header";
import FilterSearch from "./filter";
import ProductTable from "./table";
import ProductModal from "./product-modal";
import DeleteConfirmationModal from "./delete-confirm-modal";
import { Product } from "@/types/index";
import { useProductBySearch } from "../_hooks/use-products-by-search";
import PaginationList from "@/components/ui/pagination-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, updateProduct } from "@/api/product-api";
import { useAllCategory } from "../_hooks/use-categories";
import { useProductFiltering } from "../_hooks/use-products";

export default function ProductManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [formData, setFormData] = useState<Partial<Product>>({});

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories } = useAllCategory();

  const {
    data: products,
    state,
    isLoading,
    totalPages,
    setState,
  } = useProductFiltering();


  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Thêm thành công",
        description: `Đã thêm sản phẩm `,
      });
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Cập nhật thành công!",
        description: `Sản phẩm đã được cập nhật!`,
      });
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Xóa thành công!",
        description: `Sản phẩm đã được xóa!`,
      });
    },
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        ...product,
        images: [...product.images],
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        price: 0,
        originalPrice: null,
        discount: null,
        categoryId: "",
        image: "",
        images: [],
        rating: 0,
        reviewCount: 0,
        isBestSeller: false,
        isNew: false,
        stock: 0,
        packageSize: "",
        seedCount: 0,
        howToPlant: "",
        createdAt: new Date().toISOString(),
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleOpenDeleteModal = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSubmit = (submittedFormData: Partial<Product>) => {
    if (
      !submittedFormData.name ||
      !submittedFormData.slug ||
      !submittedFormData.image ||
      submittedFormData.price === undefined
    ) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive",
      });
      return;
    }

    // Make sure formData has all required fields
    const productData = {
      ...submittedFormData,
      price: Number(submittedFormData.price),
      originalPrice: submittedFormData.originalPrice
        ? Number(submittedFormData.originalPrice)
        : null,
      discount: submittedFormData.discount
        ? Number(submittedFormData.discount)
        : null,
      categoryId: submittedFormData.categoryId,
      stock: Number(submittedFormData.stock || 0),
      seedCount: Number(submittedFormData.seedCount || 0),
    } as Product;

    if (currentProduct) {
      mutateUpdate({ id: currentProduct.id, data: productData });
    } else {
      const newProduct: Product = {
        ...productData,
        createdAt: new Date().toISOString(),
      } as Product;

      mutate(newProduct);
    }

    handleCloseModal();
  };

  const handleDelete = () => {
    if (!currentProduct) return;

    mutateDelete({ id: currentProduct.id });

    handleCloseDeleteModal();
  };

  const handleFilter = (categoryValue: string) => {
    if (categoryValue !== "all")
      setState({
        categoryId: categoryValue,
      });
    else
      setState({
        categoryId: "",
      });
    setCategoryFilter(categoryValue);
  };

  return (
    <div>
      <ProductHeader onAddProduct={() => handleOpenModal()} />

      <FilterSearch
        search={state.search}
        setSearch={(search) =>
          setState({
            search,
          })
        }
        categoryFilter={categoryFilter}
        setCategoryFilter={handleFilter}
        categories={categories}
      />

      <ProductTable
        products={products}
        categories={categories}
        onEdit={handleOpenModal}
        onDelete={handleOpenDeleteModal}
      />

      <div className="mt-2">
        <PaginationList
          totalPage={totalPages}
          currentPage={state.page}
          onChangePage={(page) =>
            setState({
              page,
            })
          }
        />
      </div>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          currentProduct={currentProduct}
          initialFormData={formData}
          categories={categories}
        />
      )}

      {isDeleteModalOpen && currentProduct && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
          productName={currentProduct.name}
        />
      )}
    </div>
  );
}
