import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClick } from "../context/ClickContext";

const getRandomRadius = () => {
  const r = () => Math.floor(Math.random() * 50) + 50; // 50% - 100%
  return `${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`;
};

const PageTransition = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const location = useLocation();
  const { clickPos } = useClick();
  const [borderRadius, setBorderRadius] = useState("50%");

  useEffect(() => {
    setIsAnimating(true);
    setBorderRadius(getRandomRadius()); // new shape per transition

    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {isAnimating && (
        <motion.div
          initial={{
            scale: 0,
            x: clickPos.x,
            y: clickPos.y,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: borderRadius,
          }}
          animate={{
            scale: 8,
            borderRadius: "0%",
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="fixed top-0 left-0 w-[30vw] h-[30vw] z-[9999]   pointer-events-none"
        />
      )}
    </>
  );
};

export default PageTransition;
