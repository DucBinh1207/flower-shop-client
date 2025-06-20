import React from "react";

interface FilterSearchProps {
  search: string;
  setSearch: (value: string) => void;
  userFilter: string | "all";
  setUserFilter: (role: string | "all") => void;
}

export default function FilterSearch({
  search,
  setSearch,
  userFilter,
  setUserFilter,
}: FilterSearchProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm người dùng theo email hoặc tên ..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
            <i className="bx bx-search text-xl"></i>
          </div>
        </div>

        <div className="w-full md:w-64">
          <select
            className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            value={userFilter}
            onChange={(e) =>
              setUserFilter(
                e.target.value === "all" ? "all" : e.target.value,
              )
            }
          >
            <option value="all">Tất cả vai trò</option>
            <option value="customer">Khách hàng</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
      </div>
    </div>
  );
}
