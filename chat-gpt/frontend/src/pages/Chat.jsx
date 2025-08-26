import { useState, useRef, useEffect } from "react";
import img from "../assets/gpt.png";
import { BsLayoutSidebar } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ReactMarkdown from "react-markdown";
import { io } from "socket.io-client";
import { AiOutlinePlus, AiOutlineAudio, AiOutlineSend } from "react-icons/ai";
import {
  FaChevronDown,
  FaShareAlt,
  FaRegFileAlt,
  FaEllipsisV,
} from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import axios from "axios";

export default function App() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const messageRef = useRef(null);
  const titleRef = useRef(null);
  const btnRef = useRef(null);
  const extraRef = useRef(null);
  const containerRef = useRef(null);
  const chatBoxRef = useRef(null);
  const sideBarRef = useRef(null);
  const sendBtnRef = useRef(null);
  const plusRef = useRef(null);
  const inputRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [active, setActive] = useState()
  const [messages, setMessages] = useState([]);  



  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("https://chatgpt-pd3e.onrender.com/api/chat", {
          withCredentials: true,
        });
        const usersChats = (response.data.chat.title).reverse();
        const chatData = usersChats.map(item=>{
              return {
                id:item._id,
                name:item.title
              }
        })
          setChats(chatData)
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
    const socketInstance = io("https://chatgpt-pd3e.onrender.com", {
      withCredentials: true,
    });
    setSocket(socketInstance);

    socketInstance.on("ai-response", (res) => {
      console.log(res);
      setMessages((prev) => [...prev, { text: res.content, sender: "model" }]);
    });
  }, []);





  gsap.defaults({ duration: 0.5, ease: "power2.out" });

  const sideBarHandler = () => {
    if (isOpen) {
      gsap.to(leftRef.current, {
        x: "-82%",
      });
      gsap.to(titleRef.current, {
        width: "126.6%",
        x: "-21.4%",
      });
      gsap.to([messageRef.current, extraRef.current], {
        width: "120%",
        x: "-22%",
      });
      gsap.to(btnRef.current, {
        width: "120%",
        x: "-22%",
      });
    } else {
      gsap.to(leftRef.current, {
        x: "0%",
      });
      gsap.to(titleRef.current, {
        width: "100%",
        x: "0",
      });
      gsap.to([messageRef.current, extraRef.current], {
        width: "100%",
        x: "0%",
      });
      gsap.to(btnRef.current, {
        width: "100%",
        x: "0%",
      });
    }
    setIsOpen(!isOpen);
  };



  const createChatBoxHandler = () => {
    chatBoxRef.current.style.display = "block";
    containerRef.current.style.filter = "blur(3px)";
  };

  const creteChatHandler = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    if (title.length) {
      try {
        const response = await axios.post(
          "https://chatgpt-pd3e.onrender.com/api/chat",
          { title },
          { withCredentials: true }
        );
        setChats((prev)=>[
          {
            id: response.data.chat.id,
            name: title,
          },...prev
        ]);
      } catch (err) {
        console.log(err);
      }

    } else {
      alert("enter your chat name please.");
    }

    chatBoxRef.current.style.display = "none";
    containerRef.current.style.filter = "blur(0px)";
  };
  const closeBtnHandler = () => {
    chatBoxRef.current.style.display = "none";
    containerRef.current.style.filter = "blur(0px)";
  };



  const getMessage = async (e) => {
    setActive(e)
    try{
      const userMessages = await axios.get(`https://chatgpt-pd3e.onrender.com/api/message/${e}`,{
        withCredentials:true
      })
      if (userMessages.data.chat) {
           const newMessages = userMessages.data.chat.map(item => ({
    text: item.content,
    sender: item.role
  }));
  setMessages(newMessages);
      } else {
          setMessages([])
      }
    }catch(err){
      console.log('error',err)
    }
  }



  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages((prev) => [...prev, { text: newMessage, sender: "user" }]);

      socket.emit("ai-message", {
        chatId: "68ad37d6fecf2bf38d410024",
        content: newMessage,
      });
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        ref={chatBoxRef}
        className="hidden absolute z-3 text-white flex flex-col items-center rounded-lg px-4 py-2 bg-[#303030] top-[30%] left-[35%] translate-[-35%,-30%] w-[35%] h-[34%]">
        <span
          onClick={closeBtnHandler}
          className="absolute text-white w-7 flex justify-center items-center rounded-full h-7 bg-[#303030] -right-8 -top-4"
        >
          <GiCrossMark size={15} />
        </span>
        <h3 className="text-center capitalize text-lg underline underline-offset-4 tracking-tight font-semibold">
          Chat Name
        </h3>
        <form
          onSubmit={creteChatHandler}
          className="flex flex-col gap-7 w-full "
        >
          <input
            type="text"
            name="title"
            autoComplete="off"
            className="w-full border-b outline-none border-white mt-[2em] px-2 py-3"
            placeholder="enter your chat name..."
          />
          <button className="text-black bg-white rounded-lg py-[0.47rem] px-4">
            Create
          </button>
        </form>
      </div>
      <div
        ref={containerRef}
        className="flex overflow-hidden h-screen w-screen bg-[#212121] text-white"
      >
        <div
          ref={leftRef}
          className="w-1/4 bg-[#181818] p-4 border-r border-[#303030]"
        >
          <div className="flex justify-between items-center w-full mb-4 h-[2rem]">
            <img className="w-[2rem] h-[3rem] " src={img} alt="" />
            <BsLayoutSidebar
              ref={sideBarRef}
              color={"white"}
              onClick={sideBarHandler}
            />
          </div>
          <ul className="space-y-2">
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={`p-2 rounded-md cursor-pointer hover:bg-[#303030] ${active === chat.id ? 'active' : ''}`}
                onClick={()=>getMessage(chat.id) }
              >
                {chat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex w-full flex-col bg-[rgb(33,33,33)]">
          <div
            ref={titleRef}
            className="flex items-center w-full justify-between px-4 py-4 bg-[#212121] text-white border-b border-[#303030]"
          >
            {/* Left Side - Title */}
            <div className="flex items-center w-full justify-between space-x-1 cursor-pointer">
              <span className="text-xl font-medium">ChatGPT</span>
              <FaPlus ref={plusRef} size={14} onClick={createChatBoxHandler} />
            </div>
          </div>
          {/* Messages */}
          <div
            ref={messageRef}
            className="chat-box flex-1 py-5 px-2 overflow-auto space-y-3"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex  ${
                  msg.sender === "user" ? "justify-end" : "justify-start w-full leading-loose"
                }`}
              >
                <div
                  className={`p-3 prose rounded-lg max-w-lg ${
                    msg.sender === "user"
                      ? "bg-[#303030] text-white"
                      : "bg-transparent text-white"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          {/* ChatGPT Style Input */}
          <div className="p-4 bg-[#212121]">
            <div
              ref={btnRef}
              className="flex items-center bg-[#212121] border-[0.16rem] border-[#303030] rounded-4xl px-3 py-2"
            >
              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything"
                className="flex-1 bg-transparent text-white placeholder-gray-400 py-2 outline-none px-2"
              />

              {/* Send Icon */}
              <button
                ref={sendBtnRef}
                onClick={handleSend}
                className="text-gray-400 hover:text-white"
              >
                <AiOutlineSend size={20} onClick={handleSend} />
              </button>
            </div>
          </div>
          <p ref={extraRef} className="text-xs text-center pb-3">
            ChatGPT can make mistakes. Check important info.{" "}
            <span className="underline">See Cookie Preferences.</span>
          </p>
        </div>
      </div>
    </>
  );
}
