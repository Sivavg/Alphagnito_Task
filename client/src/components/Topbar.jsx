import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiBell, FiLogOut, FiSearch } from 'react-icons/fi';

const Topbar = ({ toggleSidebar, showSearch, searchQuery, setSearchQuery }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="topbar d-flex justify-content-between align-items-center px-4">
            <div className="d-flex align-items-center flex-grow-1">
                <button className="btn d-md-none me-3" onClick={toggleSidebar}><FiMenu size={24} /></button>
                {showSearch && (
                    <div className="position-relative d-none d-md-block" style={{ width: '450px' }}>
                        <FiSearch className="position-absolute text-muted" style={{ top: '50%', transform: 'translateY(-50%)', left: '15px' }} size={18} />
                        <input
                            type="text"
                            value={searchQuery || ''}
                            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                            className="form-control border-0 shadow-none ps-5"
                            placeholder="Search agents, Inspectors etc"
                            style={{ borderRadius: '10px', height: '48px', backgroundColor: '#ffffff', fontSize: '0.9rem', width: '100%' }}
                        />
                    </div>
                )}
            </div>

            <div className="d-flex align-items-center gap-3">
                {/* Bell Icon Styling exactly as requested */}
                <div className="position-relative cursor-pointer bg-white d-flex justify-content-center align-items-center shadow-sm"
                    style={{ width: '48px', height: '48px', borderRadius: '12px' }}>
                    <FiBell size={22} color="#555555" />
                    <span className="position-absolute"
                        style={{ top: '10px', right: '12px', width: '9px', height: '9px', backgroundColor: '#2ecc71', borderRadius: '50%', border: '2px solid white' }}>
                    </span>
                </div>

                {/* User Card Styling exactly as requested */}
                <div className="d-flex align-items-center gap-2 bg-white px-2 py-1 pe-4 shadow-sm"
                    style={{ borderRadius: '30px' }}>
                    <div className="rounded-circle overflow-hidden shadow-sm d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px', backgroundColor: '#dde2ed', marginLeft: '2px' }}>
                        {/* Real random user image matching similar face style */}
                        <img src="https://i.pravatar.cc/150?img=60" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="d-flex flex-column justify-content-center text-start">
                        <div className="fw-semibold text-dark" style={{ fontSize: '0.95rem', lineHeight: '1.2' }}>{user?.name || 'Dinesh Karthick'}</div>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>Admin</div>
                    </div>
                </div>

                {/* Simplified invisible logout logic attached to topbar for admin demo */}
                <button className="btn btn-link text-muted p-0 ms-1" onClick={logout} title="Logout" style={{ textDecoration: 'none' }}>
                    <FiLogOut size={18} />
                </button>
            </div>
        </div>
    );
};

export default Topbar;
