import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { useTheme } from "../context/ThemeContext";

// Chat Loading Component
const ChatLoader = () => {
  const [dots, setDots] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const isDarkMode = useTheme();
  
  const codeLines = [
    "import { DSAHelper } from 'ai-assistant';",
    "const chatBot = new DSAHelper();",
    "await chatBot.initialize();",
    "console.log('Ready to solve DSA doubts!');"
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    
    const linesInterval = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % codeLines.length);
    }, 1000);
    
    return () => {
      clearInterval(dotsInterval);
      clearInterval(linesInterval);
    };
  }, []);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center transition-all duration-300 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="text-center max-w-2xl px-4">
        {/* Animated Chat Bubbles */}
        <div className="flex items-end justify-center mb-8 space-x-4">
          <div className="flex flex-col space-y-2">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-2xl rounded-bl-sm max-w-xs shadow-lg"
            >
              What's the time complexity of merge sort?
            </motion.div>
          </div>
          <div className="flex flex-col space-y-2">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="px-4 py-2 rounded-2xl rounded-br-sm max-w-xs shadow-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center space-x-1">
                <span>Typing</span>
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-current rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Initializing DSA Chat{dots}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Preparing your intelligent coding assistant
          </p>
        </div>

        {/* Code Animation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 font-mono text-left mb-8 max-w-lg mx-auto border border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">DSA-Assistant.js</span>
          </div>
          <div className="space-y-2 text-sm">
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: index <= currentLine ? 1 : 0.3,
                  color: index === currentLine ? "#10B981" : "inherit"
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <span className="text-gray-400 dark:text-gray-500 mr-3 select-none">{index + 1}</span>
                <span className="text-gray-800 dark:text-gray-200">
                  {line}
                  {index === currentLine && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1 text-green-500"
                    >
                      |
                    </motion.span>
                  )}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mb-2 shadow-lg"
            >
              <span className="text-white font-bold">✓</span>
            </motion.div>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading AI</span>
          </div>
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mb-2 shadow-lg"
            >
              <span className="text-white font-bold">✓</span>
            </motion.div>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">DSA Knowledge</span>
          </div>
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ 
                backgroundColor: ["#6B7280", "#3B82F6", "#6B7280"],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-lg"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            </motion.div>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Chat Ready</span>
          </div>
        </div>

        {/* Fun Facts */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          💡 Did you know? The average interview has 2-3 DSA questions
        </motion.div>
      </div>
    </section>
  );
};

// Main ChatApp Component
function ChatApp() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [input, setInput] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const chatEndRef = useRef(null);
  const isDarkMode = useTheme();

  // Simulate loading time for chat initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Load chats from localStorage on mount
  useEffect(() => {
    if (!loading) {
      const stored = localStorage.getItem("dsa-chats");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setChats(parsed);
          if (parsed.length > 0) setCurrentChatId(parsed[0].chatId);
        } catch (e) {
          console.error("Failed to parse stored chats", e);
        }
      }
    }
  }, [loading]);

  // Sync with localStorage whenever chats change
  useEffect(() => {
    if (Array.isArray(chats)) {
      localStorage.setItem("dsa-chats", JSON.stringify(chats));
    }
  }, [chats]);

  // Scroll to bottom on message update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatId]);

  // Show loader while initializing
  if (loading) {
    return <ChatLoader />;
  }

  const currentChat = chats.find((c) => c.chatId === currentChatId);

  // Handle message send
  const handleSend = () => {
    if (!input.trim() || !currentChatId) return;

    const newMessage = { type: "user", text: input };

    setChats((prev) =>
      prev.map((chat) =>
        chat.chatId === currentChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    setInput("");

    setTimeout(() => {
      const botReply = {
        type: "bot",
        text: "Let me think... Here's a good starting point!",
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.chatId === currentChatId
            ? { ...chat, messages: [...chat.messages, botReply] }
            : chat
        )
      );
    }, 700);
  };

  // Start new chat
  const handleNewChat = () => {
    if (!newTopic.trim()) return;
    const newChat = {
      chatId: uuidv4(),
      topic: newTopic.trim(),
      messages: [
        {
          type: "bot",
          text: `Hi! Ask your DSA doubt on ${newTopic.trim()}.`,
        },
      ],
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.chatId);
    setNewTopic("");
  };

  return (
    <section className="w-full h-screen flex flex-col md:flex-row transition-all duration-300 overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed top-0 left-0 h-full w-72 z-50 transform transition-transform duration-300 md:static md:translate-x-0",
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl md:shadow-none",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">DSA Chat</h1>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="text-xl text-gray-600 dark:text-gray-300">×</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-1 p-4 space-y-4 overflow-y-auto">
            {/* New Chat Input */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="New Topic (e.g., Binary Trees)"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNewChat()}
                className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                onClick={handleNewChat}
                disabled={!newTopic.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
              >
                Start New Chat
              </button>
            </div>

            {/* Topic List */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide px-2">
                Recent Topics
              </h2>
              <div className="space-y-2">
                {chats.map((chat) => (
                  <button
                    key={chat.chatId}
                    onClick={() => {
                      setCurrentChatId(chat.chatId);
                      setMobileMenuOpen(false);
                    }}
                    className={clsx(
                      "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group",
                      chat.chatId === currentChatId
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{chat.topic}</span>
                      <span className={clsx(
                        "text-xs px-2 py-1 rounded-full",
                        chat.chatId === currentChatId
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                      )}>
                        {chat.messages.length}
                      </span>
                    </div>
                  </button>
                ))}
                {chats.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">💬</div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No chats yet. Start your first conversation!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 h-full bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                  <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                  <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                </div>
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {currentChat?.topic ? currentChat.topic : "DSA Chat Assistant"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentChat ? `${currentChat.messages.length} messages` : "Select a topic to start"}
                </p>
              </div>
            </div>
            <a href="/" className="group">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200 border border-blue-200 dark:border-blue-800">
                ← Back to Home
              </button>
            </a>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!currentChatId || !currentChat ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl">
                🤖
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Welcome to DSA Chat Assistant!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Select a topic from the sidebar or create a new chat to start solving your DSA doubts with AI assistance.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl mb-2">🌳</div>
                  <div className="font-medium text-gray-800 dark:text-white">Data Structures</div>
                  <div className="text-gray-500 dark:text-gray-400">Trees, Graphs, Arrays</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-medium text-gray-800 dark:text-white">Algorithms</div>
                  <div className="text-gray-500 dark:text-gray-400">Sorting, Searching, DP</div>
                </div>
              </div>
            </div>
          ) : (
            currentChat.messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={clsx(
                  "flex",
                  msg.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div className={clsx(
                  "max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-sm",
                  msg.type === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-sm"
                )}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        {currentChatId && (
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-end gap-3 max-w-4xl mx-auto">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Ask your DSA doubt..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="w-full px-4 py-3 rounded-2xl outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
              >
                <FaPaperPlane className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ChatApp;