// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaShoppingBag } from "react-icons/fa";
// import axios from "axios"; // we will use axios to call backend

// export default function Signup() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Call backend API
//       const res = await axios.post("http://localhost:8080/api/auth/buyer/signup", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone
//       });

//       alert(res.data.message); // e.g., "Buyer registered successfully"
//       navigate("/signin"); // redirect to signin
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSocialSignUp = (provider) => {
//     console.log(`Sign up with ${provider}`);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//       <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md border border-white/30 p-6">
//         <div className="flex items-center justify-between mb-4 border-b border-white/30 pb-2">
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 bg-gradient-to-r from-orange-500 to-green-600 rounded-lg shadow-lg">
//               <FaShoppingBag className="text-white text-sm" />
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-gray-800">Sign Up</h2>
//               <p className="text-xs text-gray-600">Create your Bazzario account</p>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate("/")}
//             className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 text-2xl hover:text-orange-500 transition-all duration-200"
//           >
//             <AiOutlineClose />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           {/* Full Name */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
//             <div className="relative">
//               <FaUser className="absolute inset-y-0 left-2.5 text-gray-500 text-sm my-auto" />
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 className="w-full pl-9 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="03XXXXXXXXX"
//               className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
//             <div className="relative">
//               <FaEnvelope className="absolute inset-y-0 left-2.5 text-gray-500 text-sm my-auto" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="your@email.com"
//                 className="w-full pl-9 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
//             <div className="relative">
//               <FaLock className="absolute inset-y-0 left-2.5 text-gray-500 text-sm my-auto" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
//                 className="w-full pl-9 pr-10 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500"
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

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
//             <div className="relative">
//               <FaLock className="absolute inset-y-0 left-2.5 text-gray-500 text-sm my-auto" />
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm password"
//                 className="w-full pl-9 pr-10 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-2.5 flex items-center text-gray-500"
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-2.5 px-4 rounded-lg font-medium text-white text-sm shadow-lg transition-all ${
//               isLoading
//                 ? "bg-green-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-orange-500 to-green-600 hover:from-green-600 hover:to-green-700"
//             }`}
//           >
//             {isLoading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         {/* Divider & Social */}
//         <div className="my-3 flex items-center">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="mx-2 text-gray-500 text-xs">or continue with</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

//         <div className="grid grid-cols-2 gap-2">
//           <button
//             onClick={() => handleSocialSignUp("google")}
//             className="flex items-center justify-center gap-1.5 border border-gray-300 py-2 rounded-lg bg-white hover:bg-gray-50 text-xs font-medium"
//           >
//             <FaGoogle className="text-red-500 text-sm" /> Google
//           </button>
//           <button
//             onClick={() => handleSocialSignUp("facebook")}
//             className="flex items-center justify-center gap-1.5 border border-gray-300 py-2 rounded-lg bg-white hover:bg-gray-50 text-xs font-medium"
//           >
//             <FaFacebook className="text-blue-600 text-sm" /> Facebook
//           </button>
//         </div>

//         <div className="mt-4 text-center text-xs text-gray-700">
//           Already have an account?{" "}
//           <button
//             type="button"
//             onClick={() => navigate("/signin")}
//             className="text-green-600 hover:text-green-700 font-medium"
//           >
//             Sign in
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }













import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaShoppingBag } from "react-icons/fa";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [role, setRole] = useState("buyer"); // default role
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    // seller-specific
    fullName: "",
    phoneNumber: "",
    shopName: "",
    shopCategory: "",
    businessType: "individual",
    address: "",
    companyName: "",
    taxNumber: "",
    bankAccount: "",
    idNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      if (role === "buyer") {
        const res = await axios.post("http://localhost:8080/api/auth/buyer/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
        alert(res.data.message);
      } else if (role === "seller") {
        const res = await axios.post("http://localhost:8080/api/auth/seller/signup", {
          fullName: formData.fullName || formData.name,
          phoneNumber: formData.phoneNumber || formData.phone,
          email: formData.email,
          password: formData.password,
          shopName: formData.shopName,
          shopCategory: formData.shopCategory,
          businessType: formData.businessType,
          address: formData.address,
          companyName: formData.companyName,
          taxNumber: formData.taxNumber,
          bankAccount: formData.bankAccount,
          idNumber: formData.idNumber,
        });
        alert(res.data.message);
      }

      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md border border-white/30 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-white/30 pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-orange-500 to-green-600 rounded-lg shadow-lg">
              <FaShoppingBag className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Sign Up</h2>
              <p className="text-xs text-gray-600">Create your Bazzario account</p>
            </div>
          </div>
          <button onClick={() => navigate("/")} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 text-2xl hover:text-orange-500 transition-all duration-200">
            <AiOutlineClose />
          </button>
        </div>

        {/* Role Selector */}
        <div className="flex gap-2 mb-4 text-sm">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`flex-1 py-1 rounded-lg font-medium ${role === "buyer" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole("seller")}
            className={`flex-1 py-1 rounded-lg font-medium ${role === "seller" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Seller
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Buyer fields */}
          {role === "buyer" && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute inset-y-0 left-2.5 text-gray-500 text-sm my-auto" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="03XXXXXXXXX"
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>
            </>
          )}

          {/* Seller fields */}
          {role === "seller" && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe"
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="03XXXXXXXXX"
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Shop Name</label>
                <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="My Shop"
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Shop Category</label>
                <input type="text" name="shopCategory" value={formData.shopCategory} onChange={handleChange} placeholder="Fashion"
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Business Type</label>
                <select name="businessType" value={formData.businessType} onChange={handleChange}
                  className="w-full py-2 pl-3 pr-3 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500">
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City"
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Ltd."
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tax Number</label>
                <input type="text" name="taxNumber" value={formData.taxNumber} onChange={handleChange} placeholder="123456789"
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Bank Account</label>
                <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="Bank Account Number"
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">ID Number</label>
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="CNIC / Passport"
                  className="w-full pl-3 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              </div>
            </>
          )}

          {/* Email & Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute inset-y-0 left-2.5 text-gray-500 text-sm my-auto" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute inset-y-0 left-2.5 text-gray-500 text-sm my-auto" />
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter password"
                className="w-full pl-9 pr-10 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2.5 flex items-center text-gray-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute inset-y-0 left-2.5 text-gray-500 text-sm my-auto" />
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password"
                className="w-full pl-9 pr-10 py-2 text-sm bg-white/70 border border-white/50 rounded-lg focus:ring-1 focus:ring-green-500" required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-2.5 flex items-center text-gray-500">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className={`w-full py-2.5 px-4 rounded-lg font-medium text-white text-sm shadow-lg transition-all ${isLoading ? "bg-green-400 cursor-not-allowed" : "bg-gradient-to-r from-orange-500 to-green-600 hover:from-green-600 hover:to-green-700"}`}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Social Signup */}
        <div className="my-3 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-xs">or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => console.log("Google signup")} className="flex items-center justify-center gap-1.5 border border-gray-300 py-2 rounded-lg bg-white hover:bg-gray-50 text-xs font-medium">
            <FaGoogle className="text-red-500 text-sm" /> Google
          </button>
          <button onClick={() => console.log("Facebook signup")} className="flex items-center justify-center gap-1.5 border border-gray-300 py-2 rounded-lg bg-white hover:bg-gray-50 text-xs font-medium">
            <FaFacebook className="text-blue-600 text-sm" /> Facebook
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-gray-700">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/signin")} className="text-green-600 hover:text-green-700 font-medium">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
