import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import ProductCardDisplay from "../ProductCardDisplay";

// The INITIAL_HISTORY must match the format expected by the Gemini API
const INITIAL_HISTORY = [
    { role: "model", parts: [{ text: "Hello! I am the Bazario Assistant. How can I help you with your e-commerce needs today?" }] }
];


// The INITIAL_HISTORY must match the format expected by the Gemini API
const INITIAL_HISTORY = [
    { role: "model", parts: [{ text: "Hello! I am the Bazario Assistant. How can I help you with your e-commerce needs today?" }] }
];


function ChatBox({ onClose }) {
    // We now use chatHistory to store the full conversation context
    const [chatHistory, setChatHistory] = useState(INITIAL_HISTORY);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const messagesEndRef = useRef(null);
<<<<<<< HEAD
    const [conversation, setConversation] = useState({}); // track giftRecipient
=======
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        setLoading(true);

        // 1. Prepare history for immediate UI update
        const prompt = input.trim();
        const userMessage = { role: "user", parts: [{ text: prompt }] };
        const historyForUI = [...chatHistory, userMessage];
        
        // 2. Update the UI instantly with the user's message
        setChatHistory(historyForUI);
        setInput("");

        try {
            // 3. Call the new Gemini Tool Use API endpoint
            const response = await axios.post("http://localhost:8080/api/chat", {
                prompt: prompt,
                history: chatHistory, // Send the previous history
<<<<<<< HEAD
                conversation, // Send conversation for context
=======
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
            });

            // 4. Update the state using the full conversation history returned by the backend
            if (response.data.newHistory) {
                setChatHistory(response.data.newHistory);
            } else {
                // Fallback for non-history response (shouldn't happen with our backend)
                const botText = response.data.text || "An unexpected response received.";
<<<<<<< HEAD
                const botMessage = { role: "model", parts: [{ text: botText }], products: response.data.structuredProducts || [] };
                setChatHistory((prev) => [...prev, botMessage]);
            }
            if (response.data.conversation) {
                setConversation(response.data.conversation);
            }
=======
                const botMessage = { role: "model", parts: [{ text: botText }] };
                setChatHistory((prev) => [...prev, botMessage]);
            }
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
            
        } catch (error) {
            console.error("Chat API Error:", error);
            const errorMessage = { 
                role: "model", 
                parts: [{ text: "⚠ Network Error: Could not connect to the Bazario Assistant server." }] 
            };
            // Add the error message to the history
            setChatHistory((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };
    
    // Helper function to extract text for display (handles the API structure)
    const extractText = (parts) => parts.map(part => part.text || '').join(' ');


    return (
        <div className="fixed bottom-5 right-5 w-96 bg-gray-800 rounded-xl shadow-2xl flex flex-col border border-gray-700 z-50 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 flex justify-between items-center shadow-md">
                <h4 className="font-bold text-lg">Bazario Assistant 🤖</h4>
                <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors duration-200 text-xl">
                    <FaTimes />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-80 space-y-3 bg-gray-900">
                {chatHistory.map((msg, i) => (
                    // Ignore function calls/responses in the display
                    msg.parts[0].functionCall ? null : 
                    msg.parts[0].functionResponse ? null : 
                    
                    <div
                        key={i}
                        className={`p-3 rounded-lg max-w-[85%] break-words shadow-md text-gray-100
                            ${msg.role === "user"
                                ? "bg-blue-600 self-end ml-auto rounded-br-none"
                                : "bg-gray-700 self-start rounded-tl-none"}
                        }`}
                    >
                        <strong className="block text-xs font-medium mb-1">
                            {msg.role === 'user' ? 'You' : 'Assistant'}
                        </strong>
                        <p className="text-sm">{extractText(msg.parts)}</p>
<<<<<<< HEAD
                        {msg.products && msg.products.length > 0 && (
                            <div className="mt-3">
                                <ProductCardDisplay products={msg.products} />
                            </div>
                        )}
=======
>>>>>>> 03cf849843087c1d50dea49e2532aafd15110219
                    </div>
                ))}

                {/* Loading Indicator */}
                {loading && (
                    <div className="p-3 rounded-lg bg-gray-700 self-start text-gray-300 shadow-md rounded-tl-none">
                        <p className="text-sm italic">Assistant is typing...</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700 flex gap-3 bg-gray-800">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for products or track orders..."
                    className="flex-1 border border-gray-600 rounded-lg px-3 py-2.5 text-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={loading}
                />
                <button
                    onClick={handleSend}
                    className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? 'Send...' : 'Send'}
                </button>
            </div>
        </div>
    );
}

export default ChatBox;