import React, { useState, useRef } from "react";

function MainBody() {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    // Auto-resize
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    console.log("User asked:", inputValue);
    setInputValue("");
    textareaRef.current.style.height = "auto";
  };

  return (
    <>
      <div className="p-6 h-150 text-center">
        <h1 className="text-3xl sm:text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 bg-clip-text text-transparent font-bold mb-6">
          Ask your questions here!
        </h1>
      </div>

      <div className="p-2 pr-4 bg-zinc-700 border border-gray-600 rounded-3xl max-w-lg w-full mx-auto flex items-end text-white shadow-md">
        <textarea
          ref={textareaRef}
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
          className="w-full max-h-40 overflow-y-auto p-3 text-white bg-transparent outline-none resize-none placeholder-gray-400"
        />
        <button
          onClick={handleSubmit}
          className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-full font-semibold"
        >
          Ask
        </button>
      </div>
    </>
  );
}

export default MainBody;
