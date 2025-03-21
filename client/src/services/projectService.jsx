// projectService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; 

export const fetchProjects = () => {
  return axios.get(`${API_URL}/projects`);
};

export const fetchProject = (projectId) => {
  return axios.get(`${API_URL}/projects/${projectId}`);
};

export const createProject = (projectData) => {
  return axios.post(`${API_URL}/projects`, projectData);
};

export const updateProject = (projectId, projectData) => {
  return axios.put(`${API_URL}/projects/${projectId}`, projectData);
};

export const generateSchema = async (conversationData) => {
  try {
    const response = await axios.post(`${API_URL}/generate-schema`, conversationData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
