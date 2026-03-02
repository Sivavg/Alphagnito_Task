const Agent = require('../models/Agent');

const getAgents = async (req, res) => {
    try {
        const agents = await Agent.findAll();
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAgent = async (req, res) => {
    try {
        const { name, companyName, email, mobile, propertiesCount, inspectionsCount, status } = req.body;
        const agentExists = await Agent.findOne({ where: { email } });
        if (agentExists) {
            return res.status(400).json({ message: 'Agent already exists' });
        }
        const agent = await Agent.create({ name, companyName, email, mobile, propertiesCount, inspectionsCount, status });
        res.status(201).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAgent = async (req, res) => {
    try {
        const agent = await Agent.findByPk(req.params.id);
        if (agent) {
            agent.name = req.body.name || agent.name;
            agent.companyName = req.body.companyName !== undefined ? req.body.companyName : agent.companyName;
            agent.email = req.body.email || agent.email;
            agent.mobile = req.body.mobile || agent.mobile;
            agent.propertiesCount = req.body.propertiesCount !== undefined ? req.body.propertiesCount : agent.propertiesCount;
            agent.inspectionsCount = req.body.inspectionsCount !== undefined ? req.body.inspectionsCount : agent.inspectionsCount;
            agent.status = req.body.status || agent.status;
            const updatedAgent = await agent.save();
            res.json(updatedAgent);
        } else {
            res.status(404).json({ message: 'Agent not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findByPk(req.params.id);
        if (agent) {
            await agent.destroy();
            res.json({ message: 'Agent removed' });
        } else {
            res.status(404).json({ message: 'Agent not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAgents, createAgent, updateAgent, deleteAgent };
