import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CircleFollower() {
  const circleRef = useRef(null);

  useEffect(() => {
   const img = document.querySelector("img")
    const moveCircle = (e) => {
      gsap.to(circleRef.current, {
        x: e.clientX-16,
        y: e.clientY-16,
        duration: 0.3,
        ease: "power3.out",
      });
    };
    const scaleCircle = (e) => {
      gsap.to(circleRef.current, {
        x: e.clientX-16,
        y: e.clientY-16,
        scale:1.5,
        duration: 0.3,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", moveCircle);
    img.addEventListener("mouseover",scaleCircle)
    return () => {
      window.removeEventListener("mousemove", moveCircle);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-8 h-8  bg-red-500 rounded-full pointer-events-none z-50"
      />
    </div>
  );
}
