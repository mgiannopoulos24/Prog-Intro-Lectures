import LectureCard from "@/components/cards/LectureCard";
import cardData from "@/data/cardData";

const Homepage = () => {
  return (
    <>
      <div className="container mx-auto px-4 mt-16 sm:mt-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Prog Intro Lectures
          </h1>
          <h3 className="mt-2 text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
            Χειμερινό Εξάμηνο 2025-26
          </h3>
          <hr className="my-8 border-t border-gray-200 dark:border-gray-700" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cardData.map((card) => (
              <LectureCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                source={card.source}
                slides={card.slides}
                part1={card.part1}
                part2={card.part2}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
