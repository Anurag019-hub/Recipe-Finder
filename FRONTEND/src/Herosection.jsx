import burgerstack from "./asset/burgerstack.gif"
import lightlogo from "./asset/logolight.png"
import png2 from "./asset/2.png"
import png3 from "./asset/3.png"
import png4 from "./asset/4.png"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import CircleFollower from "./Mouse"



function Herosection() {
  const slideref = useRef(null);


  useGSAP(() => {
    const imgs = gsap.utils.toArray("[data-gsap-img]")
    gsap.from(imgs, {
      x: -30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
    })
    const tl = gsap.timeline()
    tl.from(slideref.current.children, {
      x: -30,
      opacity: 0,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 2,
      delay: 1,
      stagger: 0.4
    })

  })


  return (
    <>
    <CircleFollower/>
      <div className=" relative h-[100dvh] w-[100dvw] bg-[url(./asset/1.jpg)] flex overflow-hidden not-lg:flex-col-reverse">
        <div className="w-[50dvw] h-[100%] flex flex-col justify-center items-center not-lg:w-[100dvw]">

          <img src={lightlogo} className="w-[40%] not-lg:w-[80%] not-lg:mt-5 self-center not-lg:z-15" ></img>
          <h1 className="font-pt italic font-bold text-white xl:pr-50 pl-30 -mt-3 text-xl md:pl-100  not-lg:z-15">RECIPE-FINDER</h1>
          <div ref={slideref} className="mt-10">
            <h1 className="font-anton text-white  text-6xl not-lg:4xl z-2">SEARCH</h1>
            <h1 className="font-anton text-white ml-5 text-6xl not-lg:4xl z-2">  COOK</h1>
            <h1 className="font-anton text-white ml-10 text-6xl not-lg:4xl z-2">      ENJOY</h1>
          </div>
          <img src={png3} data-gsap-img className="absolute top-65 -left-20 not-lg:hidden"></img>
          <img src={png4} data-gsap-img className="absolute bottom-20 left-40 h-40 not-lg:hidden"></img>
        </div>
        <div className="w-[50dvw] h-[100%]   flex justify-around">
          <img src={burgerstack} className="absolute bottom-25 w-[60%] z-10 not-lg:top-30 not-lg:w-[100%] not-lg:left-5"></img>
          <img src={png2} data-gsap-img className="absolute -right-20 top-95 z-5 not-lg:hidden"></img>
          <div className="w-[50%] bg-red-600 not-lg:hidden"></div>
        </div>

      </div>
    </>
  )
}
export default Herosection;