// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function AdminSignup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirm) {
//       alert("Passwords do not match");
//       return;
//     }
//     alert("Admin registered (demo)");
//   };

//   return (
//     <section className="py-12 px-6">
//       <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Admin Sign Up</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Admin Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           />
//           <input
//             type="password"
//             name="confirm"
//             placeholder="Confirm Password"
//             value={form.confirm}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           />
//           <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
//             Sign Up
//           </button>
//         </form>
//         <div className="mt-4 text-center text-sm text-gray-600">
//           <Link to="/admin/signin" className="text-green-700 hover:underline">Back to Sign In</Link>
//         </div>
//       </div>
//     </section>
//   );
// }








import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/main-admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Signup failed");
      } else {
        // Redirect to signin page
        navigate("/admin/signin");
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
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Sign Up</h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
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
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={form.confirm}
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <span>Already have an account? </span>
          <Link to="/admin/signin" className="text-green-700 hover:underline">Sign In</Link>
        </div>
      </div>
    </section>
  );
}
