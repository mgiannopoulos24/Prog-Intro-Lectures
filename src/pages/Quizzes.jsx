import React from 'react';
import './styles/Quizzes.css';
import QuizzesCardData from '../utils/QuizzesCardData.json';
import CustomQuizCard from '../components/other/CustomQuizCard';
import BackButton from '../components/buttons/BackToMain';

const Quizzes = () => {

    const handleQuizCardClick = (cardId) => {
        return;
    }

    return (
        <>  
            <BackButton />
            <div className="Quizzes container mt-5">
                <div className="text-center">
                    <h1>Kahoot Quizzes</h1>
                    <h3>Time for some fun!</h3>
                    <hr className="my-4" />
                </div>      
            </div>
            <div className="cards d-flex justify-content-center flex-wrap gap-3">
                {QuizzesCardData.map((card) => (
                    <CustomQuizCard
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    onClick={() => handleQuizCardClick(card.id)}
                    />
                ))}
            </div>
        </> 
    )
}

export default Quizzes;