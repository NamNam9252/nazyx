import React, { useEffect, useRef, useState } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../components/Marquee";
import { useRevealer } from "../transition/useRevealer";

const Home = () => {
  const mainRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
      el: mainRef.current,
      smooth: true,
      lerp: 0.03,
      multiplier: 1,
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    // ScrollTrigger proxy
    ScrollTrigger.scrollerProxy(mainRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: mainRef.current.style.transform ? "transform" : "fixed",
    });

    // Canvas setup
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const frameCount = 300;
    const images = [];
    const imageSeq = { frame: 0 };
    let imagesLoaded = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Function to generate path to image files in public/img
    const getFilePath = (index) =>
      `/img/male${String(index + 1).padStart(4, "0")}.png`;

    // Render a given frame
    const render = () => {
      const img = images[imageSeq.frame];
      if (!img || !img.width) return;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const x = (canvas.width - img.width * ratio) / 2;
      const y = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        x,
        y,
        img.width * ratio,
        img.height * ratio
      );
    };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFilePath(i);
      img.onload = () => {
        imagesLoaded += 1;
        // initial render when first image loads
        if (imagesLoaded === 1) render();
      };
      img.onerror = () =>
        console.error(`Failed to load image: ${getFilePath(i)}`);
      images.push(img);
    }

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      render();
      locoScroll.update();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // Animate image sequence on scroll
    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scroller: mainRef.current,
        trigger: canvas,
        start: "top top",
        end: "bottom+=500% top",
        scrub: true,
        onUpdate: render,
      },
    });

    // Pin canvas
    // ScrollTrigger.create({
    //   scroller: mainRef.current,
    //   trigger: canvas,
    //   start: "top top",
    //   end: "bottom+=500% top",
    //   pin: true,
    //   pinSpacing: false,
    // });

    ScrollTrigger.addEventListener("refreshInit", () => locoScroll.update());
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", handleResize);
      locoScroll.destroy();
      ScrollTrigger.killAll();
    };
  }, []);
  return (
    <div id="main" data-scroll-container ref={mainRef} className="font-gilroy">
      <div id="page" className="h-screen w-screen bg-zinc-900 relative ">
        <div className="items-center justify-between py-[15%]">
          <Marquee />
        </div>
        <canvas
          ref={canvasRef}
          className="absolute z-10 w-full h-full bottom-0  "
        />
      </div>
      <div
      id="page1"
        className="h-screen w-screen flex flex-col px-[10vh]  justify-center items-start bg-zinc-100/50 relative rounded-t-full rounded-bl-full backdrop-blur-sm"
        data-scroll-section
      >
        <div
          className="text-black mt-30  backdrop-blur-4xl"
          data-scroll
          data-scroll-speed="1"
        >
          <h1 className="text-[8vh] uppercase " id="hi">
            HI, I'M NAZYX
          </h1>
        </div>
        <div
          className="text-black mt-10 font-mono text-2xl backdrop-blur-4xl w-[60vh]"
          data-scroll
          data-scroll-speed="3"
        >
          <h1>
            I’m a creative technologist who seamlessly blends esign and
            development to craft immersive, intuitive, and future-ready digital
            experiences that engage and inspire.
          </h1>
        </div>
        <div
          className="ml-[60vw] text-black mt-10 font-mono text-2xl backdrop-blur-4xl"
          data-scroll
          data-scroll-speed="5"
          data-scroll-direction="horizontal"
        >
          <h1>
            I merge creativity and technology to engineer immersive digital
            worlds—where design speaks, code listens, and innovation thrives.
          </h1>
        </div>
      </div>
      <div
      id="page2"
        className="h-screen w-screen flex flex-col py-[20vh] justify-between items-start bg-zinc-100/50 relative rounded-br-full rounded-tl-full backdrop-blur-sm"
        data-scroll-section
      >
        <div className="ml-[65vw] font-mono" data-scroll data-scroll-speed="5">
          <h1 className="text-4xl uppercase">
            <b>
              Building fast interfaces and interactive games with React and
              real-time logic.
            </b>
          </h1>
        </div>
        <div
          className="mb-[5vh] ml-[17vh] w-[50vh] font-mono"
          data-scroll
          data-scroll-speed="5"
        >
          <h1 className="text-4xl uppercase">
            <b>
              Merging ethical hacking with AI to create smart, secure digital
              solutions.
            </b>
          </h1>
        </div>
      </div>
      <div
        id="page3"
        className="h-screen w-screen flex   py-[40vh] justify-between items-start bg-zinc-100/50 relative rounded-tr-full rounded-b-full backdrop-blur-sm"
        data-scroll-section
      >
        <div className="ml-[5vw] w-[35vw] -z-10" data-scroll data-scroll-speed="3">
          <h1 className="font-mono text-2xl">
            Hey there! I’m a second-year B.Tech CSE (AI/ML) student based in
            India. I’m actively seeking internships and open to work — flexible,
            curious, and always excited to learn something new. Feel free to
            reach out if you have an opportunity or just want to connect!
          </h1>
        </div>
        <div className="mr-[2vw] w-[40vw] mt-[10vh] uppercase">
          <b className="font-mono text-5xl">Dive into my work and discover what I do.</b>
        </div>
      </div>
    </div>
  );
};

export default Home;
