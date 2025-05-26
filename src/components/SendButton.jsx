// Temp.jsx
import React from "react";
import { FaPaperPlane, FaCheck } from "react-icons/fa"; // For demo icons
import { FaGithub } from "react-icons/fa";

export default function SendButton({ label , icon }) {
  // Split label into animated characters
  const chars = label.split("");

  return (
    <button className="btn-5">
      {/* Outline ring (animated border) */}
      <div className="outline"></div>

      {/* Default state: initial content */}
      <div className="state state--default">
        <div className="icon">
          {icon}
        </div>
        <p>
          {chars.map((char, i) => (
            <span key={i} style={{ "--i": i }} className="letter">
              {char}
            </span>
          ))}
        </p>
      </div>

      {/* Sent state: visible on focus (you can toggle this via state if needed) */}
      <div className="state state--sent">
        <div className="icon">
          <FaCheck />
        </div>
        <p>
          {"Sent!".split("").map((char, i) => (
            <span key={i} style={{ "--i": i }}>
              {char}
            </span>
          ))}
        </p>
      </div>
    </button>
  );
}
