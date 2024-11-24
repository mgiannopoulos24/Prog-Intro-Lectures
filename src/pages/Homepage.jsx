import React from "react";
import "react-app-polyfill/ie11";
import CustomCard from "../components/other/CustomCard";
import cardData from "../utils/cardData";

const Homepage = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="text-center">
          <h1>Prog Intro Lectures</h1>
          <h3>Χειμερινό Εξάμηνο 2024-25</h3>
          <hr className="my-4" />
        </div>
      </div>
      <div className="cards d-flex justify-content-center flex-wrap gap-3">
        {cardData.map((card) => (
          <CustomCard
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
    </>
  );
};

export default Homepage;
