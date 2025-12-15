import React from "react";
import { AiOutlineClose } from "react-icons/ai"; 
import { useNavigate } from "react-router-dom";
import QuickHelp from "./QuickHelp";
import ContactForm from "./ContactForm";
import toast from "react-hot-toast";


const Support = () => {
  const navigate = useNavigate();


  const handleTicketSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;

  const data = {
    name: form.name.value,
    email: form.email.value,
    issueType: form.issueType.value,
    description: form.description.value,
  };

  try {
    const res = await fetch("http://localhost:8080/api/support/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!result.success) return toast.error(result.message);
    toast.success("Ticket submitted successfully!");
    form.reset();
  } catch (err) {
    console.error(err);
    toast.error("Failed to submit ticket");
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Darkened Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => navigate("/")}
      />
      
      {/* Support Content - Dark Theme */}
      <div className="relative bg-gray-900 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800 sticky top-0">
          <h2 className="text-2xl font-bold text-blue-400">Support Center</h2>
          <button 
            onClick={() => navigate("/")}
            className="p-2 transition-all duration-200 rounded-full hover:bg-gray-700 text-gray-400 hover:text-blue-400 text-xl"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* FAQs Section */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">FAQs</h3>
            <ul className="space-y-2">
              {[
                "How to create a shop?",
                "How to track my order?",
                "How to contact the seller?",
                "What is the refund policy?",
                "How to update payment methods?",
                "Shipping and delivery information"
              ].map((faq, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <span className="text-blue-400 mr-2">•</span>
                  {faq}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          
         <ContactForm />

          {/* Ticket Form */}
<<<<<<< HEAD
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Submit a Ticket</h3>
          <form className="space-y-4" onSubmit={handleTicketSubmit}>
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
=======
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 drop-shadow-sm">Submit a Ticket</h3>
          <form className="space-y-4" onSubmit={handleTicketSubmit}>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
    <input
      type="text"
      name="name"
      placeholder="Enter your full name"
<<<<<<< HEAD
      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
=======
      className="w-full bg-white/80 backdrop-blur-sm border border-white/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200"
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
      required
    />
  </div>
  
  <div>
<<<<<<< HEAD
    <label className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
=======
    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
    <input
      type="email"
      name="email"
      placeholder="your@email.com"
<<<<<<< HEAD
      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
=======
      className="w-full bg-white/80 backdrop-blur-sm border border-white/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200"
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
      required
    />
  </div>
  
  <div>
<<<<<<< HEAD
    <label className="block text-sm font-medium text-gray-300 mb-1">Issue Type</label>
    <select
      name="issueType"
      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none appearance-none cursor-pointer"
=======
    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
    <select
      name="issueType"
      className="w-full bg-white/80 backdrop-blur-sm border border-white/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200"
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
      required
    >
      <option value="">Select issue type</option>
      <option value="technical">Technical Issue</option>
      <option value="billing">Billing Problem</option>
      <option value="order">Order Related</option>
      <option value="account">Account Issue</option>
      <option value="other">Other</option>
    </select>
  </div>
  
  <div>
<<<<<<< HEAD
    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
=======
    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
    <textarea
      name="description"
      placeholder="Please describe your issue in detail..."
      rows="4"
<<<<<<< HEAD
      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none outline-none"
=======
      className="w-full bg-white/80 backdrop-blur-sm border border-white/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
      required
    />
  </div>
  
  <button
    type="submit"
<<<<<<< HEAD
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200 font-semibold"
=======
    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
  >
    Submit Ticket
  </button>
</form>

          </div>

          {/* Quick Help Section */}
          <QuickHelp/>


        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-800 border-t border-gray-700 rounded-b-lg">
          <p className="text-center text-sm text-gray-400">
            We're here to help you 24/7! Average response time: under 2 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;