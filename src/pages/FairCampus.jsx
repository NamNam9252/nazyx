// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import FairTransition from "../transition/FairTransition";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-cards";
// import { EffectCards, Pagination } from "swiper/modules";
// import Marquee from "../components/Marquee";
// import Mar from "../components/Mar";

// const FairCampus = () => {
//   const [showContent, setShowContent] = useState(false);
//   const div1 = useRef(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowContent(true);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       {showContent ? (
//         <div className="overflow-x-hidden">
//           <div className="w-screen h-screen bg-zinc-900 flex items-center justify-center ">
//             <div className="text-white w-[30vw] font-mono text-2xl">
//               Developed a campus safety and justice web platform addressing
//               issues like gender discrimination, ragging, and unfair internal
//               assessments. Integrated an AI assistant for real-time support and
//               a GPS-based feature that, with user permission, locates the
//               nearest police station to ensure quick assistance and enhanced
//               student safety.
//             </div>
//             <div
//               className="w-[50vw] h-[50vh] scale-100 mt-5 translate-x-[5vw] -translate-y-[10vh]
//                    flex items-center justify-center bg-[#0F1729] rounded-2xl overflow-hidden "
//             >
//               <img
//                 src="/work1/faircampus.png"
//                 alt="Fair Campus"
//                 className="object-cover w-full h-full rounded-2xl"
//               />
//             </div>
//           </div>
//           <div className="bg-zinc-900 h-[100vh] w-[100vw] ">
//             <div className="w-[60vw] mx-auto ">
//               <Swiper
//                 effect={"cards"}
//                 grabCursor={true}
//                 modules={[EffectCards, Pagination]}
//                 pagination={{ clickable: true }}
//                 className="mySwiper rounded-2xl h-[70vh]"
//               >
//                 {[
//                   "/work1/11.png",
//                   "/work1/22.png",
//                   "/work1/33.png",
//                   "/work1/44.png",
//                   "/work1/55.png",
//                 ].map((pic, idx) => (
//                   <SwiperSlide
//                     key={idx}
//                     className="bg-transparent text-white flex justify-center items-center text-xl font-bold"
//                   >
//                     <img
//                       src={pic}
//                       alt={`Slide ${idx + 1}`}
//                       className="w-full h-full object-cover rounded-2xl"
//                     />
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           </div>
//           <div className="relative bg-zinc-900 h-screen w-screen  items-center justify-between overflow-hidden">
//   {/* absolutely position the image with a high z-index */}
//   <img
//     src="/comming/c1.jpg"
//     alt=""
//     className="
//                 hover:scale-120 hover:blur-2xl transition-all duration-400 delay-30 ease-in-out
//       absolute
//       top-1/2 left-1/2
//       scale-500
//       transform -translate-x-1/2 -translate-y-3/2
//       z-10
//       w-[100px] h-[100px]
//       object-cover
//       rounded-lg
//       shadow-lg
//     "
//   />

//   {/* your marquee layers behind the image */}
//   <Mar data={0.3} className="relative z-0" />
//   <Mar data={0.4} className="relative z-0" />
//   <Mar data={0.2} className="relative z-0" />
// </div>

//         </div>
//       ) : (
//         <div>
//           <FairTransition />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FairCampus;

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import FairTransition from "../transition/FairTransition";

// const FairCampus = () => {
//     const div1 = useRef(null)

//     useEffect(() => {
//       gsap.to(div1.current,{
//         delay:1,
//         scale:0.5,
//         x:"20vw",
//       })

//     }, [])

//   return (
//     <div className=" bg-zinc-900 overflow-hidden  ">

//         <div className="overflow-x-hidden"
//         ref={div1}>
//         <FairTransition className=""/>
//         </div>
//         <h1 className="z-999">
//             qfehrehmchjrnhewqfdcrtgtnbhnyunynn
//         </h1>
//     </div>
//   );
// };

