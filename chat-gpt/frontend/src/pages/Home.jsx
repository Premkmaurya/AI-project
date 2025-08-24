import {useRef,useEffect} from "react";
import gsap from 'gsap'
import Particle from "../components/Particle";
import Nav from "../components/Nav";
import gpt from '../assets/gpt.png'
import HeroSection from "../components/HeroSection";
import TextType from '../components/TextType'

function Home() {
  const mainRef = useRef(null)
  const imgRef = useRef(null)
  const contentRef = useRef(null)
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial animations
    tl.from(mainRef.current, {
        y: "100%",
        duration: 0.8,
    })
    .from(imgRef.current, {
        scale: 0,
        opacity: 0,
        delay:0.4,
        y:"50%",
        rotate: 720,
        duration: 2,
    })
    .to(imgRef.current, {
        y: "20%",
        opacity: 0,
        scale: 0,
        duration: 1.5,
        onComplete: ()=>{
        mainRef.current.style.display = "none";
        contentRef.current.style.display = "block";
      }
    })
}, []);

  return (
    <div className="overflow-hidden bg-black">
    <div ref={mainRef} className="bg-black w-[100vw] flex flex-col justify-center items-center h-[100vh]">
      <img className="w-[6rem] h-[8rem]" ref={imgRef} src={gpt} />
      <TextType 
        text={["Introducing To you, ChatGPT.",""]}
        typingSpeed={20}
        showCursor={true}
        pauseDuration={2500}
        cursorCharacter="_"
        className="text-md"
        deletingSpeed={10}
      />
    </div>
    <div ref={contentRef} className="hidden absolute bg-black overflow-hidden w-screen h-screen">
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
