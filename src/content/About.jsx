// import React, { useEffect, useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import LocomotiveScroll from "locomotive-scroll";
// import "locomotive-scroll/dist/locomotive-scroll.css";
// import { gsap } from "gsap";
// import SendButton from '../components/SendButton'
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//     BoxGeometry,
//   SphereGeometry,
//   ConeGeometry,
//   CylinderGeometry,
//   DodecahedronGeometry,
//   TorusGeometry,
//   TorusKnotGeometry,
//   TetrahedronGeometry,
//   OctahedronGeometry,
//   IcosahedronGeometry,
//   RingGeometry,
//   PlaneGeometry
// } from "three";
// import { FaGithub, FaLinkedin } from "react-icons/fa";


// const geometryTypes = [
//   "BoxGeometry",
//   "SphereGeometry",
//   "ConeGeometry",
//   "CylinderGeometry",
//   "TorusGeometry",
//   "TorusKnotGeometry",
//   "DodecahedronGeometry",
//   "IcosahedronGeometry",
//   "OctahedronGeometry",
//   "TetrahedronGeometry"
// ];
// const getGeometry = (type) => {
//   switch (type) {
//     case "BoxGeometry":
//       return new THREE.BoxGeometry(1.5, 1.5, 1.5);
//     case "SphereGeometry":
//       return new THREE.SphereGeometry(1.2, 32, 32);
//     case "ConeGeometry":
//       return new THREE.ConeGeometry(1.2, 2, 32);
//     case "CylinderGeometry":
//       return new THREE.CylinderGeometry(1.2, 1.2, 2, 32);
//     case "TorusGeometry":
//       return new THREE.TorusGeometry(1.2, 0.4, 16, 100);
//     case "TorusKnotGeometry":
//       return new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
//     case "DodecahedronGeometry":
//       return new THREE.DodecahedronGeometry(1.5);
//     case "IcosahedronGeometry":
//       return new THREE.IcosahedronGeometry(1.5);
//     case "OctahedronGeometry":
//       return new THREE.OctahedronGeometry(1.5);
//     case "TetrahedronGeometry":
//       return new THREE.TetrahedronGeometry(1.5);
//     default:
//       return new THREE.IcosahedronGeometry(1.5);
//   }
// };

// gsap.registerPlugin(ScrollTrigger);

// // Animated Heading
// const AnimatedHeading = ({ text, scroller }) => {
//   const ref = useRef(null);

//   useEffect(() => {
//     if (!ref.current || !scroller) return;

//     const chars = ref.current.querySelectorAll(".char");
//     gsap.from(chars, {
//       y: 50,
//       opacity: 0,
//       stagger: 0.05,
//       ease: "back.out(1.7)",
//       scrollTrigger: {
//         trigger: ref.current,
//         scroller,
//         start: "top 80%",
//         end: "bottom 60%",
//         toggleActions: "play none none reset",
//       },
//     });
//   }, [scroller]);

//   return (
//     <h2
//       ref={ref}
//       className="text-5xl md:text-6xl font-bold text-gray-200 overflow-hidden flex flex-wrap justify-center"
//     >
//       {text.split("").map((ch, i) => (
//         <span key={i} className="char inline-block mx-0.5">
//           {ch}
//         </span>
//       ))}
//     </h2>
//   );
// };

// const AnimatedParagraph = ({ text }) => (
//   <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto text-center md:text-left">
//     {text.split(" ").map((word, i) => (
//       <span
//         key={i}
//         className="inline-block mr-2"
//         data-scroll
//         data-scroll-speed={(Math.random() * 2 - 1).toFixed(2)}
//       >
//         {word}
//       </span>
//     ))}
//   </p>
// );

// const InteractiveWireframe = ({ geometry: Geometry, position ,Value:value }) => {
//   const meshRef = useRef();
//   const [hovered, setHovered] = useState(false);

