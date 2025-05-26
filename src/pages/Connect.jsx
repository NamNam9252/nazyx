import React, { useEffect, useState } from "react";
import Marquee from "../components/Marquee";
import { useRevealer } from "../transition/useRevealer";
import Temp from "../Temp.jsx";

const Connect = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []); 
  useRevealer()
  return (
    <div className="">
        <div id="revealer">
                        <Marquee />
                        <Marquee />
        </div>
      {showContent ? (
        <Temp/>
      ) : (
        <>
        </>
      )}
    </div>
  );
};


export default Connect;
