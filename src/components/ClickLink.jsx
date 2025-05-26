// src/components/ClickLink.jsx
import { useNavigate } from "react-router-dom";
import { useClick } from "../context/ClickContext";

const ClickLink = ({ to, children }) => {
  const { setClickPos } = useClick();
  const navigate = useNavigate();

  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    setClickPos({ x, y });

    // Delay navigation slightly to allow transition to begin
    setTimeout(() => {
      navigate(to);
    }, 50); // Small delay to avoid race condition
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export default ClickLink;
