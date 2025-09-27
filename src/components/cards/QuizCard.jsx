import React from "react";
import KahootBtn from "@/components/buttons/KahootBtn";

const QuizCard = ({ image, title, description, onClick }) => {
  return (
    <div
      className="
        relative flex flex-col w-80 h-[25rem] 
        rounded-lg border-2 border-sky-300 dark:border-sky-700
        bg-gray-400/50 dark:bg-gray-800/60
        overflow-hidden backdrop-blur-lg 
        transition-transform duration-300 scale-90 hover:scale-95
      "
    >
      <div className="w-full h-1/2">
        <img
          src={image}
          alt={`${title} image`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow p-4 flex flex-col justify-around items-center text-black dark:text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <h3 className="text-base mt-1">{description}</h3>
        </div>

        <div className="w-full flex justify-center">
          <KahootBtn onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
