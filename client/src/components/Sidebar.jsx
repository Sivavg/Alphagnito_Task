import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiUsers, FiUserCheck, FiHome, FiClipboard, FiFileText, FiActivity, FiSettings } from 'react-icons/fi';
import { Offcanvas } from 'react-bootstrap';
import alphagnitoLogo from '../assets/alphagnito-logo.png';

const SidebarMenu = ({ onClick }) => (
    <ul className="sidebar-menu">
        <li>
            <NavLink to="/dashboard-overview" onClick={onClick} className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <FiGrid /> Dashboard
            </NavLink>
        </li>
        <li>
            <NavLink to="/agents" onClick={onClick} className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <FiUsers /> Agents
            </NavLink>
        </li>
        <li>
            <NavLink to="/inspectors" onClick={onClick} className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <FiUserCheck /> Inspectors
            </NavLink>
        </li>
        <li>
            <NavLink to="/properties" onClick={onClick} className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <FiHome /> Properties
            </NavLink>
        </li>
        <li>
            <NavLink to="/inspections" onClick={onClick} className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <FiClipboard /> Inspections
            </NavLink>
        </li>
        <li>
            <NavLink to="/reports" onClick={onClick} className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <FiFileText /> Reports
            </NavLink>
        </li>
        <li>
            <NavLink to="/audit-logs" onClick={onClick} className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <FiActivity /> Audit Logs
            </NavLink>
        </li>
        <li style={{ marginTop: 'auto', paddingTop: '40px' }}>
            <NavLink to="/settings" onClick={onClick} className={({ isActive }) => isActive ? "sidebar-menu-item active" : "sidebar-menu-item"}>
                <FiSettings /> Settings
            </NavLink>
        </li>
    </ul>
);

const Sidebar = ({ isOpen, closeSidebar }) => {
    return (
        <>
            {/* Desktop Sidebar */}
            <div className="sidebar d-none d-md-flex">
                <div className="sidebar-header d-flex align-items-center gap-3">
                    <img src={alphagnitoLogo} alt="Alphagnito" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                    <span className="text-white">Alphagnito</span>
                </div>
                <SidebarMenu />
            </div>

            {/* Mobile Sidebar via Offcanvas */}
            <Offcanvas show={isOpen} onHide={closeSidebar} placement="start" style={{ backgroundColor: 'var(--primary-dark)', color: 'white' }}>
                <Offcanvas.Header closeButton closeVariant="white" className="border-bottom border-secondary" style={{ padding: '25px 20px', borderBottomColor: 'rgba(255,255,255,0.05) !important' }}>
                    <Offcanvas.Title className="d-flex align-items-center gap-3 fw-bold" style={{ fontSize: '1.3rem' }}>
                        <img src={alphagnitoLogo} alt="Alphagnito" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                        <span className="text-white">Alphagnito</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    <SidebarMenu onClick={closeSidebar} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Sidebar;
