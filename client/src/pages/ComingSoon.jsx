import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { FiClock } from 'react-icons/fi';

const ComingSoon = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="dashboard-container">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            <div className="main-content">
                <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                <div className="page-content d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 70px)' }}>
                    <div className="text-center p-5 rounded-4 bg-white shadow-sm border border-light" style={{ maxWidth: '500px' }}>
                        <div className="mb-4 text-primary" style={{ fontSize: '4rem', opacity: 0.8 }}>
                            <FiClock color="var(--primary-3)" />
                        </div>
                        <h3 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)' }}>Feature Coming Soon</h3>
                        <p className="text-muted mb-0">
                            We are currently working hard to bring this feature to you.
                            Stay tuned for our next update!
                        </p>
                        <div className="mt-4 pt-4 border-top">
                            <span className="badge" style={{ backgroundColor: 'var(--accent-info)', padding: '8px 15px', fontSize: '0.9rem' }}>
                                <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true" style={{ width: '10px', height: '10px' }}></span>
                                In Development
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