// export default FairCampus;

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import FairTransition from "../transition/FairTransition";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Pagination } from "swiper/modules";
import Mar from "../components/Mar";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const FairCampus = () => {
  const [showContent, setShowContent] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showContent) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.04,
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, [showContent]);

  return (
    <div ref={scrollRef} data-scroll-container>
      {showContent ? (
        <div className="overflow-x-hidden">
          {/* Section 1 */}
          <div
            className="w-screen h-screen bg-zinc-900 flex items-center justify-center"
            data-scroll-section
          >
            <div
              className="text-white w-[30vw] font-mono text-2xl"
              data-scroll-section
            >
              <h1 className="text-5xl mb-4 " data-scroll data-scroll-speed="3">
                FAIRCAMPUS
              </h1>
              Developed a campus safety and justice web platform addressing{" "}
              <span data-scroll data-scroll-speed="2">
                issues like gender discrimination, ragging, and unfair internal
              </span>
              assessments. Integrated an AI assistant for real-time support and
              <span data-scroll data-scroll-speed="3">
                a GPS-based feature that, with user permission, locates the
              </span>
              nearest police station to ensure quick assistance and enhanced
              student safety.
            </div>
            <div
              className="w-[50vw] h-[50vh] mt-5 translate-x-[5vw] -translate-y-[10vh] flex items-center justify-center bg-[#0F1729] rounded-2xl overflow-hidden"
              data-scroll
              data-scroll-speed="3"
            >
              <img
                data-scroll
                data-scroll-speed="3"
                src="/work1/faircampus.png"
                alt="Fair Campus"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
            <div className="absolute mt-100 h-10 w-4 rounded-2xl border-2 border-zinc-400 " data-scroll
                data-scroll-speed="1"> 
              <div className=" h-30 w-3.3 rounded-full animate-bounce  ">
                  <div className="bg-zinc-400 h-2 w-2 rounded-full mt-4 ml-0.5 " data-scroll
                data-scroll-speed="1">

                  </div>
              </div>
            </div>
          </div>

          {/* Section 2 - Swiper */}
          <div className="bg-zinc-900 h-[100vh] w-[100vw]" data-scroll-section>
            <div className="w-[60vw] mx-auto">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Pagination]}
                pagination={{ clickable: true }}
                className="mySwiper rounded-2xl h-[70vh]"
              >
                {[
                  "/work1/11.png",
                  "/work1/22.png",
                  "/work1/33.png",
                  "/work1/44.png",
                  "/work1/55.png",
                ].map((pic, idx) => (
                  <SwiperSlide
                    data-scroll
                    data-scroll-speed="7"
                    data-scroll-direction="horizontal"
                    key={idx}
                    className="bg-transparent text-white flex justify-center items-center text-xl font-bold"
                  >
                    <img
                      src={pic}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-full object-cover rounded-2xl hover:scale-120 z-10 active:scale:80 transition-all duration-400 delay-30 ease-in-out"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div>
                <div className=" h-10 w-4 ml-[30vw] rounded-xl border-2 border-zinc-400 rotate-90">
                  <div className=" h-16 w-3 animate-bounce mt-5">
                      <div className="bg-zinc-400 h-2 w-2 rounded-full ml-0.5">

                      </div>
                  </div>
                </div>
            <div className="text-white font-mono  text-3xl items-center ml-[15vw] uppercase">
                <div>
                  <div className="ml-6" data-scroll data-scroll-speed="1">Swipe to explore</div>
                  
                  <div className="flex">
                    <div className="flex"><h1 data-scroll data-scroll-speed="3">
                      a</h1> 
                      <div className="ml-2" data-scroll data-scroll-speed="1">
                        quick tour of -
                      </div>
                       <h1 className="ml-15" data-scroll data-scroll-speed="3">
                        my work awaits</h1></div><h1 data-scroll data-scroll-speed="3" data-scroll-direction="horizontal">!</h1>
                  </div>
                  </div> 
              </div>
              </div>
              
            </div>
          </div>

          {/* Section 3 - Marquee with floating image */}
          <div
            className="relative bg-zinc-900 h-screen w-screen items-center justify-between overflow-hidden"
            data-scroll-section
          >
            <img
              data-scroll
              data-scroll-speed="1"
              src="/comming/c1.jpg"
              alt=""
              className="hover:scale-120 hover:blur-2xl transition-all duration-400 delay-3 ease-in-out
                absolute left-150 top-70
                z-10 w-[25vw] h-[25vh] object-cover rounded-lg shadow-lg"
            />
            <div className="relative z-0" data-scroll data-scroll-speed="3">
              <Mar data={0.3} />
            </div>
            <div className="relative z-0" data-scroll data-scroll-speed="1">
              <Mar data={0.4} />
            </div>
            <div className="relative z-0" data-scroll data-scroll-speed="2">
              <Mar data={0.3} />
            </div>
          </div>
        </div>
      ) : (
        <FairTransition />
      )}
    </div>
  );
};

export default FairCampus;
