import {useRef,useEffect} from "react";
import TextType from "./TextType";
import ShinyText from './ShinyText';
import DecryptedText from './DecryptedText';
import CircularText from './CircularText'
import {useNavigate} from 'react-router-dom';
import { MdArrowOutward } from "react-icons/md";
import SplitText from "./SplitText";

import gsap from 'gsap'

function HeroSection() {
  const navigate = useNavigate()
  const btnRef = useRef(null)
  
  useEffect(()=>{
    gsap.from(btnRef.current,{
      y:"-20%",
      opacity:0,
      scale:0,
      delay:0.7,
      duration:1.2,
      ease:"bounce.in"
    })
  },[]);

  return (
    <>
    <div className="absolute flex justify-between items-center bg-transparent w-full h-full">
     <div className="w-full flex flex-col gap-3 px-[3rem] justify-center items-center">

      <SplitText
        text="CHATGPT, CLONE!"
        className="text-5xl text-white font-semibold text-center"
        delay={40}
        duration={2}
        ease="elastic.out(1,0.3)"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-200px"
        textAlign="center"
      />
      <TextType 
        text={["Future of Conversations, Today."]}
        typingSpeed={10}
        showCursor={true}
        cursorCharacter="|"
        reverseMode={false}
        className="text-xl"
      />
      <TextType 
        text={["Your personal AI that types,"]}
        typingSpeed={10}
        pauseDuration={100}
        showCursor={true}
        initialDelay={500}
        cursorCharacter="|"
        reverseMode={false}
        className="text-xl"
      />
       <TextType 
        text={["thinks & vibes like you."]}
        typingSpeed={10}
        pauseDuration={100}
        showCursor={true}
        initialDelay={700}
        cursorCharacter="|"
        reverseMode={false}
        className="text-xl"
      />
      <button ref={btnRef} onClick={()=>navigate('/chat')} className="absolute z-3 bottom-[25%] flex items-center justify-between gap-2 shadow-xl/30 backdrop-blur-lg shadow-white/20 text-black border border-white/30 rounded-3xl text-white py-[0.6rem] px-4">Try it Now <MdArrowOutward /></button>
     </div>
    </div>
    <CircularText
      text="*CHATGPT*CLONE*AI"
      onHover="speedUp"
      spinDuration={20}
      className="absolute right-4 bottom-2 w-1rem h-1rem text-md"
    />
    </>
  );
}

export default HeroSection;
