import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

const roles = [
  "Video<span id='Stroke'>Editor</span>",
  "Web<span id='Stroke'>Designer</span>",
  "MERN<span id='Stroke'>Developer</span>",
  "Game<span id='Stroke'>Developer</span>",
  "AI/ML<span id='Stroke'>Engineer</span>",
  "<span id='Stroke'>Ethical</span>Hacking",
];

export default function Marquee() {
  const baseX = useRef(0);
  const containerRef = useRef(null);
  const motionRef = useRef(null);

  useAnimationFrame((t, delta) => {
    if (!motionRef.current || !containerRef.current) return;

    baseX.current -= 0.2 * delta; // speed
    const totalWidth = motionRef.current.scrollWidth / 2;

    if (Math.abs(baseX.current) >= totalWidth) {
      baseX.current = 0;
    }

    motionRef.current.style.transform = `translateX(${baseX.current}px)`;
  });

  const renderItems = () =>
    [...roles, ...roles].map((role, i) => (
      <div
        id="marquee"
        key={i}
        className="text-2xl sm:text-[250px]  mx-8 text-white"
        dangerouslySetInnerHTML={{ __html: role }}
      />
    ));

  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-4 bg-transparent">
      <div ref={containerRef} className="inline-block w-full">
        <div
          ref={motionRef}
          className="flex gap-16 will-change-transform"
          style={{ whiteSpace: "nowrap" }}
        >
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
