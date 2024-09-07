import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Quizzes from './pages/Quizzes';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/Quizzes' element={<Quizzes />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
