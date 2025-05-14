"use client";

import { useState, useEffect } from "react";
import { products } from "@/constants/products";
import { categories } from "@/constants/categories";
import { useToast } from "@/hooks/use-toast";
import ProductHeader from "./header";
import FilterSearch from "./filter";
import ProductTable from "./table";
import ProductModal from "./product-modal";
import DeleteConfirmationModal from "./delete-confirm-modal";
import { Product } from "@/types/index";

export default function ProductManagementPage() {
  const [productList, setProductList] = useState<Product[]>(products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [formData, setFormData] = useState<Partial<Product>>({});

  const { toast } = useToast();

  useEffect(() => {
    // Filter products based on search term and category
    let filtered = [...productList];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId === categoryFilter,
      );
    }

    setFilteredProducts(filtered);
  }, [productList, searchTerm, categoryFilter]);

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
      rating: Number(submittedFormData.rating || 0),
      reviewCount: Number(submittedFormData.reviewCount || 0),
      stock: Number(submittedFormData.stock || 0),
      seedCount: Number(submittedFormData.seedCount || 0),
    } as Product;

    if (currentProduct) {
      // Update existing product
      const updatedProducts = productList.map((prod) =>
        prod.id === currentProduct.id
          ? { ...prod, ...productData, id: currentProduct.id }
          : prod,
      );
      setProductList(updatedProducts);

      toast({
        title: "Cập nhật thành công",
        description: `Đã cập nhật sản phẩm "${submittedFormData.name}"`,
      });
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        createdAt: new Date().toISOString(),
      } as Product;

      setProductList([...productList, newProduct]);

      toast({
        title: "Thêm thành công",
        description: `Đã thêm sản phẩm "${submittedFormData.name}"`,
      });
    }

    handleCloseModal();
  };

  const handleDelete = () => {
    if (!currentProduct) return;

    const filteredProducts = productList.filter(
      (prod) => prod.id !== currentProduct.id,
    );
    setProductList(filteredProducts);

    toast({
      title: "Xóa thành công",
      description: `Đã xóa sản phẩm "${currentProduct.name}"`,
    });

    handleCloseDeleteModal();
  };

  return (
    <div>
      <ProductHeader onAddProduct={() => handleOpenModal()} />

      <FilterSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      <ProductTable
        products={filteredProducts}
        categories={categories}
        onEdit={handleOpenModal}
        onDelete={handleOpenDeleteModal}
      />

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