//   useFrame(({ mouse }) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += (mouse.y - meshRef.current.rotation.x) * 0.05;
//       meshRef.current.rotation.y += (mouse.x - meshRef.current.rotation.y) * 0.05;
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       position={position}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//       scale={hovered ? 1.7 : 1.5}
//       castShadow
//     >
//       <bufferGeometry attach="geometry" {...new Geometry(value[0],value[1],value[2],value[3])} />
//       <meshStandardMaterial
//         color="#4FD1C5"
//         wireframe
//         emissive="#4FD1C5"
//         emissiveIntensity={0.05}
//       />
//     </mesh>
//   );
// };

// const Section = ({ title, content, Geometry, scroller ,value }) => (
//   <section
//     className="min-h-screen flex flex-col md:flex-row items-center px-6 md:px-20 py-32 gap-12"
//     data-scroll-section
//   >
//     <div className="md:w-1/2 space-y-8">
//       <AnimatedHeading text={title} scroller={scroller} />
//       <AnimatedParagraph text={content} />
//       <hr className="border-gray-700 my-4" />
//     </div>
//     <div className="md:w-1/2 h-96 w-full backdrop-blur-3xl">
//       <Canvas shadows camera={{ position: [5, 5, 5], fov: 40 }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
//         <InteractiveWireframe geometry={Geometry} position={[0, 0, 0]} Value ={value}/>
//         <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
//       </Canvas>
//     </div>
//   </section>
// );

// const About = () => {
//   const containerRef = useRef(null);
//   const [scroller, setScroller] = useState(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const scrollEl = containerRef.current;
//     const scroll = new LocomotiveScroll({
//       el: scrollEl,
//       smooth: true,
//       lerp: 0.05,
//     });

//     setScroller(scrollEl);

//     ScrollTrigger.scrollerProxy(scrollEl, {
//       scrollTop(value) {
//         return arguments.length
//           ? scroll.scrollTo(value, 0, 0)
//           : scroll.scroll.instance.scroll.y;
//       },
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         };
//       },
//       pinType: scrollEl.style.transform ? "transform" : "fixed",
//     });

//     ScrollTrigger.addEventListener("refresh", () => scroll.update());
//     ScrollTrigger.refresh();

//     return () => {
//       scroll.destroy();
//       ScrollTrigger.removeEventListener("refresh", () => scroll.update());
//     };
//   }, []);

//   return (
//     <main
//       ref={containerRef}
//       data-scroll-container
//       className="bg-zinc-900 text-gray-200 relative overflow-hidden"
//     >
      
//       <div className="h-40" />
      

//       {/* Hero */}
//       <section
//         className="min-h-screen flex flex-col justify-center items-center px-6 md:px-24 py-32 space-y-6 text-center z-10 relative"
//         data-scroll-section
//       >
//         <div className="z-999" data-scroll data-scroll-speed="1">
//           <Canvas shadows camera={{ position: [3, 3, 3], fov: 100 }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
//         <InteractiveWireframe geometry={TetrahedronGeometry} position={[0, 0, 0]} Value ={[2,1,2,0]}/>
//         <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
//       </Canvas>
//         </div>
//         <AnimatedHeading text="Hey, I'm Nazyx" scroller={scroller} />
//         <AnimatedParagraph text="An Indian digital artist & developer from India currently pursuing B.Tech in AI/ML. I create immersive digital experiences that blur art & technology." />
//         <AnimatedParagraph text="With expertise in video editing, web design, MERN development, 3D modeling, game dev, and ML, I blend cross-disciplinary skills to build impactful creations." />
//       </section>

//       <Section
//         title="Degree & Curiosity"
//         content="Currently pursuing B.Tech in AI/ML in India. Deeply curious about AI, ethical hacking, and generative art—always exploring new tech frontiers."
//         Geometry={TorusKnotGeometry}
//         value={[1, 0.3, 100, 16]}
//         scroller={scroller}
//       />

//       <Section
//         title="Passion Projects"
//         content="From MERN apps to 3D wireframes and immersive games, I take concepts from idea to execution, focusing on clean code and standout visuals."
//         Geometry={TorusGeometry}
//         value={[1.2, 0.4, 16, 100]}
//         scroller={scroller}
//       />

