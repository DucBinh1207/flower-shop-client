"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SupplyHeader from "./header";
import FilterSearch from "./filter";
import SupplyTable from "./table";
import SupplyModal from "./supply-modal";
import DeleteConfirmationModal from "./delete-confirm-modal";
import { Category, Supplier } from "@/types/index";
import PaginationList from "@/components/ui/pagination-list";
import { useCategoryFiltering } from "src/app/admin/categories/_hooks/use-categories";
import { useMutation } from "@tanstack/react-query";
import { createSupply, deleteSupply, updateSupply } from "@/api/supply-api";
import { useQueryClient } from "@tanstack/react-query";
import { useSupplyFiltering } from "../_hooks/use-supplies";

export default function ProductManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSupply, setCurrentSupply] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState<Partial<Supplier>>({});

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, state, isLoading, totalPages, setState } = useSupplyFiltering();

  const { mutate } = useMutation({
    mutationFn: createSupply,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
      toast({
        title: "Thêm thành công",
        description: `Đã thêm nhà cung cấp !`,
      });
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateSupply,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
      toast({
        title: "Cập nhật thành công!",
        description: `Nhà cung cấp đã được cập nhật !`,
      });
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteSupply,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
      toast({
        title: "Xóa thành công!",
        description: `Nhà cung cấp đã được xóa !`,
      });
    },
  });

  const handleOpenModal = (supply?: Supplier) => {
    if (supply) {
      setCurrentSupply(supply);
      setFormData({
        ...supply,
      });
    } else {
      setCurrentSupply(null);
      setFormData({
        name: "",
        address: "",
        contactPerson: "",
        email: "",
        phone: "",
        status: "active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSupply(null);
  };

  const handleOpenDeleteModal = (supply: Supplier) => {
    setCurrentSupply(supply);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentSupply(null);
  };

  const handleSubmit = (submittedFormData: Partial<Supplier>) => {
    if (
      !submittedFormData.name ||
      !submittedFormData.address ||
      !submittedFormData.contactPerson||
      !submittedFormData.email||
      !submittedFormData.phone||
      !submittedFormData.status
    ) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive",
      });
      return;
    }

    // Make sure formData has all required fields
    const supplyData = {
      ...submittedFormData,
    } as Supplier;

    if (currentSupply) {
      mutateUpdate({ id: currentSupply.id, data: supplyData });
    } else {
      const newSupply: Supplier = {
        ...supplyData,
      } as Supplier;

      mutate(newSupply);
    }

    handleCloseModal();
  };

  const handleDelete = () => {
    if (!currentSupply) return;

    mutateDelete({ id: currentSupply.id });

    handleCloseDeleteModal();
  };

  return (
    <div>
      <SupplyHeader onAddSupply={() => handleOpenModal()} />

      <FilterSearch
        SearchSupply={state.search}
        handleSearchChange={(search) =>
          setState({
            search,
          })
        }
      />

      <SupplyTable
        supplies={data}
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
        <SupplyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          currentSupply={currentSupply}
          initialFormData={formData}
          supplies={data}
        />
      )}

      {/* {isDeleteModalOpen && currentSupply && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
          supplyName={currentSupply.name}
        />
      )} */}
    </div>
  );
}
