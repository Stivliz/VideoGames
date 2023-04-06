import './App.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/Landing';
import Home from './Components/HomePage/Home/Home';
import GameDetail from './Components/GameDetail/GameDetail';

axios.defaults.baseURL = "http://localhost:3001"

function App() {
  return (
    <Routes>
      <Route  default path='/' element={<LandingPage />} />
      <Route path='/videogames' element={<Home />} />
      <Route path='/videogames/:id' element={<GameDetail />}/> 
    </Routes>
  );
}

export default App;
