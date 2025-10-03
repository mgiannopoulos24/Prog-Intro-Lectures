import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Lightbulb,
  Frown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { loadImage } from "@/utils/imageLoader";

const QuizDialog = ({ open, onClose, title, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userSelections, setUserSelections] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);

  const currentQuestion = questions?.[currentQuestionIndex];

  useEffect(() => {
    if (open && questions?.length) {
      resetQuiz();
    }
  }, [open, questions]);

  useEffect(() => {
    if (questions?.length > 0) {
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    const fetchImage = async () => {
      setImageSrc(null);
      if (currentQuestion?.photo) {
        const src = await loadImage(currentQuestion.photo);
        setImageSrc(src);
      }
    };

    fetchImage();
  }, [currentQuestion]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setShowResult(false);
    setUserSelections(Array(questions.length).fill(null));
  };

  const handleAnswerClick = (answer) => {
    if (!currentQuestion) return;

    const correctAnswersArray = Array.isArray(currentQuestion.correctAnswer)
      ? currentQuestion.correctAnswer
      : [currentQuestion.correctAnswer];
    const isCorrect = correctAnswersArray.includes(answer);

    const correctIndexes = correctAnswersArray.map((ans) =>
      currentQuestion.answers.indexOf(ans),
    );

    const selection = { answer, isCorrect, correctIndexes };

    const newSelections = [...userSelections];
    newSelections[currentQuestionIndex] = selection;
    setUserSelections(newSelections);

    if (isCorrect && !userSelections[currentQuestionIndex]) {
      setCorrectAnswers((prevCount) => prevCount + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const getButtonVariant = (answer, index) => {
    const selection = userSelections[currentQuestionIndex];
    if (!selection) return "outline";

    const { answer: selectedAns, isCorrect, correctIndexes } = selection;
    if (answer === selectedAns) return isCorrect ? "default" : "destructive";
    if (correctIndexes.includes(index)) return "default";

    return "secondary";
  };

  const renderResults = () => {
    const totalQuestions = questions.length;
    const percentage =
      totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    let ResultIcon, message, colorClass;

    if (percentage >= 80) {
      ResultIcon = () => <Trophy className="h-20 w-20 text-yellow-500" />;
      message = "Άριστα! Είσαι εξπέρ!";
      colorClass = "text-green-600";
    } else if (percentage >= 50) {
      ResultIcon = () => <Lightbulb className="h-20 w-20 text-blue-500" />;
      message = "Πολύ καλή προσπάθεια! Συνέχισε έτσι!";
      colorClass = "text-blue-500";
    } else {
      ResultIcon = () => <Frown className="h-20 w-20 text-red-500" />;
      message = "Μην ανησυχείς, η επανάληψη είναι μήτηρ πάσης μαθήσεως!";
      colorClass = "text-red-500";
    }

    return (
      <div className="flex flex-col justify-center items-center h-full text-center p-6">
        <ResultIcon />
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">
          Το Quiz Ολοκληρώθηκε!
        </h2>
        <p className={cn("text-xl sm:text-2xl mt-2 font-semibold", colorClass)}>
          {message}
        </p>
        <p className="text-lg sm:text-xl text-slate-600 mt-4">
          {`Το σκορ σου είναι ${correctAnswers} στις ${totalQuestions} ερωτήσεις!`}
        </p>
      </div>
    );
  };

  if (!questions?.length || !currentQuestion) return null;

  const questionSelection = userSelections[currentQuestionIndex];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-auto max-h-[90vh] flex flex-col p-0 w-[90vw] sm:w-full sm:max-w-2xl">
        <DialogHeader className="p-4 sm:p-6 pb-2">
          <DialogTitle className="text-xl sm:text-2xl">{title}</DialogTitle>
        </DialogHeader>

        {showResult ? (
          renderResults()
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="px-4 sm:px-6 w-full">
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm text-slate-500 mt-2">
                Ερώτηση {currentQuestionIndex + 1} από {questions.length}
              </p>
            </div>
            <div className="flex-grow overflow-y-auto px-4 sm:px-6 py-4">
              <div className="flex justify-center items-center my-4 h-48 sm:h-72">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={`Question ${currentQuestionIndex + 1}`}
                    className="max-w-full max-h-full rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg" />
                )}
              </div>
              <h3 className="text-xl sm:text-2xl text-center my-6 font-semibold">
                {currentQuestion.question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {currentQuestion.answers.map((answer, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={!!questionSelection}
                    variant={getButtonVariant(answer, index)}
                    className={cn("h-auto py-3 text-base whitespace-normal", {
                      "bg-green-600 hover:bg-green-700 text-white":
                        getButton - variant(answer, index) === "default" &&
                        questionSelection,
                      "cursor-not-allowed": !!questionSelection,
                    })}
                  >
                    {answer}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="p-4 sm:p-6 border-t">
          {showResult ? (
            <Button onClick={onClose} className="w-full sm:w-auto">
              Κλείσιμο
            </Button>
          ) : (
            <div className="w-full flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Προηγούμενη</span>
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={!questionSelection}
              >
                <span className="hidden sm:inline">
                  {currentQuestionIndex === questions.length - 1
                    ? "Τέλος"
                    : "Επόμενη"}
                </span>
                <ChevronRight className="h-4 w-4 sm:ml-2" />
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
