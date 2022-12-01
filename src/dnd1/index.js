import React, { Component } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import ListTools from './listTools';
import Container from './container';
import './style.css';

const App = () => (
  <DndProvider backend={HTML5Backend}>
    <div className="app-wrapper">
      <ListTools />
      <Container />
    </div>
  </DndProvider>
);


export default App; 
