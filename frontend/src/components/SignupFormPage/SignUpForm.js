import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUpForm.css';

function SignupFormPage({ setShowSignupModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")


    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([])
            return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
                .then(() => setShowSignupModal(false))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
        }

        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="signupcontainer">
            <div className='signuptop'>
                <i id="signupxmark" class="fa-solid fa-xmark" onClick={() => setShowSignupModal(false)}> </i>

                <span className="signupspan">Signup</span>
            </div>
            <form onSubmit={handleSubmit} className='signup-modal-form'>
                <ul>
                    <div className='signup-errors'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </div>  </ul>
                <label>
                    <input className="signupinput" placeholder="First Name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>

                    <input className="signupinput" placeholder="Last Name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>

                    <input className="signupinput" placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>

                    <input className="signupinput" placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>

                    <input className="signupinput" placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>

                    <input className="signupinput" placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <div>
                    <button className="signupbutton" type="submit">Sign Up</button>
                </div>
            </form>

        </div>
    );
}

export default SignupFormPage;
