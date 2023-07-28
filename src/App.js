import './App.css';
import axios from "axios";
import BasicInfo from './components/BasicInfo/BasicInfo';
import MetricCalc from './components/MetricCalc/MetricCalc';
import Nutrition from './components/Nutrition/Nutrition';

function App() {
  return (
    <div className="App">
      <div className="nutrition_calc">
        <BasicInfo />
        <MetricCalc />
      </div>
      <Nutrition />
    </div>
  );
}

export default App;
