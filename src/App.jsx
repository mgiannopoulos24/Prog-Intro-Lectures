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

function App() {
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
        {/* REPLACE the old Toaster with sonner's Toaster */}
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </>
  );
}

export default App;
