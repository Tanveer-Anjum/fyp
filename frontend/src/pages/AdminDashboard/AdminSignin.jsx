

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function AdminSignin() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:8080/api/main-admin/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         setError(data.message || "Signin failed");
//       } else {
//         // SAVE ADMIN EXACTLY LIKE OTHER USERS
//         localStorage.setItem("authToken", data.token); // Store raw token
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             id: data.user.id,
//             fullName: data.user.fullName, // Changed from name to fullName
//             email: data.user.email,
//             role: data.user.role, // Use the actual role from the backend
//           })
//         );

//         navigate("/admin/dashboard");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Server error. Please try again later.");
//     }

//     setLoading(false);
//   };

//   return (
//     <section className="py-12 px-6 min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//           Admin Sign In
//         </h1>

//         {error && (
//           <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Admin Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm text-gray-600">
//           <span>Don't have an account? </span>
//           <Link
//             to="/admin/signup"
//             className="text-green-700 hover:underline"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }






























import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSignin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/main-admin/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Signin failed");
      } else {
        // Save token and admin info
        localStorage.setItem("authToken", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            fullName: data.user.fullName,
            email: data.user.email,
            role: data.user.role,
          })
        );

        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <section className="py-12 px-6 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Sign In
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <span>Don't have an account? </span>
          <Link
            to="/admin/signup"
            className="text-green-700 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
