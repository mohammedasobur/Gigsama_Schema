// ProjectPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProject, updateProject } from '../services/projectService';
import '../styles/ProjectPage.css';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedSchema, setEditedSchema] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetchProject(projectId);
        setProject(response.data);
        setEditedSchema(JSON.stringify(response.data.schema, null, 2));
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Failed to load project. It might not exist or you may not have access.');
        setLoading(false);
      }
    };

    getProject();
  }, [projectId]);

  const handleSaveChanges = async () => {
    try {
      let parsedSchema;
      try {
        parsedSchema = JSON.parse(editedSchema);
      } catch (err) {
        setError('Invalid JSON schema. Please check your format.');
        return;
      }

      setLoading(true);
      await updateProject(projectId, { schema: parsedSchema });
      
      // Update the project state with the new schema
      setProject({
        ...project,
        schema: parsedSchema
      });
      
      setEditMode(false);
      setLoading(false);
    } catch (err) {
      console.error('Failed to update project:', err);
      setError('Failed to save changes. Please try again.');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading project...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!project) return <div className="not-found">Project not found</div>;

  return (
    <div className="project-page">
      <div className="project-header">
        <div className="navigation">
          <Link to="/" className="back-link">← Back to Projects</Link>
        </div>
        <h1>{project.name}</h1>
        <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="schema-section">
        <div className="schema-header">
          <h2>Database Schema</h2>
          <button 
            onClick={() => setEditMode(!editMode)}
            className={editMode ? "cancel-btn" : "edit-btn"}
          >
            {editMode ? "Cancel" : "Edit Schema"}
          </button>
        </div>
        
        {editMode ? (
          <div className="schema-editor">
            <textarea
              value={editedSchema}
              onChange={(e) => setEditedSchema(e.target.value)}
              className="schema-textarea"
            />
            <button onClick={handleSaveChanges} className="save-btn" disabled={loading}>
              Save Changes
            </button>
          </div>
        ) : (
          <div className="schema-display">
            <pre>{JSON.stringify(project.schema, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="conversation-section">
        <h2>AI Conversation</h2>
        <div className="conversation-history">
          {project.conversation.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'assistant' ? 'ai-message' : 'user-message'}`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;