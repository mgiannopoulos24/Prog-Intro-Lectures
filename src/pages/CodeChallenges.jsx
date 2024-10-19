import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Quizzes.css';
import CustomQuizCard from '../components/other/CustomQuizCard';
import BackButton from '../components/buttons/BackToMain';
import Footer from '../components/layout/Footer';
import challenges from '../backend/challengeData';
import challenge_img from '../assets/challenge_img.jpg';

const CodeChallenges = () => {
    const navigate = useNavigate();

    const handleClick = (problemIndex) => {
        navigate(`/CodeChallenge/${problemIndex}`)
    }
    return (
        <>  
            <BackButton />
            <div className="Quizzes container mt-5">
                <div className="text-center">
                    <h1>Coding Challenges</h1>
                    <h3>Ώρα για εξάσκηση!</h3>
                    <hr className="my-4" />
                </div>      
            </div>
            <div className="cards d-flex justify-content-center flex-wrap gap-3">
                { challenges.map((problem, index) => (
                    <CustomQuizCard image={challenge_img} title= {`Πρόβλημα #${index}`} description={problem['problemTitle']} onClick={() => handleClick(index)} buttonText="Code" />
                )
                )
                }
            </div>
            <Footer />
        </> 
    )
}

export default CodeChallenges;