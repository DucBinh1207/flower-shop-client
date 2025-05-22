import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { PageLoading } from "@/components/page-loading";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/categories-api";
import { getSuppliers } from "@/api/supply-api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StateProductQuery } from "../_hooks/use-products";

type ProductSidebarProps = {
  state: StateProductQuery;
  setState: (partialState: Partial<StateProductQuery>) => void;
};

export default function ProductSidebar({
  state,
  setState,
}: ProductSidebarProps) {
  const {
    data: { data: categories = [] } = {},
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const { data: { data: suppliers = [] } = {}, isLoading: isLoadingSuppliers } =
    useQuery({
      queryKey: ["suppliers"],
      queryFn: getSuppliers,
    });

  return (
    <div className="lg:col-span-1">
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Giá Sản Phẩm</h2>
        <RangeSlider
          min={10000}
          max={1000000}
          onInput={(val) => {
            setState({
              minPrice: val[0],
              maxPrice: val[1],
            });
          }}
        />
      </div>
      <Accordion
        type="multiple"
        defaultValue={["item-2"]}
      >
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <h2 className="mb-4 text-lg font-bold">Danh mục sản phẩm</h2>
          </AccordionTrigger>
          <AccordionContent>
            {isLoadingCategories ? (
              <PageLoading />
            ) : (
              <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                <ul className="space-y-2">
                  <li>
                    <button
                      className={`w-full rounded-md px-3 py-2 text-left ${state.categoryId === null ? "bg-primary text-white" : "hover:bg-gray-50"}`}
                      onClick={() =>
                        setState({
                          categoryId: "",
                        })
                      }
                    >
                      Tất cả danh mục
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full rounded-md px-3 py-2 text-left ${state.categoryId === category.id ? "bg-primary text-white" : "hover:bg-gray-50"}`}
                        onClick={() =>
                          setState({
                            categoryId: category.id,
                          })
                        }
                      >
                        {category.name}
                        <span className="ml-2 text-xs text-gray-500">
                          ({category.productCount})
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="mb-4 text-lg font-bold">Nhà Cung cấp</h2>
          </AccordionTrigger>
          <AccordionContent>
            {isLoadingSuppliers ? (
              <PageLoading />
            ) : (
              <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                <ul className="space-y-2">
                  {suppliers.map((suplier) => (
                    <li key={suplier.id}>
                      <button
                        className={`w-full rounded-md px-3 py-2 text-left ${state.supplierId === suplier.id ? "bg-primary text-white" : "hover:bg-gray-50"}`}
                        onClick={() =>
                          setState({
                            supplierId: suplier.id,
                          })
                        }
                      >
                        {suplier.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
