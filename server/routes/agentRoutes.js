const express = require('express');
const router = express.Router();
const { getAgents, createAgent, updateAgent, deleteAgent } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAgents).post(protect, createAgent);
router.route('/:id').put(protect, updateAgent).delete(protect, deleteAgent);

module.exports = router;