//       <Section
//         title="Creative Vision"
//         content="I thrive at the intersection of creativity and code—designing sleek UIs, experimenting with shaders, and pushing boundaries in interactive storytelling."
//         Geometry={SphereGeometry}
//         value={[1.2, 32, 32,0]}
//         scroller={scroller}
//       />

//       {/* Contact Section */}
//       <section
//         className="py-20 flex flex-col items-center space-y-6"
//         data-scroll-section
//       >
//         <AnimatedHeading text="Let's Collaborate" scroller={scroller} />


//         <div className="flex gap-6">
//           <div className="mt-10 mr-40" onClick={()=>{
//           setTimeout(() => {
//            window.open("https://github.com/NamNam9252","_blank");
//           }, 1000);
//         }}>
//           <SendButton label={"GitHub"} icon={<FaGithub/>} />
//         </div>
//         <div className="mt-10 mr-40" onClick={()=>{
//           setTimeout(() => {
//            window.open("https://www.linkedin.com/in/naman-goyal-ba12b1333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app","_blank");
//           }, 1000);
//         }}>
//           <SendButton label={"LinkedIn"} icon={<FaLinkedin/>} />
//         </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default About;


















import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { gsap } from "gsap";
import SendButton from '../components/SendButton'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  TetrahedronGeometry,
  OctahedronGeometry,
  IcosahedronGeometry,
  RingGeometry,
  PlaneGeometry
} from "three";
import { FaGithub, FaLinkedin } from "react-icons/fa";


const geometryTypes = [
  "BoxGeometry",
  "SphereGeometry",
  "ConeGeometry",
  "CylinderGeometry",
  "TorusGeometry",
  "TorusKnotGeometry",
  "DodecahedronGeometry",
  "IcosahedronGeometry",
  "OctahedronGeometry",
  "TetrahedronGeometry"
];
const getGeometry = (type) => {
  switch (type) {
    case "BoxGeometry":
      return new THREE.BoxGeometry(1.5, 1.5, 1.5);
    case "SphereGeometry":
      return new THREE.SphereGeometry(1.2, 32, 32);
    case "ConeGeometry":
      return new THREE.ConeGeometry(1.2, 2, 32);
    case "CylinderGeometry":
      return new THREE.CylinderGeometry(1.2, 1.2, 2, 32);
    case "TorusGeometry":
      return new THREE.TorusGeometry(1.2, 0.4, 16, 100);
    case "TorusKnotGeometry":
      return new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    case "DodecahedronGeometry":
      return new THREE.DodecahedronGeometry(1.5);
    case "IcosahedronGeometry":
      return new THREE.IcosahedronGeometry(1.5);
    case "OctahedronGeometry":
      return new THREE.OctahedronGeometry(1.5);
    case "TetrahedronGeometry":
      return new THREE.TetrahedronGeometry(1.5);
    default:
      return new THREE.IcosahedronGeometry(1.5);
  }
};

gsap.registerPlugin(ScrollTrigger);

// Animated Heading
const AnimatedHeading = ({ text, scroller }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !scroller) return;

    const chars = ref.current.querySelectorAll(".char");
    gsap.from(chars, {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ref.current,
        scroller,
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reset",
      },
    });
  }, [scroller]);

  return (
    <h2
      ref={ref}
      className="text-5xl md:text-6xl font-bold text-gray-200 overflow-hidden flex flex-wrap justify-center"
    >
      {text.split("").map((ch, i) => (
        <span key={i} className="char inline-block mx-0.5">
          {ch}
        </span>
      ))}
    </h2>
  );
};

const AnimatedParagraph = ({ text }) => (
  <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto text-center md:text-left">
    {text.split(" ").map((word, i) => (
      <span
        key={i}
        className="inline-block mr-2"
        data-scroll
        data-scroll-speed={(Math.random() * 2 - 1).toFixed(2)}
      >
        {word}
      </span>
    ))}
  </p>
);

