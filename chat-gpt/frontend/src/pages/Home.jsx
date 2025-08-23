import { useState,useRef } from "react";
import img from '../assets/gpt.png'
import { BsLayoutSidebar } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { AiOutlinePlus, AiOutlineAudio, AiOutlineSend } from "react-icons/ai";
import { FaChevronDown, FaShareAlt, FaRegFileAlt, FaEllipsisV } from "react-icons/fa";

export default function App() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const messageRef = useRef(null)
  const titleRef = useRef(null)
  const btnRef = useRef(null)
  const extraRef = useRef(null)


  const [isOpen, setIsOpen] = useState(true);
  gsap.defaults({ duration: 0.5, ease: "power2.out" });

  
    const sideBarHandler = () => {
      if (isOpen) {
    gsap.to(leftRef.current, {
      x: "-82%",
    });
    gsap.to(titleRef.current,{
      width:"126.6%",
      x:"-21.4%"
    })
    gsap.to([messageRef.current, extraRef.current], {
      width: "120%", 
      x: "-22%",
    });
    gsap.to(btnRef.current,{
      width:"120%",
      x:"-22%",
    })
  } else {
    gsap.to(leftRef.current, {
      x: "0%",
    });
    gsap.to(titleRef.current,{
      width:"100%",
      x:"0"
    })
    gsap.to([messageRef.current, extraRef.current], {
      width: "100%",
      x: "0%",
    });
    gsap.to(btnRef.current,{
      width:"100%",
      x:"0%",
    })
    }
    setIsOpen(!isOpen)
  }


  const [chats] = useState([
    { id: 1, name: "New Chat" },
    { id: 2, name: "Project Discussion" },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", sender: "ai" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
       <div className="absolute text-white flex flex-col justify-center items-center rounded-lg px-4 py-2 bg-[#303030] top-[30%] left-[35%] translate-[-35%,-30%] w-[35%] h-[34%] ">
         <h3 className="text-center capitalize text-lg font-semibold">Enter your chat name</h3>
         <div className="w-full h-[1px] bg-white"></div>
         <input 
            type="text"
            name="title"
            className="w-[60%]  border-b outline-none border-white mt-[2em] px-4 py-2"
            placeholder="enter your chat name..."
          />
       </div>
    <div className="flex overflow-hidden h-screen w-screen bg-[#212121] text-white">
      <div ref={leftRef} className="w-1/4 bg-[#181818] p-4 border-r border-[#303030]">
        <div className="flex justify-between items-center w-full mb-4 h-[2rem]" >
          <img className="w-[2rem] h-[3rem] " src={img} alt="" />
          <BsLayoutSidebar color={"white"} onClick={sideBarHandler} />
        </div>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="p-2 rounded-md cursor-pointer hover:bg-[#303030]"
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
    <div className="flex-1 flex w-full flex-col bg-[rgb(33,33,33)]">
       <div ref={titleRef} className="flex items-center w-full justify-between px-4 py-4 bg-[#212121] text-white border-b border-[#303030]">
       {/* Left Side - Title */}
      <div className="flex items-center w-full justify-between space-x-1 cursor-pointer">
        <span className="text-xl font-medium">ChatGPT</span>
        <FaPlus size={14} />
        </div>
        </div>
        {/* Messages */}
        <div ref={messageRef} className="flex-1 p-6 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-lg ${
                  msg.sender === "user"
                    ? "bg-[#303030] text-white"
                    : "bg-transparent text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* ChatGPT Style Input */}
        <div className="p-4 bg-[#212121]">
          <div ref={btnRef} className="flex items-center bg-[#212121] border-[0.16rem] border-[#303030] rounded-4xl px-3 py-2">
              

            {/* Input */}
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
              className="flex-1 bg-transparent text-white placeholder-gray-400 py-2 outline-none px-2"
            />

            {/* Send Icon */}
            <button
              onClick={handleSend}
              className="text-gray-400 hover:text-white"
            >
              <AiOutlineSend size={20} />
            </button>
          </div>
        </div>
        <p ref={extraRef} className="text-xs text-center pb-3">ChatGPT can make mistakes. Check important info. <span className="underline">See Cookie Preferences.</span></p>
      </div>
    </div>
    </>
  );
}
