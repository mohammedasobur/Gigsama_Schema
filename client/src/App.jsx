// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import NewProjectPage from './pages/NewProjectPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-project" element={<NewProjectPage />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;