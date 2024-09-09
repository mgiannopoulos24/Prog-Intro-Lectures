import React from "react";
import "./styles/Homepage.css";
import CustomCard from "../components/other/CustomCard";
import cardData from "../utils/cardData";
import RoundIconButton from "../components/buttons/RoundIconButton";

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
            <RoundIconButton />
            <footer className="footer mt-5">
                <div className="container text-center py-3">
                    <p>&copy; {new Date().getFullYear()} Prog Intro Lectures. All rights reserved.</p>
                    <p>Designed and Developed by <a href="https://github.com/matinanadali" target="_blank" rel="noopener noreferrer">matinanadali</a> and <a href="https://github.com/mgiannopoulos24"target="_blank" rel="noopener noreferrer">mgiannopoulos24</a>.</p>
                </div>
            </footer>
        </>
    );
}

export default Homepage;
