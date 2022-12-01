import { useState } from "react";
import './App.css';
// import BarChart from './charts/barChart';
// import PieChart from './charts/pieChart';
// import GraphForce from './charts/graphForce';
import DndAppProvider from './dnd/provider';
import Playground from './dnd/kitcore';
import Dnd1 from './dnd1';

const App = () => {
  const [options, setOptions] = useState(1);

  return (
    <div className="App">
      <Dnd1 />
      {/* <DndAppProvider/> */}
      {/* <div className="options">
        <h3 onClick={() => setOptions(1)}>Pie Chart</h3>
        <h3 onClick={() => setOptions(2)}>Bar Chart</h3>
        <h3 onClick={() => setOptions(3)}>Graph Force Chart</h3>
      </div>
      {options === 1 && <PieChart />}
      {options === 2 && <BarChart />}
      {options === 3 && <GraphForce />} */}
    </div>
  );
}

export default App;
