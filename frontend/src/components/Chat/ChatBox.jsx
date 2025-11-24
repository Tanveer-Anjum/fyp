import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

function ChatBox({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: Chatbot not responding." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white rounded-lg shadow-xl flex flex-col border-2 border-green-500">
      {/* Header */}
      <div className="bg-green-600 text-white p-3 flex justify-between items-center rounded-t-lg">
        <h4 className="font-semibold">Chat Support</h4>
        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto max-h-60 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md max-w-[75%] break-words ${
              msg.sender === "user"
                ? "bg-orange-200 self-end text-right ml-auto"
                : "bg-green-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-green-400 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
