import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => setShowModal(false))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <div className="signupform">
            <div className='login-top'>
                <i id="signupxmark" class="fa-solid fa-xmark" onClick={() => setShowModal(false)}> </i>
                <span className="useremailspan">Login</span>
            </div>
            <form onSubmit={handleSubmit} className='thisdaform'>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>

                    <input id="signupinput" placeholder="Username or Email" className='user-or-email'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>

                    <input id="signupinput" placeholder="Password" className='input-password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <div className="longinsignupdiv">
                    <button id="loginsignupbutton" type="submit" className='loginButton'>Login</button>
                </div>
                <div className="demo">
                    <button className="demo-button"
                        onClick={() =>
                            setCredential('demo@user.io')
                                (setPassword('password'))
                        }>Demo Log-In
                    </button>
                </div>
            </form >
        </div >
    );
}

export default LoginForm;
