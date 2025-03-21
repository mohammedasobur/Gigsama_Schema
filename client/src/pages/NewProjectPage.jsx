// NewProjectPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject, generateSchema } from '../services/projectService';
import '../styles/NewProjectPage.css';

const NewProjectPage = () => {
  const [projectName, setProjectName] = useState('');
  const [conversation, setConversation] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [schema, setSchema] = useState(null);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Start conversation with AI
  useEffect(() => {
    const startConversation = async () => {
      setLoading(true);
      try {
        const response = await generateSchema({ 
          message: "Start a new database schema project",
          conversation: [],
          completed: false
        });
        
        setCurrentQuestion(response.data.message);
        setConversation([{ role: 'assistant', content: response.data.message }]);
        setLoading(false);
      } catch (err) {
        console.error('Failed to start conversation:', err);
        setError('Failed to connect to AI. Please try again.');
        setLoading(false);
      }
    };

    startConversation();
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!userResponse.trim() || loading) return;

    // Add user response to conversation
    const updatedConversation = [
      ...conversation, 
      { role: 'user', content: userResponse }
    ];
    setConversation(updatedConversation);
    setUserResponse('');
    setLoading(true);

    try {
      const response = await generateSchema({
        message: userResponse,
        conversation: updatedConversation,
        completed: false
      });

      // Check if schema generation is complete
      if (response.data.completed) {
        setCompleted(true);
        setSchema(response.data.schema);
      } else {
        setCurrentQuestion(response.data.message);
        setConversation([
          ...updatedConversation,
          { role: 'assistant', content: response.data.message }
        ]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to process response:', err);
      setError('Failed to process your response. Please try again.');
      setLoading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!projectName.trim() || !schema) return;
    
    try {
      setLoading(true);
      const response = await createProject({
        name: projectName,
        conversation,
        schema
      });
      
      // Navigate to the project page
      navigate(`/project/${response.data._id}`);
    } catch (err) {
      console.error('Failed to save project:', err);
      setError('Failed to save your project. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="new-project-container">
      <h1>Create New Database Schema</h1>
      
      {!completed ? (
        <>
          <div className="chat-container">
            {conversation.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.role === 'assistant' ? 'ai-message' : 'user-message'}`}
              >
                {message.content}
              </div>
            ))}
            {loading && <div className="message ai-message">Thinking...</div>}
            <div ref={chatEndRef} />
          </div>
          
          <form onSubmit={handleSubmitResponse} className="response-form">
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Type your response..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !userResponse.trim()}>
              Send
            </button>
          </form>
        </>
      ) : (
        <div className="schema-result">
          <h2>Your Database Schema</h2>
          <div className="schema-container">
            <pre>{JSON.stringify(schema, null, 2)}</pre>
          </div>
          
          <div className="save-project-form">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
            <button onClick={handleSaveProject} disabled={!projectName.trim() || loading}>
              Save Project
            </button>
          </div>
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default NewProjectPage;