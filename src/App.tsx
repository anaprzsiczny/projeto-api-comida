import React from 'react';
import './App.css';

import Beer from './components/beer/beer'
import Food from './components/food/food'

function App() {
  return (
    <div className="App">
      <Food />
      <Beer />
    </div>
  );
}


export default App;