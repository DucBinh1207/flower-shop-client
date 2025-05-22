// import { Category } from '@/types/index';
// import React from 'react';

// type MobileFiltersProps = {
//   categories: Category[];
//   activeCategoryId: string | null;
//   activeFilter: string;
//   handleCategoryChange: (categoryId: number | null) => void;
//   handleFilterChange: (filter: string) => void;
// };

// export default function MobileFilters({
//   categories,
//   activeCategoryId,
//   activeFilter,
//   handleCategoryChange,
//   handleFilterChange
// }: MobileFiltersProps) {
//   return (
//     <div className="block lg:hidden mb-4">
//       <details className="bg-white rounded-lg shadow-sm p-4">
//         <summary className="list-none flex justify-between items-center cursor-pointer">
//           <span className="font-medium">Lọc sản phẩm</span>
//           <i className='bx bx-filter text-xl'></i>
//         </summary>
//         <div className="mt-4 space-y-6">
//           {/* Categories */}
//           <div>
//             <h3 className="font-medium mb-2">Danh mục</h3>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 className={`px-3 py-1 rounded-full text-sm ${activeCategoryId === null ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//                 onClick={() => handleCategoryChange(null)}
//               >
//                 Tất cả
//               </button>
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   className={`px-3 py-1 rounded-full text-sm ${activeCategoryId === category.id ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//                   onClick={() => handleCategoryChange(category.id)}
//                 >
//                   {category.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Status filters */}
//           <div>
//             <h3 className="font-medium mb-2">Trạng thái</h3>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//                 onClick={() => handleFilterChange('all')}
//               >
//                 Tất cả
//               </button>
//               <button
//                 className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'new' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//                 onClick={() => handleFilterChange('new')}
//               >
//                 Mới về
//               </button>
//               <button
//                 className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'bestseller' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//                 onClick={() => handleFilterChange('bestseller')}
//               >
//                 Bán chạy
//               </button>
//               <button
//                 className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'sale' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
//                 onClick={() => handleFilterChange('sale')}
//               >
//                 Giảm giá
//               </button>
//             </div>
//           </div>
//         </div>
//       </details>
//     </div>
//   );
// }
