import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import ChatBox from "./ChatBox";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-110"
      >
        <FaComments size={24} />
      </button>

      {/* Chat box */}
      {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
    </div>
  );
}
