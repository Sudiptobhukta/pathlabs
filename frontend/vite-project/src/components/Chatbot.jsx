import React, { useState } from "react";
import { X, Send } from "lucide-react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
  if (input.trim() === "") return;

  
  setMessages((prev) => [...prev, { text: input, sender: "user" }]);

  const userMessage = input;
  setInput("");


  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      { text: "This is a test response from your AI bot.", sender: "bot" }
    ]);
  }, 500);
};


  return (
    <div>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg"
          onClick={toggleChat}
        >
          💬
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-2xl z-50 border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">AI Health Assistant</h2>
            <button onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto max-h-72 p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-right self-end"
                    : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center border-t p-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 text-indigo-600 hover:text-indigo-800"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
