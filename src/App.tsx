import React from 'react';
import './App.css';
import Home from './Page/index'
import {TopBar} from './Components/TopBar'

function App() {
  return (
    <div className="App">
      <TopBar/>
      <Home/>

    </div>
  );
}

export default App;
