
import React, { useState, useRef } from "react";
import { URL } from "../constants";
import Answer from "../components/Answer";

function MainBody() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);
  const textareaRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: inputValue }]
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

     const data = await response.json();
let generatedText = data.candidates[0].content.parts[0].text;
generatedText = generatedText.split("* ").map((item) => item.trim()).filter(item => item !== "");
console.log("Generated Text Array:", generatedText);
setResult(generatedText);

      setInputValue("");
      textareaRef.current.style.height = "auto";
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

   const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 px-4">
      <h1 className="text-3xl sm:text-4xl text-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold mb-6">
        Ask your questions here!
      </h1>

      <div className="w-full max-w-6xl bg-zinc-800 border border-zinc-700 rounded-2xl p-4 shadow-lg overflow-y-auto max-h-96 text-white mb-4 whitespace-pre-wrap">
       {result.length > 0 ? (
  result.map((item, index) => (
    <Answer ans={item} key={index} />
  ))
) : (
  <p>Your answer will appear here.</p>
)}

      </div>
      {result && (
        <button
          onClick={handleCopy}
          className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded font-semibold"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}

      <div className="flex w-full max-w-xl bg-zinc-800 border border-zinc-700 rounded-3xl shadow-md overflow-hidden">
        <textarea
          ref={textareaRef}
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-grow p-3 bg-transparent text-white resize-none focus:outline-none placeholder-gray-400 max-h-40 overflow-y-auto"
        />
        <button
          onClick={handleSubmit}
          className="px-4 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold"
        >
          Ask
        </button>
      </div>
    </div>
  );
}

export default MainBody;