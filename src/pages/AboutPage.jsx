import React, { useState, useEffect } from 'react';
import Marquee from '../components/Marquee';
import { useRevealer } from '../transition/useRevealer';
import About from '../content/About';

const AboutPage = () => {
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
        <About/>
      ) : (
        <>
        </>
      )}
    </div>
  );
};

export default AboutPage