const InteractiveWireframe = ({ geometry: Geometry, position ,Value:value }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += (mouse.y - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (mouse.x - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.7 : 1.5}
      castShadow
    >
      <bufferGeometry attach="geometry" {...new Geometry(value[0],value[1],value[2],value[3])} />
      <meshStandardMaterial
        color="#4FD1C5"
        wireframe
        emissive="#4FD1C5"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
};

const Section = ({ title, content, Geometry, scroller ,value }) => (
  <section
    className="min-h-screen flex flex-col md:flex-row items-center px-6 md:px-20 py-32 gap-12"
    data-scroll-section
  >
    <div className="md:w-1/2 space-y-8">
      <AnimatedHeading text={title} scroller={scroller} />
      <AnimatedParagraph text={content} />
      <hr className="border-gray-700 my-4" />
    </div>
    <div className="md:w-1/2 h-96 w-full backdrop-blur-3xl">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <InteractiveWireframe geometry={Geometry} position={[0, 0, 0]} Value ={value}/>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  </section>
);

const About = () => {
  const containerRef = useRef(null);
  const [scroller, setScroller] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollEl = containerRef.current;
    const scroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      lerp: 0.05,
    });

    setScroller(scrollEl);

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();

    return () => {
      scroll.destroy();
      ScrollTrigger.removeEventListener("refresh", () => scroll.update());
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main
      ref={containerRef}
      data-scroll-container
      className="bg-zinc-900 text-gray-200 relative overflow-hidden"
    >
      
      <div className="h-40" />
      

      {/* Hero */}
      <section
        className="min-h-screen flex flex-col justify-center items-center px-6 md:px-24 py-32 space-y-6 text-center z-10 relative"
        data-scroll-section
      >
        <div className="z-999" data-scroll data-scroll-speed="1">
          <Canvas shadows camera={{ position: [3, 3, 3], fov: 100 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <InteractiveWireframe geometry={TetrahedronGeometry} position={[0, 0, 0]} Value ={[2,1,2,0]}/>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
        </div>
        <AnimatedHeading text="Hey, I'm Nazyx" scroller={scroller} />
        <AnimatedParagraph text="An Indian digital artist & developer from India currently pursuing B.Tech in AI/ML. I create immersive digital experiences that blur art & technology." />
        <AnimatedParagraph text="With expertise in video editing, web design, MERN development, 3D modeling, game dev, and ML, I blend cross-disciplinary skills to build impactful creations." />
      </section>

      <Section
        title="Degree & Curiosity"
        content="Currently pursuing B.Tech in AI/ML in India. Deeply curious about AI, ethical hacking, and generative art—always exploring new tech frontiers."
        Geometry={TorusKnotGeometry}
        value={[1, 0.3, 100, 16]}
        scroller={scroller}
      />

      <Section
        title="Passion Projects"
        content="From MERN apps to 3D wireframes and immersive games, I take concepts from idea to execution, focusing on clean code and standout visuals."
        Geometry={TorusGeometry}
        value={[1.2, 0.4, 16, 100]}
        scroller={scroller}
      />

      <Section
        title="Creative Vision"
        content="I thrive at the intersection of creativity and code—designing sleek UIs, experimenting with shaders, and pushing boundaries in interactive storytelling."
        Geometry={SphereGeometry}
        value={[1.2, 32, 32,0]}
        scroller={scroller}
      />

      {/* Contact Section */}
      <section
        className="py-20 flex flex-col items-center space-y-6"
        data-scroll-section
      >
        <AnimatedHeading text="Let's Collaborate" scroller={scroller} />


        <div className="flex gap-6">
          <div className="mt-10 mr-40" onClick={()=>{
          setTimeout(() => {
           window.open("https://github.com/NamNam9252","_blank");
          }, 1000);
        }}>
          <SendButton label={"GitHub"} icon={<FaGithub/>} />
        </div>
        <div className="mt-10 mr-40" onClick={()=>{
          setTimeout(() => {
           window.open("https://www.linkedin.com/in/naman-goyal-ba12b1333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app","_blank");
          }, 1000);
        }}>
          <SendButton label={"LinkedIn"} icon={<FaLinkedin/>} />
        </div>
        </div>
      </section>
    </main>
  );
};

export default About;
