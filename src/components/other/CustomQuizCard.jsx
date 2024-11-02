import React from 'react';
import "./styles/CustomQuizCard.css";
import { PlayButton } from '../buttons/PlayButton';

const QuizCard = ({ image, title, description, onClick, buttonText }) => {
  return (
    <div className="quiz-card">
      <div className="quiz-img-container">
        <img src={image} alt="quiz-img" className="quiz-img" />
      </div>
      <div className="quiz-title">
        <div className='quiz-info'>
          <h2>{title}</h2>
          <h3>{description}</h3>
        </div>
        <div className="play-button-container" onClick={onClick}>
          <PlayButton text={buttonText} />
        </div>
      </div>
      
    </div>
  );
};

export default QuizCard;