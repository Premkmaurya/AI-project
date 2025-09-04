import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { LuSend } from "react-icons/lu";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Preview() {
  const fileRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [captionFile, setCaptionFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const [selectedOptionSec, setSelectedOptionSec] = useState("Option 1");
  const [captionText, setCaptionText] = useState(
    "generated caption will go here......"
  );
  const [imgurl, setImgurl] = useState([]);
  const [previewImageurl, setPreviewImageUrl] = useState("");
  const location = useLocation();
  const file = location.state?.file;
  useEffect(() => {
    if (file) {
      setCaptionFile(file);
      const imageUrl =
        typeof file === "string" ? file : URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
      setImgurl((prev) => (prev.length === 0 ? [imageUrl] : prev));
    }
  }, []);
  const handleUploadClick = (dets) => {
    const insideImg = dets.target.files[0];
    setCaptionFile(insideImg);
    const insideImageUrl =
      typeof insideImg === "string"
        ? insideImg
        : URL.createObjectURL(insideImg);
    setPreviewImageUrl(insideImageUrl);
    setImgurl((prev) => [...prev, insideImageUrl]);
    toast.success("Image uploaded.");
  };

  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (dets) => {
    console.log(selectedOption,selectedOptionSec)
    const formData = new FormData();
    formData.append("file", captionFile);
    const options = {
      optFir: selectedOption,
      optSec: selectedOptionSec,
    }
    try {
      setIsLoading(true);
      const caption = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          withCredentials: true,
        }
      );
      const captionText = caption.data.createPost.caption;
      toast.success("Caption generated successfully.");

      setIsLoading(false);
      setCaptionText(captionText);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error generating caption.");
      setCaptionText("there is an error.Try again.");
      console.log("there is an error" + error);
    }
    reset();
  };

  const options = [
    { value: 'Fun', label: 'Fun' },
    { value: 'Sad', label: 'Sad' },
    { value: 'angry', label: 'angry' },
    { value: 'adventure', label: 'adventure' },
    { value: 'motivational', label: 'motivational' },
  ];
  const options1 = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Latin', label: 'Latin' },
    { value: 'urdu', label: 'urdu' },
  ];


  return (
    <div className="h-[88vh] mt-2 bg-white flex flex-col items-center justify-center relative px-4">
      <div className="flex w-full h-[90%] justify-center items-start">
        <div className="w-[50%] h-full flex items-start justify-center ">
          <div className="w-[90%] h-[80%]">
            {previewImageurl && (
              <img
                src={previewImageurl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
        <div className="w-[50%] h-full flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex w-full h-[10%] items-center gap-2 justify-between"
          >
            <div className="relative w-[50%]">
              <select
                value={selectedOption}
                onChange={(e)=>setSelectedOption(e.target.value)}
                className="w-full appearance-none text-black py-3 px-4 pr-8 rounded-lg font-semibold
                         focus:outline-none focus:ring-2 focus:ring-black-500 cursor-pointer transition-all duration-200 border-1 border-gray-400"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" />
                </svg>
              </div>
            </div>
            <div className="relative w-[50%]">
              <select
                value={selectedOptionSec}
                onChange={(e)=>setSelectedOptionSec(e.target.value)}
                className="w-full appearance-none text-black py-3 px-4 pr-8 rounded-lg font-semibold
                         focus:outline-none focus:ring-2 focus:ring-black-500 cursor-pointer transition-all duration-200 border-1 border-gray-400"
              >
                {options1.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9l4.95 4.95z" />
                </svg>
              </div>
            </div>
            <button className="p-3 rounded-full bg-gray-300 flex items-center justify-center ml-3">
              <LuSend size={17} />
            </button>
          </form>
          <div className="border border-gray-400 px-4 overflow-y-auto py-3 rounded-lg text-gray-800 w-full h-[20%]">
            {isLoading ? (
              <div className="animate-pulse text-gray-500">Loading...</div>
            ) : (
              captionText
            )}
          </div>
          <div className="flex w-full items-center text-gray-800">
            <h3>Rate this caption?</h3>
            <div className="flex gap-5 ml-5 justify-center">
              <FaRegThumbsUp size={25} />
              <FaRegThumbsDown size={25} className="mt-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 flex gap-4 items-center">
        {imgurl.map((item, idx) => (
          <img
            key={idx}
            src={item}
            onClick={() => setPreviewImageUrl(item)}
            alt="thumb"
            className="w-16 h-16 object-cover rounded-md"
          />
        ))}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUploadClick}
          name="img"
          ref={fileRef}
        />
        <button
          onClick={() => fileRef.current.click()}
          className="bg-blue-100 text-blue-600 p-4 rounded-lg"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default Preview;
