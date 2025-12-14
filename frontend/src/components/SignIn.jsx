

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaGoogle,
//   FaFacebook,
//   FaEnvelope,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
//   FaShoppingBag,
// } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";
// import toast from "react-hot-toast";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../firebase";
// import {  GoogleAuthProvider } from "firebase/auth";


// export default function SignIn() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   // -----------------------------
//   // GOOGLE LOGIN
//   // -----------------------------
//   // Inside your SignIn component
// const handleGoogleLogin = async () => {
//   try {
//     // Create provider and force account selection
//     const provider = new GoogleAuthProvider();
//     provider.setCustomParameters({ prompt: "select_account" });

//     // Open Google popup
//     const result = await signInWithPopup(auth, provider);

//     // Get ID token to send to backend
//     const idToken = await result.user.getIdToken();

//     // Send token to backend for verification
//     const response = await fetch("http://localhost:8080/api/auth/google", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token: idToken }),
//     });

//     const data = await response.json();

//     if (!data.success) {
//       toast.error(data.message || "Google authentication failed");
//       return;
//     }

//     // Save JWT token from backend
//     localStorage.setItem(
//       "authToken",
//       JSON.stringify({
//         token: data.token,
//         expiry: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
//       })
//     );

//     // ✅ Save user info as a single object
//     const user = {
//       name: data.user.name,
//       email: data.user.email,
//       role: data.user.role || "buyer",
//     };
//     localStorage.setItem("user", JSON.stringify(user));

//     // Trigger a storage event so Navbar updates immediately
//     window.dispatchEvent(new Event("storage"));

//     toast.success("Signed in with Google!");
//     navigate("/");

//   } catch (error) {
//     console.error("Google login error:", error);
//     toast.error("Google login failed");
//   }
// };

