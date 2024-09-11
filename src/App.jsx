import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Quizzes from './pages/Quizzes';
import ToggleSwitch from './components/buttons/ToggleSwitch';
import OnlineCompiler from './pages/OnlineCompiler';
import { ThemeProvider } from './components/buttons/ThemeContext';

function App() {
  return (
    <>
    <ThemeProvider>
    <ToggleSwitch />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/Quizzes' element={<Quizzes />} />
        <Route path='/OnlineCompiler' element={<OnlineCompiler />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </>
  );
}

export default App;
