import React, { useState } from "react";
import "./styles/Quizzes.css";
import CustomQuizCard from "../components/other/CustomQuizCard";
import BackButton from "../components/buttons/BackToMain";
import Footer from "../components/layout/Footer";
import kahoot_img from "../assets/kahoot.png";
import QuizDialog1 from "../components/dialogs/QuizDialog1";
import QuizDialog2 from "../components/dialogs/QuizDialog2";
import QuizDialog3 from "../components/dialogs/QuizDialog3";
import QuizDialog4 from "../components/dialogs/QuizDialog4";
import QuizDialog5 from "../components/dialogs/QuizDialog5";

const Quizzes = () => {
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [openDialog3, setOpenDialog3] = useState(false);
  const [openDialog4, setOpenDialog4] = useState(false);
  const [openDialog5, setOpenDialog5] = useState(false);

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
      </div>
      <Footer />
    </>
  );
};

export default Quizzes;
