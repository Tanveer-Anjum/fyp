









// import React, { useState } from "react";
// import toast from "react-hot-toast";

// export default function AddProductForm({ fetchProducts }) {
//   const seller = JSON.parse(localStorage.getItem("user"));
//   if (!seller || seller.role !== "seller") return <p>Seller not logged in!</p>;

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     categoryType: "New",
//     categoryName: "",
//     brand: "",
//     colors: "",
//     warranty: "",
//     delivery: "",
//     rating: "",
//     reviews: "",
//     stock: "",
//     description: "",
//     imageFile: null,
//     imagePreview: "",
//   });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setForm({ ...form, imageFile: file, imagePreview: URL.createObjectURL(file) });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.keys(form).forEach((key) => {
//       if (key === "imageFile" && form.imageFile) formData.append("imageFile", form.imageFile);
//       else formData.append(key, form[key]);
//     });

//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await fetch("http://localhost:8080/api/products/add", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       const data = await res.json();
//       if (!data.success) return toast.error(data.message);

//       toast.success("Product added successfully!");
//       setForm({
//         name: "", price: "", categoryType: "New", categoryName: "", brand: "",
//         colors: "", warranty: "", delivery: "", rating: "", reviews: "", stock: "",
//         description: "", imageFile: null, imagePreview: ""
//       });

//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add product");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-3">
//       <h3 className="text-lg font-bold">Add New Product</h3>
//       <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" required />
//       <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border rounded p-2" required />
//       <select name="categoryType" value={form.categoryType} onChange={handleChange} className="w-full border rounded p-2">
//         <option value="New">New</option>
//         <option value="Old">Old</option>
//       </select>
//       <input type="text" name="categoryName" placeholder="Category Name" value={form.categoryName} onChange={handleChange} className="w-full border rounded p-2" />
//       <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="w-full border rounded p-2" />
//       <input type="text" name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} className="w-full border rounded p-2" />
//       <select name="warranty" value={form.warranty} onChange={handleChange} className="w-full border rounded p-2">
//         <option value="">Warranty</option>
//         <option value="No Warranty">No Warranty</option>
//         <option value="Seller Warranty">Seller Warranty</option>
//         <option value="Brand Warranty">Brand Warranty</option>
//       </select>
//       <select name="delivery" value={form.delivery} onChange={handleChange} className="w-full border rounded p-2">
//         <option value="">Delivery</option>
//         <option value="Standard">Standard</option>
//         <option value="Express">Express</option>
//       </select>
//       <input type="number" name="rating" min="1" max="5" step="0.1" placeholder="Rating" value={form.rating} onChange={handleChange} className="w-full border rounded p-2" />
//       <input type="number" name="reviews" placeholder="Reviews Count" value={form.reviews} onChange={handleChange} className="w-full border rounded p-2" />
//       <input type="number" name="stock" placeholder="Stock Quantity" value={form.stock} onChange={handleChange} className="w-full border rounded p-2" />
//       <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" />
//       <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded p-2" />
//       {form.imagePreview && <img src={form.imagePreview} alt="Preview" className="h-32 w-32 mt-2 rounded object-cover" />}
//       <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Product</button>
//     </form>
//   );
// }














// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";

// export default function AddProductForm({ fetchProducts, editingProduct, closeForm }) {
//   const seller = JSON.parse(localStorage.getItem("user"));
//   if (!seller || seller.role !== "seller") return <p>Seller not logged in!</p>;

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     categoryType: "New",
//     categoryName: "",
//     brand: "",
//     colors: "",
//     warranty: "",
//     delivery: "",
//     rating: "",
//     reviews: "",
//     stock: "",
//     description: "",
//     imageFile: null,
//     imagePreview: "",
//   });

//   // Pre-fill form if editing
//   useEffect(() => {
//     if (editingProduct) {
//       setForm({
//         name: editingProduct.name || "",
//         price: editingProduct.price || "",
//         categoryType: editingProduct.categoryType || "New",
//         categoryName: editingProduct.categoryName || "",
//         brand: editingProduct.brand || "",
//         colors: editingProduct.colors ? editingProduct.colors.join(",") : "",
//         warranty: editingProduct.warranty || "",
//         delivery: editingProduct.delivery || "",
//         rating: editingProduct.rating || "",
//         reviews: editingProduct.reviews || "",
//         stock: editingProduct.stock || "",
//         description: editingProduct.description || "",
//         imageFile: null,
//         imagePreview: editingProduct.imageUrl ? `http://localhost:8080${editingProduct.imageUrl}` : "",
//       });
//     }
//   }, [editingProduct]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setForm({ ...form, imageFile: file, imagePreview: URL.createObjectURL(file) });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("authToken");
//     const url = editingProduct
//       ? `http://localhost:8080/api/products/edit/${editingProduct._id}`
//       : "http://localhost:8080/api/products/add";
//     const method = editingProduct ? "PUT" : "POST";

//     const formData = new FormData();
//     Object.keys(form).forEach((key) => {
//       if (key === "imageFile" && form.imageFile) formData.append("imageFile", form.imageFile);
//       else if (key === "colors") formData.append("colors", form.colors);
//       else formData.append(key, form[key]);
//     });

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       const data = await res.json();
//       if (!data.success) return toast.error(data.message || "Operation failed");

//       toast.success(editingProduct ? "Product updated successfully!" : "Product added successfully!");
//       fetchProducts();
//       if (closeForm) closeForm();

//       // Reset form after adding
//       if (!editingProduct) {
//         setForm({
//           name: "", price: "", categoryType: "New", categoryName: "", brand: "",
//           colors: "", warranty: "", delivery: "", rating: "", reviews: "", stock: "",
//           description: "", imageFile: null, imagePreview: ""
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-3">
//       <h3 className="text-lg font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h3>

