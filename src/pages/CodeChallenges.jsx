import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Quizzes.css";
import CustomQuizCard from "../components/other/CustomQuizCard";
import challenges from "../backend/challengeData";
import challenge_img from "../assets/challenge_img.jpg";

const CodeChallenges = () => {
  const navigate = useNavigate();

  const handleClick = (problemIndex) => {
    navigate(`/CodeChallenge/${problemIndex}`);
  };
  return (
    <>
      <div className="Quizzes container mt-5">
        <div className="text-center">
          <h1>Coding Challenges</h1>
          <h3>Εδώ θα βρεις κάποια challenges για εξάσκηση!</h3>
          <hr className="my-4" />
        </div>
      </div>
      <div className="cards d-flex justify-content-center flex-wrap gap-3">
        {challenges.map((problem, index) => (
          <CustomQuizCard
            image={challenge_img}
            title={`Πρόβλημα #${index}`}
            description={problem["problemTitle"]}
            onClick={() => handleClick(index)}
            buttonText="Code"
          />
        ))}
      </div>
    </>
  );
};

export default CodeChallenges;
