import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiSearch } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const Agents = () => {
    const { user } = useContext(AuthContext);
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filtering States
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentAgent, setCurrentAgent] = useState({ name: '', companyName: '', email: '', mobile: '', propertiesCount: 0, inspectionsCount: 0, status: 'Active' });

    // Delete modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [agentToDelete, setAgentToDelete] = useState(null);

    // View Modal states
    const [showViewModal, setShowViewModal] = useState(false);
    const [agentToView, setAgentToView] = useState(null);

    // Sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchAgents = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/agents', config);
            setAgents(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching agents', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAgents();
        }
    }, [user]);

    const handleShowAdd = () => {
        setModalMode('add');
        setCurrentAgent({ name: '', companyName: '', email: '', mobile: '', propertiesCount: 0, inspectionsCount: 0, status: 'Active' });
        setShowModal(true);
    };

    const handleShowEdit = (agent) => {
        setModalMode('edit');
        setCurrentAgent(agent);
        setShowModal(true);
    };

    const handleShowView = (agent) => {
        setAgentToView(agent);
        setShowViewModal(true);
    };

    const handleSave = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            if (modalMode === 'add') {
                await axios.post('http://localhost:5000/api/agents', currentAgent, config);
            } else {
                await axios.put(`http://localhost:5000/api/agents/${currentAgent.id}`, currentAgent, config);
            }
            setShowModal(false);
            fetchAgents();
        } catch (error) {
            alert(error.response?.data?.message || 'Error saving agent');
        }
    };

    const confirmDelete = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/agents/${agentToDelete.id}`, config);
            setShowDeleteModal(false);
            fetchAgents();
        } catch (error) {
            alert('Error deleting agent');
        }
    };

    // Filter Agents List based on Status Dropdown and Search Input
    const filteredAgents = agents.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All' ? true : agent.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="dashboard-container">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            <div className="main-content">
                <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                <div className="page-content">
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                        <div className="position-relative">
                            <FiSearch className="position-absolute text-muted" style={{ top: '12px', left: '15px' }} />
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Search agents by name or email"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <Form.Select
                                className="form-control"
                                style={{ padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', maxWidth: '160px', border: '1px solid var(--neutral-4)' }}
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                            </Form.Select>

                            <button className="btn btn-primary-custom d-flex align-items-center justify-content-center gap-2 text-nowrap" style={{ width: 'auto', padding: '8px 16px' }} onClick={handleShowAdd}>
                                <FiPlus size={18} /> Add Agents
                            </button>
                        </div>
                    </div>

                    <div className="table-custom-wrapper">
                        {loading ? (
                            <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
                        ) : filteredAgents.length === 0 ? (
                            <div className="text-center p-5 text-muted">
                                {agents.length === 0 ? "No agents found. Start by adding one!" : "No agents matched your criteria."}
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table-custom text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Agent Name</th>
                                            <th>Company Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Properties</th>
                                            <th>Inspections</th>
                                            <th>Status</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAgents.map((agent) => (
                                            <tr key={agent.id}>
                                                <td className="fw-semibold text-dark">{agent.name}</td>
                                                <td className="text-muted">{agent.companyName || 'Independent'}</td>
                                                <td className="text-muted">{agent.email}</td>
                                                <td className="text-muted">{agent.mobile}</td>
                                                <td className="text-muted">{agent.propertiesCount || 0}</td>
                                                <td className="text-muted">{agent.inspectionsCount || 0}</td>
                                                <td>
                                                    <span className={
                                                        agent.status === 'Active' ? 'badge-active' :
                                                            agent.status === 'Inactive' ? 'badge-inactive' :
                                                                'badge-suspended'
                                                    }>
                                                        {agent.status}
                                                    </span>
                                                </td>
                                                <td className="text-end text-nowrap">
                                                    <button className="action-btn view" onClick={() => handleShowView(agent)} title="View"><FiEye size={15} /></button>
                                                    <button className="action-btn edit" onClick={() => handleShowEdit(agent)} title="Edit"><FiEdit2 size={15} /></button>
                                                    <button className="action-btn delete" onClick={() => { setAgentToDelete(agent); setShowDeleteModal(true); }} title="Delete"><FiTrash2 size={15} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold h5">{modalMode === 'add' ? 'Add New Agent' : 'Edit Agent'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3 position-relative">
                                    <Form.Label className="text-muted small position-absolute bg-white px-1" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Agent Name</Form.Label>
                                    <Form.Control type="text" className="form-control-custom" value={currentAgent.name} onChange={(e) => setCurrentAgent({ ...currentAgent, name: e.target.value })} />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3 position-relative">
                                    <Form.Label className="text-muted small position-absolute bg-white px-1" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Company Name</Form.Label>
                                    <Form.Control type="text" className="form-control-custom" value={currentAgent.companyName} onChange={(e) => setCurrentAgent({ ...currentAgent, companyName: e.target.value })} />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3 position-relative">
                                    <Form.Label className="text-muted small position-absolute bg-white px-1" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Email ID</Form.Label>
                                    <Form.Control type="email" className="form-control-custom" value={currentAgent.email} onChange={(e) => setCurrentAgent({ ...currentAgent, email: e.target.value })} />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3 position-relative">
                                    <Form.Label className="text-muted small position-absolute bg-white px-1" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Mobile Number</Form.Label>
                                    <Form.Control type="text" className="form-control-custom" value={currentAgent.mobile} onChange={(e) => setCurrentAgent({ ...currentAgent, mobile: e.target.value })} />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group className="mb-3 position-relative">
                                    <Form.Label className="text-muted small position-absolute bg-white px-1" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Properties Count</Form.Label>
                                    <Form.Control type="number" className="form-control-custom" value={currentAgent.propertiesCount} onChange={(e) => setCurrentAgent({ ...currentAgent, propertiesCount: Number(e.target.value) })} />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3 position-relative">
                                    <Form.Label className="text-muted small position-absolute bg-white px-1" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Inspections Count</Form.Label>
                                    <Form.Control type="number" className="form-control-custom" value={currentAgent.inspectionsCount} onChange={(e) => setCurrentAgent({ ...currentAgent, inspectionsCount: Number(e.target.value) })} />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-4 position-relative">
                                    <Form.Label className="text-muted small position-absolute bg-white px-1" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Status</Form.Label>
                                    <Form.Select className="form-control-custom pb-2 pt-2" value={currentAgent.status} onChange={(e) => setCurrentAgent({ ...currentAgent, status: e.target.value })}>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Suspended">Suspended</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button variant="light" onClick={() => setShowModal(false)} style={{ borderRadius: '8px' }}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave} style={{ backgroundColor: 'var(--primary-3)', borderColor: 'var(--primary-3)', borderRadius: '8px' }}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered size="sm">
                <Modal.Body className="text-center p-4">
                    <div className="mb-3 text-danger"><FiTrash2 size={40} /></div>
                    <h5 className="fw-bold">Delete Agent?</h5>
                    <p className="text-muted small mb-4">Are you sure you want to delete {agentToDelete?.name}? This action cannot be undone.</p>
                    <div className="d-flex gap-2 justify-content-center">
                        <Button variant="light" onClick={() => setShowDeleteModal(false)} className="px-4" style={{ borderRadius: '8px' }}>Cancel</Button>
                        <Button variant="danger" onClick={confirmDelete} className="px-4" style={{ borderRadius: '8px' }}>Delete</Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* View Modal */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered size="md">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold h5">Agent Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-2">
                    {agentToView && (
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-3 mb-3 border-bottom pb-3 mt-3">
                                <div className="rounded-circle bg-light d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px', color: 'var(--primary-3)', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                    {agentToView.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h5 className="mb-1 fw-bold text-dark">{agentToView.name}</h5>
                                    <span className="text-muted d-block">{agentToView.companyName || 'Independent'}</span>
                                    <span className={
                                        `mt-1 d-inline-block ${agentToView.status === 'Active' ? 'badge-active' :
                                            agentToView.status === 'Inactive' ? 'badge-inactive' : 'badge-suspended'}`
                                    }>
                                        {agentToView.status}
                                    </span>
                                </div>
                            </div>
                            <div className="row g-4 px-2">
                                <div className="col-6">
                                    <small className="text-muted d-block mb-1">Email</small>
                                    <span className="fw-medium text-dark">{agentToView.email}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block mb-1">Phone</small>
                                    <span className="fw-medium text-dark">{agentToView.mobile}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block mb-1">Properties Count</small>
                                    <span className="fw-medium text-dark">{agentToView.propertiesCount || 0}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block mb-1">Inspections Count</small>
                                    <span className="fw-medium text-dark">{agentToView.inspectionsCount || 0}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button variant="light" onClick={() => setShowViewModal(false)} style={{ borderRadius: '8px', width: '100%' }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Agents;
