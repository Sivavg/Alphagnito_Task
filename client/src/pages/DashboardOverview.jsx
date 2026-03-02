import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { FiTrendingUp, FiEdit, FiPlus } from 'react-icons/fi';
import { Spinner, Modal, Button } from 'react-bootstrap';

const DashboardOverview = () => {
    const { user } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showViewModal, setShowViewModal] = useState(false);
    const [agentToView, setAgentToView] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCloseView = () => setShowViewModal(false);
    const handleShowView = (agent) => {
        setAgentToView(agent);
        setShowViewModal(true);
    };

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

    // Calculate dynamic stats
    const totalClients = agents.length;
    const totalProperties = agents.reduce((sum, agent) => sum + (agent.propertiesCount || 0), 0);
    const totalInspections = agents.reduce((sum, agent) => sum + (agent.inspectionsCount || 0), 0);
    const activeAgents = agents.filter(a => a.status === 'Active').length;
    const pendingInspections = Math.floor(totalInspections * 0.3); // just a logic calculation based on data since we don't have separate collections
    const closedInspections = Math.floor(totalInspections * 0.7); // logic calculation based on data

    // Dynamic recent activity based on original agents data
    const dynamicRecentActivity = agents.slice(0, 6).map((agent) => {
        return {
            id: `AGT - ${1000 + agent.id}`,
            property: agent.companyName || 'Independent',
            agent: agent.name,
            fullAgent: agent,
            inspector: agent.mobile || 'Wait for updates',
            status: agent.status,
            time: new Date(agent.updatedAt).toLocaleDateString(),
            action: agent.status === 'Active' ? 'View Report' : 'View'
        };
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return <span className="px-3 py-1 rounded-3" style={{ backgroundColor: '#fff4e5', color: '#ff9800', fontWeight: '500', fontSize: '0.85rem' }}>Pending</span>;
            case 'Assigned': return <span className="px-3 py-1 rounded-3" style={{ backgroundColor: '#e9eefa', color: '#3f51b5', fontWeight: '500', fontSize: '0.85rem' }}>Assigned</span>;
            case 'Active': return <span className="px-3 py-1 rounded-3" style={{ backgroundColor: '#e8f8ee', color: '#2ecc71', fontWeight: '500', fontSize: '0.85rem' }}>Active</span>;
            case 'Inactive': return <span className="px-3 py-1 rounded-3" style={{ backgroundColor: '#fff4e5', color: '#ff9800', fontWeight: '500', fontSize: '0.85rem' }}>Inactive</span>;
            case 'Suspended': return <span className="px-3 py-1 rounded-3" style={{ backgroundColor: '#fceceb', color: '#e74c3c', fontWeight: '500', fontSize: '0.85rem' }}>Suspended</span>;
            case 'Completed': return <span className="px-3 py-1 rounded-3" style={{ backgroundColor: '#e8f8ee', color: '#2ecc71', fontWeight: '500', fontSize: '0.85rem' }}>Completed</span>;
            case 'Closed': return <span className="px-3 py-1 rounded-3" style={{ backgroundColor: '#f5f5f5', color: '#9e9e9e', fontWeight: '500', fontSize: '0.85rem' }}>Closed</span>;
            case 'Cancelled': return <span className="px-3 py-1 rounded-3" style={{ backgroundColor: '#fceceb', color: '#e74c3c', fontWeight: '500', fontSize: '0.85rem' }}>Cancelled</span>;
            default: return <span>{status}</span>;
        }
    }

    return (
        <div className="dashboard-container">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            <div className="main-content">
                <Topbar
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    showSearch={true}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <div className="page-content" style={{ backgroundColor: '#f8f9fc', minHeight: 'calc(100vh - 100px)', padding: '45px 55px' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                        {/* Top Stats Cards */}
                        {loading ? (
                            <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>
                        ) : (
                            <div className="row g-3 mb-5">
                                <div className="col-12 col-sm-6 col-md col-lg">
                                    <div className="bg-white rounded-3 shadow-sm p-4 h-100 position-relative border border-light">
                                        <span className="text-muted d-block mb-3" style={{ fontSize: '0.95rem' }}>Total Clients / Agents</span>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h2 className="fw-bold mb-0 text-dark">{totalClients}</h2>
                                            <div className="d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', backgroundColor: '#e8f8ee', color: '#2ecc71', borderRadius: '10px' }}>
                                                <FiTrendingUp size={18} />
                                            </div>
                                        </div>
                                        <div style={{ height: '4px', backgroundColor: '#f5f5f5', width: '100%', borderRadius: '2px', marginTop: '25px' }}>
                                            <div style={{ height: '100%', backgroundColor: '#2ecc71', width: `${Math.min(100, (totalClients / 50) * 100)}%`, borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-md col-lg">
                                    <div className="bg-white rounded-3 shadow-sm p-4 h-100 position-relative border border-light">
                                        <span className="text-muted d-block mb-3" style={{ fontSize: '0.95rem' }}>Total Properties</span>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h2 className="fw-bold mb-0 text-dark">{totalProperties}</h2>
                                            <div className="d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', backgroundColor: '#e8f8ee', color: '#2ecc71', borderRadius: '10px' }}>
                                                <FiTrendingUp size={18} />
                                            </div>
                                        </div>
                                        <div style={{ height: '4px', backgroundColor: '#f5f5f5', width: '100%', borderRadius: '2px', marginTop: '25px' }}>
                                            <div style={{ height: '100%', backgroundColor: '#2ecc71', width: `${Math.min(100, (totalProperties / 100) * 100)}%`, borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-md col-lg">
                                    <div className="bg-white rounded-3 shadow-sm p-4 h-100 position-relative border border-light">
                                        <span className="text-muted d-block mb-3" style={{ fontSize: '0.95rem' }}>Total Inspections</span>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h2 className="fw-bold mb-0 text-dark">{totalInspections}</h2>
                                            <div className="d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', backgroundColor: '#fceceb', color: '#e74c3c', borderRadius: '10px' }}>
                                                <FiTrendingUp size={18} />
                                            </div>
                                        </div>
                                        <div style={{ height: '4px', backgroundColor: '#f5f5f5', width: '100%', borderRadius: '2px', marginTop: '25px' }}>
                                            <div style={{ height: '100%', backgroundColor: '#e74c3c', width: `${Math.min(100, (totalInspections / 50) * 100)}%`, borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-md col-lg">
                                    <div className="bg-white rounded-3 shadow-sm p-4 h-100 position-relative border border-light">
                                        <span className="text-muted d-block mb-3" style={{ fontSize: '0.95rem' }}>Pending Inspections</span>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h2 className="fw-bold mb-0 text-dark">{pendingInspections}</h2>
                                            <div className="d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', backgroundColor: '#fff4e5', color: '#ff9800', borderRadius: '10px' }}>
                                                <FiTrendingUp size={18} />
                                            </div>
                                        </div>
                                        <div style={{ height: '4px', backgroundColor: '#f5f5f5', width: '100%', borderRadius: '2px', marginTop: '25px' }}>
                                            <div style={{ height: '100%', backgroundColor: '#ff9800', width: `${Math.min(100, (pendingInspections / Math.max(1, totalInspections)) * 100)}%`, borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6 col-md col-lg">
                                    <div className="bg-white rounded-3 shadow-sm p-4 h-100 position-relative border border-light">
                                        <span className="text-muted d-block mb-3" style={{ fontSize: '0.95rem' }}>Closed Inspections</span>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h2 className="fw-bold mb-0 text-dark">{closedInspections}</h2>
                                            <div className="d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', backgroundColor: '#fff4e5', color: '#ff9800', borderRadius: '10px' }}>
                                                <FiTrendingUp size={18} />
                                            </div>
                                        </div>
                                        <div style={{ height: '4px', backgroundColor: '#f5f5f5', width: '100%', borderRadius: '2px', marginTop: '25px' }}>
                                            <div style={{ height: '100%', backgroundColor: '#ff9800', width: `${Math.min(100, (closedInspections / Math.max(1, totalInspections)) * 100)}%`, borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="mb-5">
                            <h6 className="fw-bold mb-3 d-block text-dark" style={{ fontSize: '1.05rem' }}>Quick actions</h6>
                            <div className="row g-3">
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="bg-white rounded-4 border border-light shadow-sm p-4 text-center cursor-pointer" style={{ transition: 'all 0.2s' }}>
                                        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-3 border" style={{ width: '55px', height: '55px', borderColor: '#e0e0e0', color: '#888' }}>
                                            <FiEdit size={22} />
                                        </div>
                                        <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Create Inspection</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="bg-white rounded-4 border border-light shadow-sm p-4 text-center cursor-pointer" style={{ transition: 'all 0.2s' }}>
                                        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-3 border" style={{ width: '55px', height: '55px', borderColor: '#e0e0e0', color: '#888' }}>
                                            <FiPlus size={22} />
                                        </div>
                                        <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Add Property</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="bg-white rounded-4 border border-light shadow-sm p-4 text-center cursor-pointer" style={{ transition: 'all 0.2s' }}>
                                        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-3 border" style={{ width: '55px', height: '55px', borderColor: '#e0e0e0', color: '#888' }}>
                                            <FiPlus size={22} />
                                        </div>
                                        <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Add Agent</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="bg-white rounded-4 border border-light shadow-sm p-4 text-center cursor-pointer" style={{ transition: 'all 0.2s' }}>
                                        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-3 border" style={{ width: '55px', height: '55px', borderColor: '#e0e0e0', color: '#888' }}>
                                            <FiPlus size={22} />
                                        </div>
                                        <span className="text-muted fw-medium" style={{ fontSize: '0.9rem' }}>Add Inspector</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <h6 className="fw-bold mb-3 d-block text-dark" style={{ fontSize: '1.05rem' }}>Recent Activity</h6>
                            <div className="table-custom-wrapper shadow-none border-0" style={{ backgroundColor: '#f4f6fa' }}>
                                <div className="table-responsive bg-white rounded-4 overflow-hidden border border-light shadow-sm">
                                    <table className="table-custom text-nowrap align-middle border-0 mb-0">
                                        <thead style={{ backgroundColor: '#f0f2f5' }}>
                                            <tr>
                                                <th className="border-0 bg-transparent text-muted py-3 ps-4 fw-semibold text-dark">Inspection ID</th>
                                                <th className="border-0 bg-transparent text-muted py-3 fw-semibold text-dark">Property</th>
                                                <th className="border-0 bg-transparent text-muted py-3 fw-semibold text-dark">Agent</th>
                                                <th className="border-0 bg-transparent text-muted py-3 fw-semibold text-dark">Inspector</th>
                                                <th className="border-0 bg-transparent text-muted py-3 fw-semibold text-dark text-center">Status</th>
                                                <th className="border-0 bg-transparent text-muted py-3 fw-semibold text-dark">Last Updated</th>
                                                <th className="border-0 bg-transparent text-muted py-3 text-end pe-4 fw-semibold text-dark">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dynamicRecentActivity.length > 0 ? dynamicRecentActivity.map((item, index) => (
                                                <tr key={index} className={index !== dynamicRecentActivity.length - 1 ? "border-bottom" : "border-0"} style={{ borderColor: '#f0f0f0' }}>
                                                    <td className="text-muted ps-4 py-3">{item.id}</td>
                                                    <td className="text-muted py-3">{item.property}</td>
                                                    <td className="text-muted py-3 fw-bold">{item.agent}</td>
                                                    <td className="text-muted py-3">{item.inspector}</td>
                                                    <td className="py-3 text-center">{getStatusBadge(item.status)}</td>
                                                    <td className="text-muted py-3"><small style={{ fontSize: '0.85rem' }}>{item.time}</small></td>
                                                    <td className="text-end pe-4 py-3">
                                                        <a href="#" onClick={(e) => { e.preventDefault(); handleShowView(item.fullAgent); }} className="text-decoration-none fw-medium" style={{ color: '#4277ff', fontSize: '0.85rem' }}>{item.action}</a>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center py-4 text-muted">No recent activity found. Add some agents!</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* View Agent Modal (Reused from Dashboard) */}
            <Modal show={showViewModal} onHide={handleCloseView} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold fs-5">Agent Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-2">
                    {agentToView && (
                        <div className="d-flex flex-column gap-3">
                            <div className="p-3 bg-light rounded-3 border">
                                <h6 className="fw-bold mb-1 text-primary">{agentToView.name}</h6>
                                <p className="text-muted small mb-0">{agentToView.companyName}</p>
                            </div>
                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="text-muted small mb-1">Status</div>
                                    <div className="fw-medium">{getStatusBadge(agentToView.status)}</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-muted small mb-1">Mobile</div>
                                    <div className="fw-medium">{agentToView.mobile}</div>
                                </div>
                                <div className="col-12">
                                    <div className="text-muted small mb-1">Email Address</div>
                                    <div className="fw-medium">{agentToView.email}</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-muted small mb-1">Properties</div>
                                    <div className="fw-bold text-success">{agentToView.propertiesCount || 0}</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-muted small mb-1">Inspections</div>
                                    <div className="fw-bold text-primary">{agentToView.inspectionsCount || 0}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button variant="light" className="w-100" onClick={handleCloseView}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DashboardOverview;
