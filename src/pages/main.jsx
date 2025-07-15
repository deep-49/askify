import React, { useState, useRef } from "react";
import { URL } from "../constants";

function MainBody() {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);
  const [result, setResult] = useState("");


  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);

  //   // Auto-resize
  //   textareaRef.current.style.height = "auto";
  //   textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  // };

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
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({
          "contents": [
            {
              "parts": [
                {
                  "text": inputValue
                }
              ]
            }
          ]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
     const generatedText = data.candidates[0].content.parts[0].text;
console.log("Generated Text:", generatedText);

setResult(generatedText);

      setInputValue("");
      textareaRef.current.style.height = "auto";
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };


  return (
    <>
      <div className="p-6 h-150 text-center">
        <h1 className="text-3xl sm:text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 bg-clip-text text-transparent font-bold mb-6">
          Ask your questions here!
        </h1>
        <div className="p-4 mt-4 bg-zinc-800 border border-gray-600 rounded-xl  w-full mx-auto text-white shadow-md  overflow-y-scroll">
          {result}
        </div>
      </div>

      <div className="p-2 pr-4 bg-zinc-700 border border-gray-600 rounded-3xl max-w-lg w-full mx-auto flex items-end text-white shadow-md">
        <textarea
          ref={textareaRef}
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={(event => setInputValue(event.target.value))}
          onKeyDown={handleKeyDown}
          rows={1}
          className="w-full max-h-40 overflow-y-auto p-3 text-white bg-transparent outline-none resize-none placeholder-gray-400"
        />
        <button
          onClick={handleSubmit}
          className="ml-2 px-4 py-2  font-semibold"
        >
          Ask
        </button>
      </div>
    </>
  );
}

export default MainBody;
