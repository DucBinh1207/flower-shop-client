"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CategoryHeader from "./header";
import FilterSearch from "./filter";
import CategoryTable from "./table";
import CategoryModal from "./category-modal";
import DeleteConfirmationModal from "./delete-confirm-modal";
import { Category } from "@/types/index";
import PaginationList from "@/components/ui/pagination-list";
import { useCategoryFiltering } from "src/app/admin/categories/_hooks/use-categories";
import { useMutation } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/api/categories-api";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({});

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, state, isLoading, totalPages, setState } =
    useCategoryFiltering();

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Thêm thành công",
        description: `Đã thêm danh mục `,
      });
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateCategory,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Cập nhật thành công!",
        description: `Danh mục  đã được cập nhật!`,
      });
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Xóa thành công!",
        description: `Danh mục đã được xóa!`,
      });
    },
  });

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setCurrentCategory(category);
      setFormData({
        ...category,
      });
    } else {
      setCurrentCategory(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        image: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
  };

  const handleOpenDeleteModal = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentCategory(null);
  };

  const handleSubmit = (submittedFormData: Partial<Category>) => {
    if (
      !submittedFormData.name ||
      !submittedFormData.slug ||
      !submittedFormData.image
    ) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive",
      });
      return;
    }

    // Make sure formData has all required fields
    const categoryData = {
      ...submittedFormData,
    } as Category;

    if (currentCategory) {
      mutateUpdate({ id: currentCategory.id, data: categoryData });
    } else {
      const newCategory: Category = {
        ...categoryData,
      } as Category;

      mutate(newCategory);
    }

    handleCloseModal();
  };

  const handleDelete = () => {
    if (!currentCategory) return;

    mutateDelete({ id: currentCategory.id });

    handleCloseDeleteModal();
  };

  return (
    <div>
      <CategoryHeader onAddCategory={() => handleOpenModal()} />

      <FilterSearch
        SearchCategory={state.search}
        handleSearchChange={(search) =>
          setState({
            search,
          })
        }
      />

      <CategoryTable
        categories={data}
        isLoading={isLoading}
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
        <CategoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          currentCategory={currentCategory}
          initialFormData={formData}
          categories={data}
        />
      )}

      {isDeleteModalOpen && currentCategory && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
          categoryName={currentCategory.name}
        />
      )}
    </div>
  );
}
