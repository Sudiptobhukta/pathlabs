import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const toggleChat = () => setIsOpen(!isOpen);

  // Quick actions for user
  const quickQuestions = [
    { text: "📅 How to book an appointment?", path: "/book-appointment" },
    { text: "🧪 How to book a test?", path: "/test-appointment" },
    { text: "🔑 How to change password or username?", path: "/settings" },
    { text: "📜 How to check test history?", path: "/test-results" },
    { text: "📖 How to check appointment history?", path: "/bookinghistory" },
  ];

  const handleQuickClick = (q) => {
    setMessages((prev) => [...prev, { text: q.text, sender: "user" }]);
    setIsOpen(false); // Close chatbot
    navigate(q.path); // Navigate to the respective page
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);

    // Check if input matches any quick question
    const matchedQuestion = quickQuestions.find((q) =>
      input.toLowerCase().includes(q.text.toLowerCase().split("how to")[1]?.trim() || "")
    );

    if (matchedQuestion) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: `Sure! Redirecting you to ${matchedQuestion.text}`, sender: "bot" },
        ]);
        setTimeout(() => navigate(matchedQuestion.path), 800);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "For other queries, please call on +91-9876543210.",
            sender: "bot",
          },
        ]);
      }, 500);
    }

    setInput("");
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
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Health Assistant</h2>
            <button onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>

          {/* Quick Questions */}
          <div className="p-3 border-b space-y-2">
            <p className="text-sm text-gray-500 mb-2">Quick help:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickClick(q)}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium transition"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto max-h-64 p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-right ml-auto"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
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
