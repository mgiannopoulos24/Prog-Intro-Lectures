import React, { useState } from "react";
import "./styles/Quizzes.css";
import CustomQuizCard from "../components/other/CustomQuizCard";
import kahoot_img from "../assets/kahoot.png";
import QuizDialog1 from "../components/dialogs/QuizDialog1";
import QuizDialog2 from "../components/dialogs/QuizDialog2";
import QuizDialog3 from "../components/dialogs/QuizDialog3";
import QuizDialog4 from "../components/dialogs/QuizDialog4";
import QuizDialog5 from "../components/dialogs/QuizDialog5";
import QuizDialog6 from "../components/dialogs/QuizDialog6";
import QuizDialog7 from "../components/dialogs/QuizDialog7";
import QuizDialog8 from "../components/dialogs/QuizDialog8";

const Quizzes = () => {
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [openDialog3, setOpenDialog3] = useState(false);
  const [openDialog4, setOpenDialog4] = useState(false);
  const [openDialog5, setOpenDialog5] = useState(false);
  const [openDialog6, setOpenDialog6] = useState(false);
  const [openDialog7, setOpenDialog7] = useState(false);
  const [openDialog8, setOpenDialog8] = useState(false);

  return (
    <>
      <div className="Quizzes container mt-5">
        <div className="text-center">
          <h1>Kahoot Quizzes</h1>
          <h3>Time for some fun!</h3>
          <hr className="my-4" />
        </div>
      </div>
      <div className="cards d-flex justify-content-center flex-wrap gap-3">
        <CustomQuizCard
          image={kahoot_img}
          title="Διάλεξη #0"
          description="Καλημέρα Κόσμε!"
          onClick={() => setOpenDialog1(true)}
          buttonText="Play"
        />
        <QuizDialog1 open={openDialog1} onClose={() => setOpenDialog1(false)} />
        <CustomQuizCard
          image={kahoot_img}
          title="Διάλεξη #1"
          description="Η Γραμμή Εντολών"
          onClick={() => setOpenDialog2(true)}
          buttonText="Play"
        />
        <QuizDialog2 open={openDialog2} onClose={() => setOpenDialog2(false)} />
        <CustomQuizCard
          image={kahoot_img}
          title="Διάλεξη #2"
          description="Μνήμη και Μεταβλητές"
          onClick={() => setOpenDialog3(true)}
          buttonText="Play"
        />
        <QuizDialog3 open={openDialog3} onClose={() => setOpenDialog3(false)} />
        <CustomQuizCard
          image={kahoot_img}
          title="Διάλεξη #3"
          description="Συναρτήσεις"
          onClick={() => setOpenDialog4(true)}
          buttonText="Play"
        />
        <QuizDialog4 open={openDialog4} onClose={() => setOpenDialog4(false)} />
        <CustomQuizCard
          image={kahoot_img}
          title="Διάλεξη #4"
          description="Git και Τελεστές"
          onClick={() => setOpenDialog5(true)}
          buttonText="Play"
        />
        <QuizDialog5 open={openDialog5} onClose={() => setOpenDialog5(false)} />
        <CustomQuizCard
          image={kahoot_img}
          title="Διάλεξη #6"
          description="Τελεστές, Εντολές και Ροή Ελέγχου"
          onClick={() => setOpenDialog6(true)}
          buttonText="Play"
        />
        <QuizDialog6 open={openDialog6} onClose={() => setOpenDialog6(false)} />
        <CustomQuizCard
          image={kahoot_img}
          title="Διάλεξη #7"
          description="Επίλυση Προβλημάτων"
          onClick={() => setOpenDialog7(true)}
          buttonText="Play"
        />
        <QuizDialog7 open={openDialog7} onClose={() => setOpenDialog7(false)} />
        <CustomQuizCard
          image={kahoot_img}
          title="Διάλεξη #8"
          description="Ροή Ελέγχου #2"
          onClick={() => setOpenDialog8(true)}
          buttonText="Play"
        />
        <QuizDialog8 open={openDialog8} onClose={() => setOpenDialog8(false)} />
      </div>
    </>
  );
};

export default Quizzes;
