// routes/projectRoutes.js
const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProject);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;