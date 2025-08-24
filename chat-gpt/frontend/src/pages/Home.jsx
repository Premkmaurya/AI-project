import {useRef,useEffect} from "react";
import gsap from 'gsap'
import Particle from "../components/Particle";
import Nav from "../components/Nav";
import gpt from '../assets/gpt.png'
import HeroSection from "../components/HeroSection";

function Home() {
  const mainRef = useRef(null)
  const imgRef = useRef(null)
  const contentRef = useRef(null)
  useEffect(() => {
    const tl = gsap.timeline()
    tl.from(mainRef.current,{
      y:"100%",
      duration:0.8,
      ease:"power2.out"
    }),
    tl.from(imgRef.current,{
      scale:0,
      opacity:0,
      rotate:720,
      delay:0.3,
      duration:2,
      ease:"power3.out"
    }),
    tl.set(imgRef.current,{
      filter:"drop-shadow(4px 4px 12px rgba(255,255,255,0.4))"
    }),
    tl.to(imgRef.current,{
      rotate:720,
      scale:16,
      duration:2,
      ease:"power3.out",
      onUpdate:function () {
        const progress = this.progress();
        if(progress >= 0.86){
          mainRef.current.style.display = "none";
          contentRef.current.style.display = 'block';
        }
      }
    })
  }, [])

  return (
    <div className="overflow-hidden">
    <div ref={mainRef} className="bg-black w-[100vw] flex justify-center items-center h-[100vh]">
      <img className="w-[6rem] h-[8rem]" ref={imgRef} src={gpt} />
    </div>
    <div ref={contentRef} className="hidden relative bg-black overflow-hidden w-screen h-screen">
      <Nav />
      <HeroSection />
      <Particle
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={500}
        particleSpread={8}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        particleHoverFactor={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
    </div>
  );
}

export default Home;
