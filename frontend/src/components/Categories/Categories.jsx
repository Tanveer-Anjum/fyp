// import React, { useState, Suspense, lazy } from "react";
// import { motion } from "framer-motion";

// const OldCategories = lazy(() => import("./OldCategories"));
// const NewCategories = lazy(() => import("./NewCategories"));

// export default function Categories() {
//   const [activeTab, setActiveTab] = useState("old");

//   return (
//     <section className="p-6">
//       {/* Title */}
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center mt-12">
//         Shop by Category
//       </h2>

//       {/* Toggle Buttons */}
//       <div className="relative flex justify-center gap-8 mb-10">
//         {/* Old Products */}
//         <button
//           type="button"
//           onClick={() => setActiveTab("old")}
//           className={`relative px-6 py-2 font-semibold transition ${
//             activeTab === "old"
//               ? "text-green-600"
//               : "text-gray-600 hover:text-gray-800"
//           }`}
//         >
//           Old Products
//           {activeTab === "old" && (
//             <motion.div
//               layoutId="underline"
//               className="absolute left-0 right-0 -bottom-1 h-[3px] bg-green-600 rounded-full"
//               transition={{ type: "spring", stiffness: 500, damping: 30 }}
//             />
//           )}
//         </button>

//         {/* New Products */}
//         <button
//           type="button"
//           onClick={() => setActiveTab("new")}
//           className={`relative px-6 py-2 font-semibold transition ${
//             activeTab === "new"
//               ? "text-orange-500"
//               : "text-gray-600 hover:text-gray-800"
//           }`}
//         >
//           New Products
//           {activeTab === "new" && (
//             <motion.div
//               layoutId="underline"
//               className="absolute left-0 right-0 -bottom-1 h-[3px] bg-orange-500 rounded-full"
//               transition={{ type: "spring", stiffness: 500, damping: 30 }}
//             />
//           )}
//         </button>
//       </div>

//       {/* Render based on active tab */}
//       <Suspense
//         fallback={
//           <div className="text-center text-gray-500">Loading categories...</div>
//         }
//       >
//         {activeTab === "old" ? <OldCategories /> : <NewCategories />}
//       </Suspense>
//     </section>
//   );
// }









import React, { useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";

const OldCategories = lazy(() => import("./OldCategories"));
const NewCategories = lazy(() => import("./NewCategories"));

export default function Categories() {
  const [activeTab, setActiveTab] = useState("old");

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10 leading-tight">
        Explore Our <span className="text-indigo-600">Diverse Categories</span>
      </h2>

      {/* Toggle Buttons */}
      <div className="relative flex justify-center space-x-4 mb-12 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg max-w-lg mx-auto">
        {/* Old Products */}
        <button
          type="button"
          onClick={() => setActiveTab("old")}
          className={`relative px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out
            ${activeTab === "old"
                ? "text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
        >
          Old Products
          {activeTab === "old" && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 bottom-0 h-[4px] bg-white rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>

        {/* New Products */}
        <button
          type="button"
          onClick={() => setActiveTab("new")}
          className={`relative px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out
            ${activeTab === "new"
                ? "text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md"
                : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
        >
          New Products
          {activeTab === "new" && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 bottom-0 h-[4px] bg-white rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      </div>

      <Suspense
        fallback={
          <div className="text-center text-xl text-gray-600 dark:text-gray-400 py-10">Loading categories...</div>
        }
      >
        {activeTab === "old" ? <OldCategories /> : <NewCategories />}
      </Suspense>
    </section>
  );
}
