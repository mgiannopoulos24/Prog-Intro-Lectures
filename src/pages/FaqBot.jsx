import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Loader2 } from "lucide-react";

const isLocal = window.location.hostname === "localhost";
const API_URL = isLocal
  ? "http://localhost:5000" 
  : "https://prog-intro-lectures-api.onrender.com"; 

// Simple message structure for state
const initialMessages = [
  {
    role: "bot",
    content:
      "Γεια! Είμαι το FAQ Bot των μαθημάτων Προγραμματισμού. Ρώτησέ με οτιδήποτε για το μάθημα!",
  },
];

const FaqBot = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await axios.post(`${API_URL}/faq-query`, {
        question: userMessage,
      });

      // 3. Add bot's response to chat
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: response.data.answer }, // Assuming backend returns { answer: "..." }
      ]);
    } catch (error) {
      console.error("FAQ Bot API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Προέκυψε ένα σφάλμα κατά την επικοινωνία με τον server. Παρακαλώ δοκιμάστε ξανά αργότερα.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const Message = ({ message }) => (
    <div
      className={`flex mb-4 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 shadow-md ${
          message.role === "user"
            ? "bg-sky-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 mt-12 sm:mt-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          FAQ Bot
        </h1>
        <h3 className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Ρώτα οτιδήποτε για τις διαλέξεις και τα εργαστήρια!
        </h3>
        <hr className="my-6 border-t border-gray-200 dark:border-gray-700" />
      </div>

      <div className="mx-auto w-full max-w-3xl flex flex-col h-[70vh] rounded-xl shadow-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800">
        <div className="flex-grow overflow-y-auto p-5 space-y-3 custom-scrollbar">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 shadow-md">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t border-gray-300 dark:border-gray-700 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Πληκτρολογήστε την ερώτησή σας..."
            className="flex-grow p-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:text-gray-100"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-r-lg text-white transition-colors ${
              isLoading || !input.trim()
                ? "bg-sky-400 dark:bg-sky-600 opacity-60 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-600"
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FaqBot;