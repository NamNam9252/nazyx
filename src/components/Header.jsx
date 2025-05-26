import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const characters =
  "*#x@!$%&?+=-~^|/\\:;,.<>[]{}()ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const shuffle = (text, onUpdate) => {
  const duration = 0.5;
  const frameRate = 20;
  const steps = Math.floor(duration * frameRate);
  const original = text.split("");
  let frame = 0;

  const interval = setInterval(() => {
    const progress = frame / steps;
    const newText = original
      .map((char) =>
        Math.random() > progress
          ? characters[Math.floor(Math.random() * characters.length)]
          : char
      )
      .join("");

    onUpdate(newText);
    frame++;

    if (frame > steps) {
      clearInterval(interval);
      onUpdate(text); // Final text
    }
  }, 1000 / frameRate);
};

const ShuffleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);

  const handleMouseEnter = () => {
    shuffle(text, setDisplayText);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="cursor-pointer transition-all duration-300 ease-in-out "
    >
      {displayText}
    </div>
  );
};

const Header = () => {
  const loaction = useLocation();
  return (
    <div className="flex justify-between w-screen  mt-5 px-10 rounded-full ">
      <Link
      
        to=""
        className="flex backdrop-blur-xs bg-zinc-100/50 rounded-full px-2 py-2 hover:bg-zinc-800/50 hover:text-white transition-all duration-400 delay-30 ease-in-out"
      >
        <div>
          <img src="/logo.png" className="h-[6vh] rounded-full" />
        </div>
        <div>
          <div className=" text-4xl mt-1 ml-1 font-serif  ">
            <ShuffleText key={0} text={"NAZXY"} />
          </div>
        </div>
      </Link>

      <motion.button
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 1000 }}
      >
        <div className=" flex gap-20 uppercase text-2xl font-light mt-1.5 backdrop-blur-xs bg-zinc-100/50 hover:bg-zinc-800/50 hover:text-white transition-all duration-400 delay-30 ease-in-out rounded-full px-2 py-1">
          {[
            { name: "HOME", link: "" },
            { name: "work", link: "works" },
            { name: "about", link: "about" },
          ].map((items, idx) => {
            return (
              <Link
              
                to={items.link}
                key={idx}
                className="group relative overflow-hidden h-8"
              >
                <div className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-8 uppercase">
                  <span>{items.name}</span>
                  <span>{items.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.button>
      <div>
        {/* <div className="flex gap-20 uppercase text-2xl font-light mt-2.5 backdrop-blur-xs bg-zinc-100/50 hover:bg-zinc-800/50 hover:text-white transition-all duration-400 delay-50 ease-in-out rounded-full px-5 py-2">
          <ShuffleText key={0} text={"connect."} />
        </div> */}
        <Link to="/connect" >
          <div className="flex gap-20 uppercase text-2xl font-light mt-2.5 backdrop-blur-xs bg-zinc-100/50 hover:bg-zinc-800/50 hover:text-white transition-all duration-400 delay-50 ease-in-out rounded-full px-5 py-2">
            <ShuffleText key={0} text={"connect."} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
