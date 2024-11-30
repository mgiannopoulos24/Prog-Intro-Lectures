import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import questions from "./quizzes/quiz15.json";
import "./QuizDialog.css";
import images from "./images";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuizDialog15 = ({ open, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState([]);
  const [userSelections, setUserSelections] = useState([]);

  useEffect(() => {
    if (open) {
      resetQuiz();
    }
  }, [open]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setCorrectAnswerIndexes([]);
    setUserSelections([]);
  };

  const handleAnswerClick = (answer, index) => {
    const correctAnswersArray = Array.isArray(
      questions[currentQuestionIndex].correctAnswer,
    )
      ? questions[currentQuestionIndex].correctAnswer
      : [questions[currentQuestionIndex].correctAnswer];
    const isCorrect = correctAnswersArray.includes(answer);

    const correctIndexes = correctAnswersArray.map((correctAnswer) =>
      questions[currentQuestionIndex].answers.indexOf(correctAnswer),
    );

    setSelectedAnswer({ answer, isCorrect });
    setCorrectAnswerIndexes(correctIndexes);

    setUserSelections((prevSelections) => {
      const newSelections = [...prevSelections];
      newSelections[currentQuestionIndex] = {
        answer,
        isCorrect,
        correctIndexes,
      };
      return newSelections;
    });

    if (isCorrect) {
      setCorrectAnswers((prevCount) => prevCount + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      const nextSelection = userSelections[currentQuestionIndex + 1];
      if (nextSelection) {
        setSelectedAnswer({
          answer: nextSelection.answer,
          isCorrect: nextSelection.isCorrect,
        });
        setCorrectAnswerIndexes(nextSelection.correctIndexes);
      } else {
        setSelectedAnswer(null);
        setCorrectAnswerIndexes([]);
      }
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      const previousSelection = userSelections[currentQuestionIndex - 1];
      if (previousSelection) {
        setSelectedAnswer({
          answer: previousSelection.answer,
          isCorrect: previousSelection.isCorrect,
        });
        setCorrectAnswerIndexes(previousSelection.correctIndexes);
      } else {
        setSelectedAnswer(null);
        setCorrectAnswerIndexes([]);
      }
    }
  };

  const handleDialogClose = () => {
    resetQuiz();
    onClose();
  };

  const getMessage = () => {
    const totalQuestions = questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const message = `Πέτυχες ${correctAnswers} από τις ${totalQuestions} ερωτήσεις!`;

    if (percentage <= 33) {
      return (
        <>
          <p id="upper">{message}</p>
          <p id="lower">Δεν τα πήγες τόσο καλά. 🙁</p>
        </>
      );
    } else if (percentage <= 66) {
      return (
        <>
          <p id="upper">{message}</p>
          <p id="lower">Καλή προσπάθεια! 🙂</p>
        </>
      );
    } else {
      return (
        <>
          <p id="upper">{message}</p>
          <p id="lower">Συγχαρητήρια!!🎉</p>
        </>
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      PaperProps={{ style: { width: "80%", height: "80%" } }}
      TransitionComponent={Transition}
    >
      <DialogTitle
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Πολυπλοκότητα και άλλα
        <CloseIcon onClick={handleDialogClose} style={{ cursor: "pointer" }} />
      </DialogTitle>
      {showResult ? (
        <>
          <DialogContent id="content">
            <p>{getMessage()}</p>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleDialogClose}
              sx={{ fontWeight: "bold", textTransform: "none" }}
            >
              Πίσω
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <LinearProgress
            variant="determinate"
            value={((currentQuestionIndex + 1) / questions.length) * 100}
          />
          <DialogContent>
            <div>
              <div className="question-img">
                <img
                  src={images[questions[currentQuestionIndex].photoURL]}
                  alt={`Question ${currentQuestionIndex + 1}`}
                />
              </div>
              <p id="qtext">{questions[currentQuestionIndex].question}</p>
              <div className="answers-container">
                {questions[currentQuestionIndex].answers.map(
                  (answer, index) => {
                    let backgroundColor = "";
                    if (selectedAnswer) {
                      if (selectedAnswer.answer === answer) {
                        backgroundColor = selectedAnswer.isCorrect
                          ? "green"
                          : "red";
                      } else if (correctAnswerIndexes.includes(index)) {
                        backgroundColor = "green";
                      } else {
                        backgroundColor = "gray";
                      }
                    }

                    return (
                      <Button
                        key={index}
                        variant="contained"
                        onClick={() => handleAnswerClick(answer, index)}
                        disabled={!!selectedAnswer}
                        style={{
                          backgroundColor: backgroundColor,
                          opacity: 1,
                          color: "white",
                        }}
                      >
                        {answer}
                      </Button>
                    );
                  },
                )}
              </div>
            </div>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="contained"
              sx={{ marginRight: "8px", textTransform: "none" }}
            >
              <ArrowBackIcon />
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              {currentQuestionIndex === questions.length - 1 ? (
                "Τέλος"
              ) : (
                <ArrowForwardIcon />
              )}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default QuizDialog15;
