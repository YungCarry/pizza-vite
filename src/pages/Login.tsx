import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../components/Navbar';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginEvent = () => {
        if (userName == 'admin' && password == '12345') {
            toast.success('Sikeres Bejelentkezés!', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            sessionStorage.setItem('userName', userName);
            sessionStorage.setItem('password', password);
            navigate('/');
        } else {
            toast.error('Hibás felhasználónév vagy jelszó!', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            setUserName('');
            setPassword('');
        }
    };

    return (
        <div data-testid="login-div">
            <CustomNavbar />
            <div className="container mt-5">
                <h1>Bejelentkezés</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Felhasználó név:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Felhasználó név"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Jelszó
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Jelszó"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={loginEvent}>
                        Jelentkezz be
                    </button>
                </form>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    );
};

export default Login;
