import React from "react";
import 'react-app-polyfill/ie11';
import "./styles/Homepage.css";
import CustomCard from "../components/other/CustomCard";
import cardData from "../utils/cardData";
import RoundIconButton from "../components/buttons/RoundIconButton";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';
import Footer from "../components/layout/Footer";
import GitHubRibbon from 'react-github-ribbons';

const Homepage = () => {

    return (
        <>  
            <div>
                <GitHubRibbon href="https://github.com/mgiannopoulos24/Prog-Intro-Lectures" color="red" target="_blank" position="left"/>
            </div>
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
            <RoundIconButton icon={<SportsEsportsIcon/>} to="/Quizzes" position={0}/>
            <RoundIconButton icon={<CodeIcon/>} to="/CodeChallenges" position={1} />
            <Footer />
        </>
    );
}

export default Homepage;
