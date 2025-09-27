import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeContext.jsx";
import { Toaster } from "sonner";
import Homepage from "./pages/Homepage";
import Quizzes from "./pages/Quizzes";
import CodeChallenges from "./pages/CodeChallenges";
import CodeChallenge from "./pages/CodeChallenge";
import Labs from "./pages/Labs";
import Uoabot from "./pages/Uoabot";
import NewNavbar from "./components/layout/NewNavbar";
import Footer from "./components/layout/Footer";
import { useSecretCode } from "./hooks/useCode.js";
import Terminal from "./components/Terminal";

function App() {
  const [showTerminal, setShowTerminal] = useState(false);

  const toggleTerminal = () => {
    setShowTerminal((prev) => !prev);
  };
  useSecretCode(toggleTerminal);

  return (
    <>
      <ThemeProvider>
        <NewNavbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/codechallenges" element={<CodeChallenges />} />
            <Route
              path="/codechallenge/:challengeIndex"
              element={<CodeChallenge />}
            />
            <Route path="/labs" element={<Labs />} />
            <Route path="/uoabot" element={<Uoabot />} />
          </Routes>
        </BrowserRouter>
        <Footer />
        <Toaster richColors position="top-right" />
        {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
      </ThemeProvider>
    </>
  );
}

export default App;
