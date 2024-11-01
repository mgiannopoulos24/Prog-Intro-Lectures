import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Quizzes from './pages/Quizzes';
import ToggleSwitch from './components/buttons/ToggleSwitch';
import CodeChallenges from './pages/CodeChallenges'
import { ThemeProvider } from './components/buttons/ThemeContext';
import CodeChallenge from './pages/CodeChallenge';
import NewNavbar from './components/layout/NewNavbar';

function App() {
  return (
    <>
    <ThemeProvider>
    <NewNavbar />
    <ToggleSwitch />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/Quizzes' element={<Quizzes />} />
        <Route path='/CodeChallenges' element={<CodeChallenges />} />
        <Route path='/CodeChallenge/:challengeIndex' element={<CodeChallenge />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </>
  );
}

export default App;
