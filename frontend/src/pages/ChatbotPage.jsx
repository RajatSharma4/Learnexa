import React, { useEffect, useRef, useState } from 'react'
import Help from '../components/Help';
import { serverUrl } from '../App.jsx';

const threadId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const hasGreeted = useRef(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (openChat && !hasGreeted.current) {
      hasGreeted.current = true;
 
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Hey, how can I help you? 👋",
        },
      ]);
    }
  }, [openChat]);

  async function callServer(inputText) {
    const response = await fetch(serverUrl + "/api/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        threadId,
        message: inputText,
      }),
    });

    if (!response.ok)
      throw new Error("Error generating response");

    const result = await response.json();

    return result.message;
  }

  async function generate(text) {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const assistantMessage = await callServer(text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: assistantMessage,
        },
      ]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleAsk() {
    const text = input.trim();

    if (!text) return;

    generate(text);
  }

  function handleKeyUp(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const text = input.trim();

      if (!text) return;

      generate(text);
    }
  }

  return (
    <>
      {/* Floating help button — always visible, sits above the app */}
      <Help onClick={() => setOpenChat(true)} />

      {/*
        Overlay wrapper for the chat panel.
        pointer-events-none on the wrapper means the rest of the app
        underneath stays fully clickable; pointer-events-auto is re-enabled
        only on the panel itself.
      */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div
          className={`absolute top-5 right-5 w-[26rem] max-w-[92vw] h-[88vh] bg-neutral-900 rounded-2xl border border-blue-600 shadow-2xl flex flex-col pointer-events-auto
            transition-all duration-300 ease-out origin-top-right
            ${openChat
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-700">
            <div>
              <h2 className="text-white font-semibold">LMS Assistant</h2>
              <p className="text-sm text-gray-400">Ask anything</p>
            </div>

            <button
              onClick={() => setOpenChat(false)}
              className="text-gray-400 hover:text-white text-xl leading-none"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-gray-500 text-center px-6">
                Start a conversation 👋
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-800 text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 flex items-center gap-1 px-1">
                <span className="animate-pulse">Thinking...</span>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div className="border-t border-neutral-700 p-4">
            <div className="flex gap-3">
              <textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleKeyUp}
                placeholder="Ask anything..."
                className="flex-1 bg-neutral-800 rounded-xl p-3 text-white outline-none resize-none focus:ring-2 focus:ring-blue-600"
              />

              <button
                onClick={handleAsk}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 rounded-xl text-white transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatbotPage