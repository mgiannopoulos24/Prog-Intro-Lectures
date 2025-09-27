import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import QuizCard from "@/components/cards/QuizCard";
import challenges from "../../backend/challengeData";
import challenge_img from "@/assets/challenge_img.jpg";

const CodeChallenges = () => {
  const navigate = useNavigate();

  const handleClick = (problemIndex) => {
    navigate(`/CodeChallenge/${problemIndex}`);
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-16 sm:mt-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Coding Challenges
          </h1>
          <h3 className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Εδώ θα βρεις κάποια challenges για εξάσκηση!
          </h3>
          <hr className="my-8 border-t border-gray-200 dark:border-gray-700" />
        </div>
      </div>

      <div className="container mx-auto px-4 mb-12">
        <Alert className="max-w-2xl mx-auto text-left border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/30">
          <Lightbulb className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          <AlertTitle className="font-bold text-sky-800 dark:text-sky-300">
            Θέλετε να προτείνετε κάποιο challenge;
          </AlertTitle>
          <AlertDescription className="text-sky-700 dark:text-sky-400">
            Αναζητούμε συνεχώς νέες ιδέες από την κοινότητα. Αν έχετε ένα
            challenge που θέλετε να μοιραστείτε, ανοίξτε ένα issue{" "}
            <a
              href="https://github.com/mgiannopoulos24/Prog-Intro-Lectures/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-sky-500 dark:hover:text-sky-300"
            >
              εδώ
            </a>
            .
          </AlertDescription>
        </Alert>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((problem, index) => (
              <QuizCard
                key={index}
                image={challenge_img}
                title={`Πρόβλημα #${index + 1}`}
                description={problem.problemTitle}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeChallenges;
