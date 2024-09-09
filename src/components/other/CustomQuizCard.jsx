import React from 'react';
import "./CustomQuizCard.css";
import { Button } from '@mui/material'; 

const QuizCard = ({ image, title, description, onClick }) => {
  return (
    <div className="quiz-card">
      <div className="quiz-img-container">
        <img src={require("../../assets/"+image)} alt="quiz-img" className="quiz-img" />
      </div>
      <div className="quiz-title">
        <div className='quiz-info'>
          <h2>{title}</h2>
          <h3>{description}</h3>
        </div>
        <div className="play-button-container">
        <Button variant="contained" className="play-button" onClick={onClick}>
          Play!
        </Button>
      </div>
      </div>
      
    </div>
  );
};

export default QuizCard;