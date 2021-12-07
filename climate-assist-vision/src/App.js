import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
    <div className="App">
       <Routes>
            <Route exact path="/" component={Dashboard} />
       </Routes>
    </div>
    </Router>
  );
}

export default App;
