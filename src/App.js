import './App.css';
import axios from "axios";
import BasicInfo from './components/BasicInfo/BasicInfo';
import MetricCalc from './components/MetricCalc/MetricCalc';
import Nutrition from './components/Nutrition/Nutrition';
import Nav from './components/Nav/Nav';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Conversions from './components/Conversions/Conversions';
import Home from './components/Home/Home';
import FoodList from './components/FoodList/FoodList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculations" element={<Conversions />} />
        <Route path="/addfood" element={<Nutrition />} />
        <Route path="/dailymeals" element={<FoodList />} />
      </Routes>
    </div>
  );
}

export default App;
