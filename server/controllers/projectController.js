// controllers/projectController.js
const Project = require('../models/projectModel');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { name, conversation, schema } = req.body;
    
    if (!name || !schema) {
      return res.status(400).json({ message: 'Name and schema are required' });
    }
    
    const newProject = new Project({
      name,
      conversation: conversation || [],
      schema
    });
    
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { schema } = req.body;
    
    if (!schema) {
      return res.status(400).json({ message: 'Schema is required' });
    }
    
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { schema, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};