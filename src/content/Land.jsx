import Marquee from '../components/Marquee';
import { useRevealer } from '../transition/useRevealer';
import Home  from '../pages/Home'
import React, { useEffect, useState } from 'react'

const Land = () => {
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
        <Home/>
      ) : (
        <>
        </>
      )}
    </div>
  );
};
export default Land