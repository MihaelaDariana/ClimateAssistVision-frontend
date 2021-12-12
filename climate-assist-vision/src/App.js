import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import FavouritesLocations from './pages/FavoritesLocations';

function App() {
  return (
    <Router>
    <div className="App">
       <Routes>
            <Route exact path="/" element={<Dashboard/>}/>
            <Route path="/favorites" element={<FavouritesLocations/>}/>
       </Routes>
    </div>
    </Router>
  );
}

export default App;
