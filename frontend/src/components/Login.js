import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/noteContext/noteContext';
import '../Styles/Login.css';

const Login = () => {
    const { loginUser, sendAlert } = useContext(noteContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(data.email, data.password);
            sendAlert('Login Successfully', 'success');
            navigate('/');
        } catch (err) {
            sendAlert('Something Went Wrong!!!', 'danger');
        }
    };

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h1 className="login-header">Login To iNotebook To Access Your Note</h1>
            <form onSubmit={handleSubmit} className="login-row">
                <div className="login-row">
                    <label className="login-label" htmlFor="loginEmail">
                        Email address
                    </label>
                    <input
                        className="login-input"
                        name="email"
                        value={data.email}
                        onChange={onChange}
                        type="email"
                        id="loginEmail"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="login-row">
                    <label className="login-label" htmlFor="loginPassword">
                        Password
                    </label>
                    <input
                        name="password"
                        value={data.password}
                        onChange={onChange}
                        type="password"
                        className="login-input"
                        id="loginPassword"
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </>
    );
}

export default Login;
