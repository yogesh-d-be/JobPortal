import React from "react";
import {Routes, Route} from "react-router-dom"
import Register from "./components/register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
