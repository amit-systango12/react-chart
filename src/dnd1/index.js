import React, { useRef } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import ListTools from './listTools';
import Container from './container';
import './style.css';

const App = () => {
  const childRef = useRef(null);
  const childRef2 = useRef(null);

return(
  <DndProvider backend={HTML5Backend}>
    <button onClick={() => childRef.current()} style={{margin: "10px",marginRight: "70%"}}>Save Data</button>
    <button onClick={() => childRef2.current()} style={{margin: "10px",marginRight: "70%"}}>Load Last Saved Data</button>

    <div className="app-wrapper">
      <ListTools />
      <Container childRef={childRef} childRef2={childRef2} />
    </div>
  </DndProvider>
);
}


export default App; 