//   // -----------------------------
//   // NORMAL EMAIL LOGIN
//   // -----------------------------
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   try {
//     const res = await fetch("http://localhost:8080/api/auth/signin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     setIsLoading(false);

//     if (!data.success) {
//       toast.error(data.message || "Invalid credentials");
//       return;
//     }

//     // Save JWT token
//     localStorage.setItem(
//       "authToken",
//       JSON.stringify({
//         token: data.token,
//         expiry: new Date().getTime() + 3600 * 1000, // 1 hour
//       })
//     );

//     // Save user info as a single object (so navbar works)
//     const user = {
//       name: data.user.name,
//       email: data.user.email,
//       role: data.user.role || "buyer",
//     };
//     localStorage.setItem("user", JSON.stringify(user));

//     toast.success("Signed in successfully!");

//     // Redirect
//     const redirectPath = localStorage.getItem("redirectAfterLogin");
//     if (redirectPath) {
//       localStorage.removeItem("redirectAfterLogin");
//       navigate(redirectPath);
//     } else {
//       navigate("/");
//     }
//   } catch (err) {
//     setIsLoading(false);
//     console.error("Signin error:", err);
//     toast.error("You entered wrong email or password");
//   }
// };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // -----------------------------
//   // UI
//   // -----------------------------
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-white/20 backdrop-blur-md"
//         onClick={() => navigate("/")}
//       />
//       <div className="relative bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl w-full max-w-md border border-white/30 transform transition-all duration-300">

//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-white/30 bg-white/40">
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg">
//               <FaShoppingBag className="text-white text-sm" />
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-gray-800">Sign In</h2>
//               <p className="text-xs text-gray-600">Access your Bazzario account</p>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate("/")}
//             className="p-1.5 text-xl hover:bg-white/40 rounded-full text-gray-600 hover:text-green-600"
//           >
//             <AiOutlineClose />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-4 bg-transparent">
//           <div className="mb-3">
//             <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
//             <div className="relative">
//               <FaEnvelope className="absolute inset-y-0 left-2.5 my-auto text-gray-500 text-sm" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="your@email.com"
//                 className="w-full pl-9 pr-3 py-2 text-sm bg-white/80 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
//             <div className="relative">
//               <FaLock className="absolute inset-y-0 left-2.5 my-auto text-gray-500 text-sm" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
//                 className="w-full pl-9 pr-10 py-2 text-sm bg-white/80 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-2.5 flex items-center text-gray-500"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-2.5 rounded-lg font-medium text-white ${isLoading ? "bg-green-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600"}`}
//           >
//             {isLoading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         {/* Google */}
//         <div className="px-4 py-3">
//           <div className="text-center text-xs text-gray-500 mb-2">or continue with</div>
//           <div className="grid grid-cols-2 gap-2">
//             <button
//               onClick={handleGoogleLogin}
//               className="flex items-center justify-center gap-1.5 border border-white/30 py-2 rounded-lg bg-white/30 hover:bg-white/40"
//             >
//               <FaGoogle className="text-red-600 text-sm" />
//               <span className="text-gray-700 text-xs font-medium">Google</span>
//             </button>

//             <button className="flex items-center justify-center gap-1.5 border border-white/30 py-2 rounded-lg bg-white/30 hover:bg-white/40">
//               <FaFacebook className="text-blue-600 text-sm" />
//               <span className="text-gray-700 text-xs font-medium">Facebook</span>
//             </button>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-4 py-3 text-center bg-white/40 border-t border-white/30">
//           <p className="text-xs text-gray-700">
//             New to Bazzario?{" "}
//             <button onClick={() => navigate("/signup")} className="text-green-600 hover:text-green-700 font-medium">
//               Sign up
//             </button>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }


































// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaGoogle, FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShoppingBag
// } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";
// import toast from "react-hot-toast";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "../firebase";

// export default function SignIn() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   // -----------------------------
//   // GOOGLE LOGIN
//   // -----------------------------
//   const handleGoogleLogin = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       provider.setCustomParameters({ prompt: "select_account" });

//       const result = await signInWithPopup(auth, provider);
//       const idToken = await result.user.getIdToken();

//       const res = await fetch("http://localhost:8080/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: idToken }),
//       });

//       const data = await res.json();
//       if (!data.success) return toast.error(data.message || "Google authentication failed");

//       // Save token
//       localStorage.setItem("authToken", JSON.stringify({ token: data.token, expiry: Date.now() + 7*24*60*60*1000 }));
      
//       // Save user info including role
//       const user = {
//         name: data.user.name,
//         email: data.user.email,
//         role: data.user.role || "buyer",
//       };
//       localStorage.setItem("user", JSON.stringify(user));
//       window.dispatchEvent(new Event("storage"));

//       toast.success("Signed in with Google!");

//       // Redirect based on role
//       if (user.role === "seller") navigate("/seller/dashboard");
//       else navigate("/");

//     } catch (error) {
//       console.error(error);
//       toast.error("Google login failed");
//     }
//   };

//   // -----------------------------
//   // NORMAL EMAIL LOGIN
//   // -----------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await fetch("http://localhost:8080/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       setIsLoading(false);

//       if (!data.success) return toast.error(data.message || "Invalid credentials");

//       // Save JWT token
//       localStorage.setItem("authToken", JSON.stringify({ token: data.token, expiry: Date.now() + 3600*1000 }));

//       // Save user info including role
//       const user = {
//         id: data.user.id,
//         name: data.user.name,
//         email: data.user.email,
//         role: data.role || "buyer",
//       };
//       localStorage.setItem("user", JSON.stringify(user));

//       toast.success("Signed in successfully!");

//       // Redirect based on role
//       if (user.role === "seller") navigate("/seller/dashboard");
//       else navigate("/");

//     } catch (err) {
//       setIsLoading(false);
//       console.error(err);
//       toast.error("You entered wrong email or password");
//     }
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   // -----------------------------
//   // UI
//   // -----------------------------
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-white/20 backdrop-blur-md" onClick={() => navigate("/")} />
//       <div className="relative bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl w-full max-w-md border border-white/30 transform transition-all duration-300">

//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-white/30 bg-white/40">
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg">
//               <FaShoppingBag className="text-white text-sm" />
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-gray-800">Sign In</h2>
//               <p className="text-xs text-gray-600">Access your Bazzario account</p>
//             </div>
//           </div>
//           <button onClick={() => navigate("/")} className="p-1.5 text-xl hover:bg-white/40 rounded-full text-gray-600 hover:text-green-600">
//             <AiOutlineClose />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-4 bg-transparent">
//           <div className="mb-3">
//             <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
//             <div className="relative">
//               <FaEnvelope className="absolute inset-y-0 left-2.5 my-auto text-gray-500 text-sm" />
//               <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"
//                 className="w-full pl-9 pr-3 py-2 text-sm bg-white/80 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
//             </div>
//           </div>

//           <div className="mb-3">
//             <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
//             <div className="relative">
//               <FaLock className="absolute inset-y-0 left-2.5 my-auto text-gray-500 text-sm" />
//               <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter password"
//                 className="w-full pl-9 pr-10 py-2 text-sm bg-white/80 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
//               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2.5 flex items-center text-gray-500">
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" disabled={isLoading} className={`w-full py-2.5 rounded-lg font-medium text-white ${isLoading ? "bg-green-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600"}`}>
//             {isLoading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         {/* Google / Facebook */}
//         <div className="px-4 py-3">
//           <div className="text-center text-xs text-gray-500 mb-2">or continue with</div>
//           <div className="grid grid-cols-2 gap-2">
//             <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-1.5 border border-white/30 py-2 rounded-lg bg-white/30 hover:bg-white/40">
//               <FaGoogle className="text-red-600 text-sm" />
//               <span className="text-gray-700 text-xs font-medium">Google</span>
//             </button>

//             <button className="flex items-center justify-center gap-1.5 border border-white/30 py-2 rounded-lg bg-white/30 hover:bg-white/40">
//               <FaFacebook className="text-blue-600 text-sm" />
//               <span className="text-gray-700 text-xs font-medium">Facebook</span>
//             </button>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-4 py-3 text-center bg-white/40 border-t border-white/30">
//           <p className="text-xs text-gray-700">
//             New to Bazzario?{" "}
//             <button onClick={() => navigate("/signup")} className="text-green-600 hover:text-green-700 font-medium">
//               Sign up
//             </button>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }


































import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebook,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShoppingBag
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("buyer");

  // ============================================================
  // GOOGLE LOGIN
  // ============================================================
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Google authentication failed");
        return;
      }

      // Save token
      localStorage.setItem(
        "authToken",
        JSON.stringify({
          token: data.token,
          expiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
        })
      );

      // Save user (fixed → saving name)
      const user = {
        id: data.user._id,
        fullName: data.user.fullName,
        email: data.user.email,
        role: data.user.role,
      };

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Signed in with Google!");

      // Redirect
      if (user.role === "seller") navigate("/seller/dashboard");
      else navigate("/");

    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  // ============================================================
  // NORMAL EMAIL LOGIN
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let endpoint =
        role === "buyer"
          ? "http://localhost:8080/api/users/signin"
          : "http://localhost:8080/api/seller/signin";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!data.success) {
        return toast.error(data.message || "Invalid credentials");
      }

      // Save token (simple)
      localStorage.setItem("authToken", data.token);

      // Save user with correct key -> name
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
        })
      );

      toast.success("Signed in successfully!");

      // Redirect by role
      if (data.user.role === "seller") navigate("/seller/dashboard");
      else if (data.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={() => navigate("/")}
      />
      <div className="relative bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 transform transition-all duration-300 scale-95 hover:scale-100">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700 bg-gray-700 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg shadow-lg">
              <FaShoppingBag className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
              <p className="text-sm text-gray-300">Access your Bazzario account</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="p-2 text-xl rounded-full text-gray-400 hover:bg-gray-600 hover:text-white transition-colors duration-200"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* ROLE SELECTOR */}
        <div className="flex gap-3 mb-5 text-base px-5 pt-5">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md
              ${role === "buyer"
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"}
            }`}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole("seller")}
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md
              ${role === "seller"
                ? "bg-amber-600 text-white hover:bg-amber-700"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"}
            }`}
          >
            Seller
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute inset-y-0 left-3 my-auto text-gray-400 text-lg" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@example.com"
                className="w-full pl-11 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition-colors duration-200"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute inset-y-0 left-3 my-auto text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-11 pr-12 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition-colors duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-bold text-white text-lg shadow-lg transition-all duration-200
              ${isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"}
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* SOCIAL LOGIN */}
        <div className="px-5 py-4 border-t border-gray-700 mt-4">
          <div className="text-center text-sm text-gray-400 mb-3">or continue with</div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 border border-gray-600 py-2.5 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors duration-200 shadow-sm"
            >
              <FaGoogle className="text-red-500 text-xl" />
              <span className="text-sm font-medium">Google</span>
            </button>

            <button className="flex items-center justify-center gap-2 border border-gray-600 py-2.5 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors duration-200 shadow-sm">
              <FaFacebook className="text-blue-500 text-xl" />
              <span className="text-sm font-medium">
                Facebook
              </span>
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-4 text-center bg-gray-700 border-t border-gray-700 rounded-b-xl">
          <p className="text-sm text-gray-300">
            New to Bazzario?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-400 hover:text-indigo-300 font-semibold ml-1"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}












