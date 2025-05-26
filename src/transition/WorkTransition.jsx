// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";

// const Temp = () => {
//   const mainImageRef = useRef(null);
//   const sideImageRefs = useRef([]);
//   const bottomImageRefs = useRef([]);
//   const div1Refs = useRef(null);
//   const div2Refs = useRef(null);

//   useEffect(() => {
//     const tl = gsap.timeline({ delay: 0 });

//     tl.to(mainImageRef.current, {
//       width: "72vw",
//       height: "95vh",
//       marginLeft: "2vh",
//       duration: 1,
//       y: 18,
//       ease: "power2.out",
//     })
//       .to(div1Refs.current, {
//         display: "flex",
//         delay: 1,
//       })
//       .from(sideImageRefs.current, {
//         opacity: 0,
//         y: 30,
//         stagger: 0.2,
//         duration: 0.8,
//         ease: "power2.out",
//       })
//       .to(mainImageRef.current, {
//         width: "65vw",
//         height: "62vh",
//         marginLeft: "2vh",
//         duration: 1,
//         y: 18,
//         ease: "power2.out",
//       })
//       .to(sideImageRefs.current, {
//         height: "29vh",
//         width: "25vw",
//         duration: 0.8,
//         ease: "power2.out",
//       })
//       .to(div2Refs.current, {
//         marginLeft: "5vh",
//       })
//       .from(bottomImageRefs.current, {
//         opacity: 0,
//         y: 30,
//         stagger: 0.2,
//         duration: 0.8,
//         ease: "power2.out",
//       })
//       .to(bottomImageRefs.current, {
//         y: "-35vh",
//         duration: 0.6,
//         ease: "power2.out",
//       });
//   }, []);

//   const setRef = (el, index, type) => {
//     if (type === "side") sideImageRefs.current[index] = el;
//     else bottomImageRefs.current[index] = el;
//   };

//   return (
//     <div className="w-full h-screen bg-white box-border">
//       <div className="h-screen w-full">
//         <div className="w-full h-screen justify-start items-start" ref={div1Refs}>
//           <div
//             ref={mainImageRef}
//             className="w-[100vw] h-screen bg-orange-400 z-[100] items-center justify-center text-white text-6xl font-bold transition-all duration-1000 rounded-2xl overflow-hidden"
//           >
//             GENIE
//           </div>
//           <div className="flex flex-col justify-between items-center mt-7 gap-7 ml-5" ref={div2Refs}>
//             {["#ccc", "#f33"].map((color, i) => (
//               <div
//                 key={i}
//                 ref={(el) => setRef(el, i, "side")}
//                 className="aspect-video rounded-2xl"
//                 style={{ backgroundColor: color }}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="mt-4 grid grid-cols-4 gap-4 w-full">
//         {["#ddd", "#aaa", "#63f", "#222"].map((color, i) => (
//           <div
//             key={i}
//             ref={(el) => setRef(el, i, "bottom")}
//             className="aspect-video rounded-2xl"
//             style={{ backgroundColor: color }}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Temp;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";

const WorkTransition = () => {
  const loaction = useLocation();
  const mainImageRef = useRef(null);
  const sideImageRefs = useRef([]);
  const bottomImageRefs = useRef([]);
  const div1Refs = useRef(null);
  const div2Refs = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });

    tl.to(mainImageRef.current, {
      width: "72vw",
      height: "95vh",
      marginLeft: "2vh",
      duration: 1,
      y: 18,
      ease: "power2.out",
    })
      .to(div1Refs.current, {
        display: "flex",
        delay: 1.2,
      })
      .from(sideImageRefs.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(mainImageRef.current, {
        width: "73vw",
        height: "62vh",
        marginLeft: "2vh",
        duration: 1,
        y: 18,
        ease: "power2.out",
      })
      .to(sideImageRefs.current, {
        height: "29vh",
        width: "23vw",
        duration: 0.8,
        ease: "power2.out",
      })
      .to(bottomImageRefs.current, {
        y: "-35vh",
        duration: 0.8,
        ease: "power2.out",
      });
  }, []);

  const setRef = (el, index, type) => {
    if (type === "side") sideImageRefs.current[index] = el;
    else bottomImageRefs.current[index] = el;
  };

  return (
    <div className="w-full h-screen bg-zinc-900 box-border overflow-hidden">
      <div className="h-screen w-full">
        <div
          className=" w-full h-screen justify-start items-start "
          ref={div1Refs}
        >
          <div
            ref={mainImageRef}
            className=" w-[100vw] h-screen z-[100] flex justify-between text-transparent hover:text-black items-center bg-[#0F1729] text-6xl font-bold  hover:backdrop-blur-2xl transition-all duration-1000 rounded-2xl overflow-hidden"
          >
            <Link to="/works/faircampus">
            <img
              src="/work1/faircampus.png"
              alt=""
              className="shrink-0 hover:scale-120 z-10 transition-all duration-400 delay-30 ease-in-out"
            />
            {/* want this text in middel */}
            <div className="hover:bg-white">
              <h1 className="  text-6xl font-bold z-20 top-50 left-70 absolute ">
              FAIRCAMPUS
            </h1>
            </div>
            </Link>
          </div>
          <div
            className="flex flex-col justify-between  items-center mt-7 gap-7 ml-5"
            ref={div2Refs}
          >
            {["/comming/c1.jpg", "/comming/c2.jpg"].map((color, i) => (
              <div
                key={i}
                ref={(el) => setRef(el, i, "side")}
                className="w-[25vw] h-[45vh] ml-[0.5vw]  rounded-2xl "
              >
                <img src={color} alt=""  className="shrink-0 hover:scale-120 rounded-2xl hover:blur-2xl transition-all duration-400 delay-30 ease-in-out"/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4 w-full px-5">
        {["/comming/c3.jpg", "/comming/c4.jpg","/comming/c5.jpg", "/comming/c6.jpg"].map((color, i) => (
          <div
            key={i}
            ref={(el) => setRef(el, i, "bottom")}
            className=" flex  rounded-2xl "
          >
            <img src={color} alt=""  className="shrink-0 hover:scale-120 hover:blur-2xl rounded-2xl transition-all duration-400 delay-30 ease-in-out"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkTransition;
