import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const FairTransition = () => {
  const mainImageRef = useRef(null);
  const div1 = useRef(null);
  const div2 = useRef(null);
  const div3 = useRef(null);
  const div4 = useRef(null);
  useEffect(() => {
    gsap.to(mainImageRef.current, {
      width: "100vw",
      height: "100vh",
      marginLeft: "2vh",
      duration: 1,
      ease: "power2.out",
    });
    gsap.set(div2.current, {
      width:"100vw",
      height:"140vh",
      duration:1,
      ease: "power2.out",
    });
    gsap.set(div1.current, {
      display:"none"
    });
    gsap.to(div3.current, {
      delay:1,
      scale:0.5,
      x:"20vw",
      y:"-10vh"
    });
  }, []);

  return (
    <div className="w-full h-screen bg-zinc-900 flex overflow-hidden">
      <div className="" ref={div3}>
        
        <div
          className="w-full h-screen justify-start items-start  flex"
          ref={div2}
        >
          <div
            ref={mainImageRef}
            className="w-[73vw] h-[62vh]  flex items-center justify-center bg-[#0F1729] text-6xl font-bold rounded-2xl overflow-hidden ml-[2vh] translate-y-[18px]"
          >
            <img
              src="/work1/faircampus.png"
              alt=""
              className="shrink-0 rounded-2xl"
            />
          </div>
          <div className="flex flex-col justify-between items-center mt-7 gap-7 ml-5 translate-y-[18px]"ref={div1}>
            {["/comming/c1.jpg", "/comming/c2.jpg"].map((src, i) => (
              <div
              
                key={i}
                className="w-[23vw] h-[29vh] ml-[0.5vw] rounded-2xl overflow-hidden"
              >
                <img src={src} alt="" className="shrink-0 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="mt-4 grid grid-cols-4 gap-4 w-full px-5 -translate-y-[35vh] "
      >
        {[
          "/comming/c3.jpg",
          "/comming/c4.jpg",
          "/comming/c5.jpg",
          "/comming/c6.jpg",
        ].map((src, i) => (
          <div key={i} className="flex rounded-2xl overflow-hidden">
            <img src={src} alt="" className="shrink-0 rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FairTransition;
