import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaShoppingBag } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast"; // Import toast

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
      toast.error("Passwords do not match!"); // Replaced alert
      return;
    }

    setIsLoading(true);

    try {
      if (role === "buyer") {
        const res = await axios.post("http://localhost:8080/api/users/signup", {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
        });
        toast.success(res.data.message); // Replaced alert
      } else if (role === "seller") {
        const res = await axios.post("http://localhost:8080/api/seller/signup", {
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
        toast.success(res.data.message); // Replaced alert
      }

      navigate("/signin");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong"); // Replaced alert
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80 backdrop-blur-sm p-4">
      <div className="relative bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 p-6 transform transition-all duration-300 scale-95 hover:scale-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b border-gray-700 pb-4 bg-gray-700 rounded-t-lg -mx-6 px-6 -mt-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg shadow-lg">
              <FaShoppingBag className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Sign Up</h2>
              <p className="text-sm text-gray-300">Create your Bazzario account</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-600 hover:text-white transition-colors duration-200 text-xl"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Role Selector */}
        <div className="flex gap-3 mb-5 text-base">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Buyer fields */}
          {role === "buyer" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute inset-y-0 left-3 text-gray-400 text-lg my-auto" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition-colors duration-200" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <div className="relative">
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="03XXXXXXXXX"
                    className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition-colors duration-200" required />
                </div>
              </div>
            </>
          )}

          {/* Seller fields */}
          {role === "seller" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe"
                  className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-colors duration-200" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="03XXXXXXXXX"
                  className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-colors duration-200" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Shop Name</label>
                <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="My Awesome Shop"
                  className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-colors duration-200" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Shop Category</label>
                <input type="text" name="shopCategory" value={formData.shopCategory} onChange={handleChange} placeholder="Electronics, Fashion, etc."
                  className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-colors duration-200" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Business Type</label>
                <select name="businessType" value={formData.businessType} onChange={handleChange}
                  className="w-full py-2.5 pl-4 pr-4 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white transition-colors duration-200">
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, City, Country"
                  className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-colors duration-200" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name (if applicable)</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Optional: Your Company Name"
                  className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-colors duration-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tax Number (if applicable)</label>
                <input type="text" name="taxNumber" value={formData.taxNumber} onChange={handleChange} placeholder="Optional: Your Tax Number"
                  className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-colors duration-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bank Account Number</label>
                <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="Your Bank Account Number"
                  className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-colors duration-200" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ID Number (CNIC/Passport)</label>
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="Your CNIC or Passport Number"
                  className="w-full pl-4 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400 transition-colors duration-200" required />
              </div>
            </div>
          )}

          {/* Email & Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute inset-y-0 left-3 text-gray-400 text-lg my-auto" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@example.com"
                className="w-full pl-11 pr-4 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition-colors duration-200" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute inset-y-0 left-3 text-gray-400 text-lg my-auto" />
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create a password"
                className="w-full pl-11 pr-12 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition-colors duration-200" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute inset-y-0 left-3 text-gray-400 text-lg my-auto" />
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password"
                className="w-full pl-11 pr-12 py-2.5 text-base bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition-colors duration-200" required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className={`w-full py-3 rounded-lg font-bold text-white text-lg shadow-lg transition-all duration-200 ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"}`}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Social Signup */}
        <div className="my-5 flex items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-3 text-gray-400 text-sm">or continue with</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => console.log("Google signup")} className="flex items-center justify-center gap-2 border border-gray-600 py-2.5 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors duration-200 shadow-sm">
            <FaGoogle className="text-red-500 text-xl" /> <span className="text-sm font-medium">Google</span>
          </button>
          <button onClick={() => console.log("Facebook signup")} className="flex items-center justify-center gap-2 border border-gray-600 py-2.5 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors duration-200 shadow-sm">
            <FaFacebook className="text-blue-500 text-xl" /> <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-300 border-t border-gray-700 pt-4 -mx-6 px-6 pb-4 bg-gray-700 rounded-b-lg -mb-6">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/signin")}
            className="text-indigo-400 hover:text-indigo-300 font-semibold ml-1">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
