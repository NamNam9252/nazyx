import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// Interactive background lines component
function InteractiveLines({ mousePos }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize flowing lines
    const LINE_COUNT = 15;
    linesRef.current = Array.from({ length: LINE_COUNT }, (_, i) => ({
      points: Array.from({ length: 80 }, (_, j) => ({
        x: (j / 79) * canvas.width,
        baseY: (i / (LINE_COUNT - 1)) * canvas.height,
        y: (i / (LINE_COUNT - 1)) * canvas.height,
        phase: j * 0.02 + i * 0.3,
      })),
      opacity: 0.1 + (i % 3) * 0.05,
    }));

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      linesRef.current.forEach((line, lineIndex) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${line.opacity})`;
        ctx.lineWidth = 1 + Math.sin(time * 0.001 + lineIndex) * 0.5;
        ctx.beginPath();

        line.points.forEach((point, i) => {
          // Flowing wave animation
          const waveOffset = Math.sin(time * 0.003 + point.phase) * 40;
          const secondaryWave = Math.sin(time * 0.002 + point.phase * 1.5) * 20;

          // Mouse interaction effect
          const mouseDistance = Math.sqrt(
            Math.pow(point.x - mousePos.x, 2) +
              Math.pow(point.baseY - mousePos.y, 2)
          );
          const mouseInfluence = Math.max(0, 150 - mouseDistance);
          const mouseOffset =
            Math.sin(time * 0.008 + mouseDistance * 0.01) *
            mouseInfluence *
            0.2;

          point.y = point.baseY + waveOffset + secondaryWave + mouseOffset;

          if (i === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });

        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
}

// 3D Human Model Component
function RotatingHuman() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const humanRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    const size = Math.min(window.innerWidth * 0.3, 400);
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create a stylized human figure using basic geometries
    const humanGroup = new THREE.Group();

    // Head
    const headGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const headMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    humanGroup.add(head);

    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.5, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.2;
    humanGroup.add(body);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 6);
    const armMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 0.5, 0);
    leftArm.rotation.z = Math.PI / 6;
    humanGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.6, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 6;
    humanGroup.add(rightArm);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 6);
    const legMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -1, 0);
    humanGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -1, 0);
    humanGroup.add(rightLeg);

    // Face features
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 1.6, 0.4);
    humanGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 1.6, 0.4);
    humanGroup.add(rightEye);

    scene.add(humanGroup);
    humanRef.current = humanGroup;

    camera.position.z = 4;
    camera.position.y = 0.5;

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (humanRef.current) {
        humanRef.current.rotation.y += 0.01;
        humanRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const size = Math.min(window.innerWidth * 0.3, 400);
      renderer.setSize(size, size);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="">
      <div
        ref={mountRef}
        className="rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-sm bg-zinc-800/20"
        style={{
          filter: "drop-shadow(0 25px 50px rgba(255, 255, 255, 0.1))",
        }}
      />
    </div>
  );
}

// Interactive Writing Template
function WritingTemplate() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Building digital experiences that matter",
    "Crafting code with purpose and precision",
    "Transforming ideas into reality",
    "Creating solutions that inspire",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scale-115">
      <div className="w-64 xl:w-80 h-48 xl:h-59 bg-zinc-800/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-white/80 text-sm font-mono leading-relaxed">
              <div className="mb-2">
                <span className="text-zinc-500">const</span>
                <span className="text-white"> developer</span>
                <span className="text-zinc-500"> = </span>
              </div>
              <div className="pl-4 space-y-1">
                <div>
                  <span className="text-blue-400">name</span>
                  <span className="text-zinc-500">: </span>
                  <span className="text-green-400">"Naman"</span>
                  <span className="text-zinc-500">,</span>
                </div>
                <div>
                  <span className="text-blue-400">passion</span>
                  <span className="text-zinc-500">: </span>
                  <span className="text-green-400">"Innovation"</span>
                  <span className="text-zinc-500">,</span>
                </div>
                <div>
                  <span className="text-blue-400">focus</span>
                  <span className="text-zinc-500">: </span>
                  <span className="text-green-400">"Excellence"</span>
                </div>
              </div>
              <div className="text-zinc-500">;</div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="text-white text-xs font-medium h-8 flex items-center transition-all duration-500">
              <span className="animate-pulse mr-2">▶</span>
              {texts[currentText]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Temp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formHover, setFormHover] = useState(false);
  const [hoveredField, setHoveredField] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name is required (min 2 characters)";
    }

    if (
      !formData.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.phone || !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select project type";
    }

    if (!formData.budget) {
      newErrors.budget = "Please select budget range";
    }

    if (!formData.timeline) {
      newErrors.timeline = "Please select timeline";
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Please describe your project (min 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(
      `Thanks ${formData.name}! I'll get back to you within 24 hours to discuss your ${formData.projectType} project.`
    );
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    });
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const completionPercentage =
    (Object.keys(formData).filter(
      (key) => formData[key] && formData[key].length > 0
    ).length /
      4) *
    100;

  const inputClass = (fieldName) => `
    w-full p-4 bg-balck/5 border rounded-lg text-white placeholder-zinc-400
    focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40
    transition-all duration-300 backdrop-blur-sm hover:bg-white/10 hover:scale-105
    transform-gpu will-change-transform
    ${hoveredField === fieldName ? "shadow-lg shadow-white/10 bg-white/15" : ""}
    ${
      errors[fieldName]
        ? "border-red-500 ring-1 ring-red-500/50"
        : "border-white/20 hover:border-white/40"
    }
  `;

  return (
    <div
      className=" w-full min-h-screen bg-zinc-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Background Lines */}
      <div>
        <InteractiveLines mousePos={mousePos} />
      </div>
      <div className="flex flex-row-reverse scale-90 items-center justify-center ">
        <div onMouseEnter={() => setFormHover(true)}
              onMouseLeave={() => setFormHover(false)}
              className={`
                transition-all duration-500 ease-out transform w-[60vw]
                ${formHover ? "scale-100 rotate-0" : "scale-100 rotate-0"}
              `}
              style={{
                transform: `
                  translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px) 
                  scale(${formHover ? 0.9 : .85}) 
                  rotate(${formHover ? "0.5deg" : "0deg"})
                `,
              }}>
          <RotatingHuman />
        </div>
      {/* Main Content Container */}
      <div className="flex  items-center justify-center mt-10 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ]">
          <div className="mx-auto">
            {/* Interactive Form */}
            <div 
              onMouseEnter={() => setFormHover(true)}
              onMouseLeave={() => setFormHover(false)}
              className={`
                transition-all duration-500 ease-out transform w-[60vw]
                ${formHover ? "scale-100 rotate-0" : "scale-100 rotate-0"}
              `}
              style={{
                transform: `
                  translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px) 
                  scale(${formHover ? 0.9 : .85}) 
                  rotate(${formHover ? "0.5deg" : "0deg"})
                `,
              }}
            >
              <div
                className={`
                  bg-zinc-800/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border shadow-2xl
                  transition-all duration-300
                  ${
                    formHover
                      ? "border-white/30 shadow-white/20"
                      : "border-white/10"
                  }
                `}
                style={{
                  boxShadow: formHover
                    ? "0 25px 50px -12px rgba(255, 255, 255, 0.2)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex font-mono">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                      Let's Build
                      <span className="block text-zinc-400">
                        Something Great
                      </span>
                    </h1>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto mt-2">
                      Transform your vision into reality. Let's start crafting your digital solution.
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-6 rotate-0">
                    <div className="flex justify-between text-xs text-zinc-400 mb-2">
                      <span>Progress</span>
                      <span>{Math.round(completionPercentage)}%</span>
                    </div>
                    <div className="w-full bg-zinc-700/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-white to-zinc-300 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4 sm:space-y-5">
                  {/* Personal Information */}
                  <div className="flex w-full justify-between">
                    

                    <div className="flex flex-col w-[25vw]  space-y-4">

                      <input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        onMouseEnter={() => setHoveredField("name")}
                        onMouseLeave={() => setHoveredField("")}
                        placeholder="Your Name *"
                        className={inputClass("name")}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}

                      <input
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        onMouseEnter={() => setHoveredField("email")}
                        onMouseLeave={() => setHoveredField("")}
                        placeholder="Email Address *"
                        type="email"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    <input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      onMouseEnter={() => setHoveredField("phone")}
                      onMouseLeave={() => setHoveredField("")}
                      placeholder="Phone Number *"
                      type="tel"
                      className={inputClass("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="w-[30vw] h-[28vh] flex">
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onMouseEnter={() => setHoveredField("message")}
                      onMouseLeave={() => setHoveredField("")}
                      placeholder="Tell me about your project... *"
                      rows={4}
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  </div>

                   
                  {/* Description box*/}               
                  
                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`
                      w-full py-4 rounded-lg font-semibold text-zinc-900 transition-all duration-300 relative overflow-hidden
                      ${
                        isSubmitting
                          ? "bg-zinc-600 cursor-not-allowed"
                          : "bg-white hover:bg-zinc-100 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/20"
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Start Our Journey"
                    )}
                  </button>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-8 pt-6 border-t border-white/10">
                    <a
                      href="https://github.com/NamNam9252"
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-white transition-all duration-300 text-sm hover:scale-110"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/naman-goyal-ba12b1333"
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-white transition-all duration-300 text-sm hover:scale-110"
                    >
                      LinkedIn
                    </a>
                  </div>

                  <div className="text-center space-y-1 pt-4">
                    <p className="text-xs text-zinc-400">
                      ⚡ Response within 24 hours
                    </p>
                    <p className="text-xs text-zinc-500">
                      Available for freelance projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><div onMouseEnter={() => setFormHover(true)}
              onMouseLeave={() => setFormHover(false)}
              className={`
                transition-all duration-500 ease-out transform w-[60vw]
                ${formHover ? "scale-100 rotate-0" : "scale-100 rotate-0"}
              `}
              style={{
                transform: `
                  translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px) 
                  scale(${formHover ? 0.9 : .85}) 
                  rotate(${formHover ? "0.5deg" : "0deg"})
                `,
              }}><WritingTemplate /></div>
      </div>
      
    </div>
  );
}
