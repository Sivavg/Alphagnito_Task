import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import alphagnitoLogo from '../assets/alphagnito-logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Please fill all fields correctly');
            setLoading(false);
            return;
        }

        const res = await login(email, password);
        if (res.success) {
            navigate('/dashboard-overview');
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-form">
                    <h2 className="auth-box-title">Welcome to Alphagnito</h2>
                    <p className="auth-box-subtitle">Sign in to your account</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 position-relative">
                            <label className="text-muted small bg-white px-1 position-absolute" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Email address</label>
                            <input
                                type="email"
                                className={`form-control form-control-custom ${error ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@gmail.com"
                            />
                        </div>

                        <div className="mb-2 position-relative">
                            <label className="text-muted small bg-white px-1 position-absolute" style={{ top: '-10px', left: '10px', zIndex: 10 }}>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control form-control-custom ${error ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        {error && <div className="text-danger small mb-3">{error}</div>}

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="remember" />
                                <label className="form-check-label small text-muted" htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#" className="small" style={{ color: '#4277ff', textDecoration: 'none' }}>Forgot password?</a>
                        </div>

                        <button type="submit" className="btn btn-primary-custom" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : 'Login'}
                        </button>

                        <div className="text-center mt-3 small">
                            Don't have an account? <Link to="/register" style={{ color: '#4277ff', textDecoration: 'none' }}>Register</Link>
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

export default Login;
