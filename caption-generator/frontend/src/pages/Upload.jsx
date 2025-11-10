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
    const formData = new FormData();
    formData.append("image", captionFile);
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
    { value: "Fun", label: "Fun" },
    { value: "Sad", label: "Sad" },
    { value: "angry", label: "angry" },
    { value: "adventure", label: "adventure" },
    { value: "motivational", label: "motivational" },
  ];
  const options1 = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Russian", label: "Russian" },
    { value: "Latin", label: "Latin" },
    { value: "urdu", label: "urdu" },
  ];

  return (
    <div className="h-[88vh] mt-2 bg-white flex flex-col items-center justify-center relative px-4">
      <div className="flex flex-col sm:flex-row w-full h-[90%] justify-center items-start">
        <div className="w-[100%] sm:w-[50%] overflow-hidden h-full flex items-start justify-center">
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
        <div className="w-[100%] sm:w-[50%] h-full flex flex-col gap-4">
          <div className="border border-gray-400 px-4 overflow-y-auto py-3 rounded-lg text-black/90 font-semibold w-full md:h-[25%] max-h-[35%]">
            {isLoading ? (
              <div className="animate-pulse text-gray-500">Loading...</div>
            ) : (
              captionText
            )}
          </div>
          <button
            disabled={isLoading}
            onClick={submitHandler}
            className="p-3 rounded-full bg-gray-300 flex gap-2 font-bold items-center justify-center ml-3"
          >
            {isLoading ? "Generating..." : "Generate"}{" "}
            {!isLoading && <LuSend size={17} />}
          </button>
          <div className="flex w-full items-center text-black/90 font-semibold">
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
