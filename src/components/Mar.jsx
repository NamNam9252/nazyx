import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

const roles = [
  "PROJECT<span id='Stroke'>NEXT</span>",
  "NEXT<span id='Stroke'>PROJECT</span>",
  "NEXT<span id='Stroke'>NEXT</span>"
];

export default function Mar(data) {
  const baseX = useRef(0);
  const containerRef = useRef(null);
  const motionRef = useRef(null);
  console.log(data.data)

  useAnimationFrame((t, delta) => {
    if (!motionRef.current || !containerRef.current) return;

    baseX.current -= (data.data) * delta; // speed
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
        className="text-9xl sm:text-[250px]  mx-8 text-white"
        dangerouslySetInnerHTML={{ __html: role }}
      />
    ));

  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-5 bg-transparent">
      <div ref={containerRef} className="inline-block w-full">
        <div
          ref={motionRef}
          className="flex gap-15 will-change-transform"
          style={{ whiteSpace: "nowrap" }}
        >
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
