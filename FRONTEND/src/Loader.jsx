import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FoodLoader() {
  const plateRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      plateRef.current,
      { rotate: 0 },
      {
        rotate: 360,
        duration: 4,
        ease: "linear",
        repeat: -1,
      }
    );

    gsap.fromTo(
      textRef.current,
      { scale: 0.95, opacity: 0.5 },
      {
        scale: 1.05,
        opacity: 1,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );
  }, []);

  return (
    <div className="h-screen w-screen bg-yellow-50 flex flex-col justify-center items-center font-cursive text-center">
      <div
        ref={plateRef}
        className="w-32 h-32 bg-white rounded-full shadow-xl border-8 border-orange-400 flex items-center justify-center"
      >
        🍲
      </div>
      <h2
        ref={textRef}
        className="mt-6 text-3xl md:text-4xl text-orange-600 font-semibold tracking-wide"
      >
        Cooking something delicious...
      </h2>
    </div>
  );
}
