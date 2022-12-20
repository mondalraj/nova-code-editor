import React, { useState } from "react";

const CodeEditor = ({ socketRef }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <textarea
        id="realtimeEditor"
        style={{ width: "90%", height: "300px", margin: "10px" }}
        value={text}
        onChange={(e) => {
          socketRef.current.emit("change", e.target.value);
          console.log("change", e.target.value);
          setText(e.target.value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
