// HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../services/projectService';
import '../styles/HomePage.css';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetchProjects();
        console.log("API Response:", response); // Log full response
        console.log("Response Data:", response.data); // Log response.data
  
        // Ensure projects is an array before setting state
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          setProjects([]); // Fallback to empty array
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setLoading(false);
      }
    };
  
    getProjects();
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Database Schema Creator</h1>
        <p>Create AI-powered database schemas for your projects</p>
        <Link to="/new-project" className="create-btn"> + New Project</Link>
      </div>
      
      <div className="projects-section">
        <h2>Your Projects</h2>
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <Link to={`/project/${project._id}`} className="project-card" key={project._id}
              >
                <h3>{project.name}</h3>
                <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p>No projects yet. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;