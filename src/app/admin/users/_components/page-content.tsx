"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import UserHeader from "./header";
import FilterSearch from "./filter";
import UserTable from "./table";
import ProductModal from "./product-modal";
import BanConfirmationModalProps from "./delete-confirm-modal";
import { Product, User } from "@/types/index";
import PaginationList from "@/components/ui/pagination-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, updateProduct } from "@/api/product-api";
import { useUsers } from "../_hooks/use-users";
import { updateStatusUser } from "@/api/users-api";

export default function ProductManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState<string | "all">("all");
  const [formData, setFormData] = useState<Partial<User>>({});
  const [statusUser, setStatusUser] = useState<"active" | "inactive" | "">("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users, state, isLoading, totalPages, setState } = useUsers();

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateStatusUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["all-user"] });
      toast({
        title: "Cập nhật thành công!",
        description: `Người dùng đã được cập nhật!`,
      });
    },
  });

  const handleOpenModal = (user?: User) => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        ...user,
      });
    } else {
      setCurrentUser(null);
      setFormData({
        name: "",
        avatar: "",
        createdAt: new Date().toISOString(),
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleUpdateStatus = (user: User, status: "active" | "inactive") => {
    if (status === "inactive") {
      setCurrentUser(user);
      setIsBanModalOpen(true);
    } else {
      const data = {
        status: status,
      };

      mutateUpdate({ id: user.id, data: data });
    }
  };

  const handleCloseBanModal = () => {
    setIsBanModalOpen(false);
    setCurrentUser(null);
    setStatusUser("");
  };

  // const handleSubmit = (submittedFormData: Partial<User>) => {
  //   if (
  //     !submittedFormData.name
  //   ) {
  //     toast({
  //       title: "Lỗi",
  //       description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   // Make sure formData has all required fields
  //   const userData = {
  //     ...submittedFormData,
  //     // price: Number(submittedFormData.price),
  //     // originalPrice: submittedFormData.originalPrice
  //     //   ? Number(submittedFormData.originalPrice)
  //     //   : null,
  //     // discount: submittedFormData.discount
  //     //   ? Number(submittedFormData.discount)
  //     //   : null,
  //     // categoryId: submittedFormData.categoryId,
  //     // stock: Number(submittedFormData.stock || 0),
  //     // seedCount: Number(submittedFormData.seedCount || 0),
  //   } as User;

  //   if (currentUser) {
  //     mutateUpdate({ id: currentUser.id, data: userData });
  //   } else {
  //     const newUser: User = {
  //       ...userData,
  //     } as Product;

  //     mutate(newUser);
  //   }

  //   handleCloseModal();
  // };

  const handleUpdateUser = () => {
    if (!currentUser || statusUser === "") return;

    const data = {
      status: statusUser,
    };
    mutateUpdate({ id: currentUser.id, data: data });

    handleCloseBanModal();
  };

  const handleFilter = (roleValue: string) => {
    if (roleValue !== "all")
      setState({
        role: roleValue,
      });
    else
      setState({
        role: "",
      });
    setUserFilter(roleValue);
  };

  return (
    <div>
      <UserHeader />

      <FilterSearch
        search={state.search}
        setSearch={(search) =>
          setState({
            search,
          })
        }
        userFilter={userFilter}
        setUserFilter={handleFilter}
      />

      <UserTable
        users={users}
        handleViewUser={handleOpenModal}
        handleUpdateStatus={handleUpdateStatus}
        setStatusUser={(status: "active" | "inactive") => {
          setStatusUser(status);
        }}
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
          currentUser={currentUser}
        />
      )}

      {isBanModalOpen && currentUser && (
        <BanConfirmationModalProps
          isOpen={isBanModalOpen}
          onClose={handleCloseBanModal}
          onBan={handleUpdateUser}
          username={currentUser.name}
        />
      )}
    </div>
  );
}
