import React, { useState } from "react";
import QuizCard from "@/components/cards/QuizCard";
import kahoot_img from "@/assets/kahoot.png";
import QuizDialog from "@/components/dialogs/QuizDialog";
import quiz1Data from "@/data/quizzes/quiz1";

const quizzes = [
  {
    id: 1,
    title: "Διάλεξη #0",
    description: "Καλημέρα Κόσμε!",
    data: quiz1Data,
    dialogTitle: "Καλημέρα Κόσμε!",
  },
];

const Quizzes = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);

  const handleOpenQuiz = (quiz) => setActiveQuiz(quiz);
  const handleCloseQuiz = () => setActiveQuiz(null);

  return (
    <>
      <div className="container mx-auto px-4 pt-10 sm:pt-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Kahoot Quizzes
          </h1>
          <h3 className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Εδώ θα βρεις όλα τα Kahoot από τις διαλέξεις.
          </h3>
          <hr className="my-8 border-t border-gray-200 dark:border-gray-700" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                image={kahoot_img}
                title={quiz.title}
                description={quiz.description}
                onClick={() => handleOpenQuiz(quiz)}
                buttonText="Play"
              />
            ))}
          </div>
        </div>
      </div>

      {activeQuiz && (
        <QuizDialog
          open={!!activeQuiz}
          onClose={handleCloseQuiz}
          title={activeQuiz.dialogTitle}
          questions={activeQuiz.data}
        />
      )}
    </>
  );
};

export default Quizzes;
