import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import alphagnitoLogo from '../assets/alphagnito-logo.png';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        const res = await register(formData);
        if (res.success) {
            navigate('/login');
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-form" style={{ maxWidth: '450px' }}>
                    <h2 className="auth-box-title">Create Account</h2>
                    <p className="auth-box-subtitle">Join us and start managing agents</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 position-relative">
                            <label className="text-muted small bg-white px-1 position-absolute" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control form-control-custom"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4 position-relative">
                                <label className="text-muted small bg-white px-1 position-absolute" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-custom"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@gmail.com"
                                />
                            </div>
                            <div className="col-md-6 mb-4 position-relative">
                                <label className="text-muted small bg-white px-1 position-absolute" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control form-control-custom"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                        </div>

                        <div className="mb-4 position-relative">
                            <label className="text-muted small bg-white px-1 position-absolute" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="form-control form-control-custom"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="********"
                            />
                            <button
                                type="button"
                                className="btn btn-link position-absolute text-muted p-0"
                                style={{ right: '15px', top: '12px', textDecoration: 'none' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <div className="mb-3 position-relative">
                            <label className="text-muted small bg-white px-1 position-absolute" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                className="form-control form-control-custom"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="********"
                            />
                        </div>

                        {error && <div className="text-danger small mb-3">{error}</div>}

                        <button type="submit" className="btn btn-primary-custom mt-2" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : 'Register'}
                        </button>

                        <div className="text-center mt-3 small">
                            Already have an account? <Link to="/login" style={{ color: '#4277ff', textDecoration: 'none' }}>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-right-logo">
                    <img src={alphagnitoLogo} alt="Alphagnito" className="auth-logo-img" />
                </div>
            </div>
        </div>
    );
};

export default Register;
