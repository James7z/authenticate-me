import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    useEffect(() => {
        let errors = [];
        if (email.length === 0) errors.push("Please provide email")
        if (firstName.length === 0) errors.push("Please provide first name")
        if (lastName.length === 0) errors.push("Please provide last name")
        if (username.length < 4) errors.push("username length must longer than 4 character");
        if (password.length < 6) errors.push("password length must longer than 6 character");
        if (password !== confirmPassword) errors.push("Confirm Password field must be the same as the Password field")
        setErrors(errors)
    }, [email, username, password, firstName, lastName, confirmPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="sign-up-form">
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>

                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                </label>
                <label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                    />
                </label>
                <label>

                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="First Name"
                    />
                </label>
                <label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Last Name"
                    />
                </label>
                <label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </label>
                <label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm Password"
                    />
                </label>
                <button type="submit" disabled={errors.length > 0}>Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
