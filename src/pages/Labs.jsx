import React from "react";
import LabCard from "@/components/cards/LabCard";
import labcardData from "@/data/labcardData";

const Labs = () => {
  return (
    <>
      <div className="container mx-auto px-4 mt-16 sm:mt-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Εργαστήρια
          </h1>
          <h4 className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Εδώ θα βρεις όλα τα εργαστήρια με τις εκφωνήσεις και τις λύσεις
            τους!
          </h4>
          <hr className="my-8 border-t border-gray-200 dark:border-gray-700" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {labcardData.map((card) => (
              <LabCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                desc={card.desc}
                solution={card.solution}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Labs;