//       <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" required />
//       <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border rounded p-2" required />
      
//       <select name="categoryType" value={form.categoryType} onChange={handleChange} className="w-full border rounded p-2">
//         <option value="New">New</option>
//         <option value="Old">Old</option>
//       </select>
      
//       <input type="text" name="categoryName" placeholder="Category Name" value={form.categoryName} onChange={handleChange} className="w-full border rounded p-2" />
//       <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="w-full border rounded p-2" />
//       <input type="text" name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} className="w-full border rounded p-2" />
      
//       <select name="warranty" value={form.warranty} onChange={handleChange} className="w-full border rounded p-2">
//         <option value="">Warranty</option>
//         <option value="No Warranty">No Warranty</option>
//         <option value="Seller Warranty">Seller Warranty</option>
//         <option value="Brand Warranty">Brand Warranty</option>
//       </select>
      
//       <select name="delivery" value={form.delivery} onChange={handleChange} className="w-full border rounded p-2">
//         <option value="">Delivery</option>
//         <option value="Standard">Standard</option>
//         <option value="Express">Express</option>
//       </select>
      
//       <input type="number" name="rating" min="1" max="5" step="0.1" placeholder="Rating" value={form.rating} onChange={handleChange} className="w-full border rounded p-2" />
//       <input type="number" name="reviews" placeholder="Reviews Count" value={form.reviews} onChange={handleChange} className="w-full border rounded p-2" />
//       <input type="number" name="stock" placeholder="Stock Quantity" value={form.stock} onChange={handleChange} className="w-full border rounded p-2" />
//       <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" />

//       <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded p-2" />
//       {form.imagePreview && <img src={form.imagePreview} alt="Preview" className="h-32 w-32 mt-2 rounded object-cover" />}

//       <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//         {editingProduct ? "Update Product" : "Add Product"}
//       </button>
//     </form>
//   );
// }









//new for add product by admin


import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddProductForm({ fetchProducts, editingProduct, closeForm }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Allow BOTH seller and admin
  if (!user || (user.role !== "seller" && user.role !== "admin"))
    return <p>User not allowed!</p>;

  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryType: "New",
    categoryName: "",
    brand: "",
    colors: "",
    warranty: "",
    delivery: "",
    rating: "",
    reviews: "",
    stock: "",
    description: "",
    imageFile: null,
    imagePreview: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        categoryType: editingProduct.categoryType || "New",
        categoryName: editingProduct.categoryName || "",
        brand: editingProduct.brand || "",
        colors: editingProduct.colors ? editingProduct.colors.join(",") : "",
        warranty: editingProduct.warranty || "",
        delivery: editingProduct.delivery || "",
        rating: editingProduct.rating || "",
        reviews: editingProduct.reviews || "",
        stock: editingProduct.stock || "",
        description: editingProduct.description || "",
        imageFile: null,
        imagePreview: editingProduct.imageUrl
          ? `http://localhost:8080${editingProduct.imageUrl}`
          : "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, imageFile: file, imagePreview: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const url = editingProduct
      ? `http://localhost:8080/api/products/edit/${editingProduct._id}`
      : "http://localhost:8080/api/products/add";

    const method = editingProduct ? "PUT" : "POST";

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "imageFile" && form.imageFile) formData.append("imageFile", form.imageFile);
      else if (key === "colors") formData.append("colors", form.colors);
      else formData.append(key, form[key]);
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message || "Operation failed");

      toast.success(editingProduct ? "Product updated!" : "Product added!");

      fetchProducts();
      if (closeForm) closeForm();

      // Reset form for new product
      if (!editingProduct) {
        setForm({
          name: "",
          price: "",
          categoryType: "New",
          categoryName: "",
          brand: "",
          colors: "",
          warranty: "",
          delivery: "",
          rating: "",
          reviews: "",
          stock: "",
          description: "",
          imageFile: null,
          imagePreview: "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-3">
      <h3 className="text-lg font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h3>

      <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" required />

      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border rounded p-2" required />

      <select name="categoryType" value={form.categoryType} onChange={handleChange} className="w-full border rounded p-2">
        <option value="New">New</option>
        <option value="Old">Old</option>
      </select>

      <input type="text" name="categoryName" placeholder="Category Name" value={form.categoryName} onChange={handleChange} className="w-full border rounded p-2" />

      <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="w-full border rounded p-2" />

      <input type="text" name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} className="w-full border rounded p-2" />

      <select name="warranty" value={form.warranty} onChange={handleChange} className="w-full border rounded p-2">
        <option value="">Warranty</option>
        <option value="No Warranty">No Warranty</option>
        <option value="Seller Warranty">Seller Warranty</option>
        <option value="Brand Warranty">Brand Warranty</option>
      </select>

      <select name="delivery" value={form.delivery} onChange={handleChange} className="w-full border rounded p-2">
        <option value="">Delivery</option>
        <option value="Standard">Standard</option>
        <option value="Express">Express</option>
      </select>

      <input type="number" name="rating" min="1" max="5" step="0.1" placeholder="Rating" value={form.rating} onChange={handleChange} className="w-full border rounded p-2" />

      <input type="number" name="reviews" placeholder="Reviews Count" value={form.reviews} onChange={handleChange} className="w-full border rounded p-2" />

      <input type="number" name="stock" placeholder="Stock Quantity" value={form.stock} onChange={handleChange} className="w-full border rounded p-2" />

      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" />

      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded p-2" />
      {form.imagePreview && <img src={form.imagePreview} alt="Preview" className="h-32 w-32 mt-2 rounded object-cover" />}

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}







