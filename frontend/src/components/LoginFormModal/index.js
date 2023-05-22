import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    useEffect(() => {
        let errors = [];
        if (credential.length < 4) errors.push("credential length must longer than 4 character");
        if (password.length < 6) errors.push("password length must longer than 6 character");
        setErrors(errors)
    }, [credential, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    const handleSubmitDemo = (e) => {
        setErrors([]);
        return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );

    };

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className="log-in-form">
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>

                    <input
                        type="text"
                        value={credential}
                        placeholder="Username or Email"
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>

                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={errors.length > 0}>Log In</button>
            </form>
            <div className="demo-user-login-container">
                <button type="button" onClick={handleSubmitDemo} >Log In as Demo User</button>
            </div>
        </>
    );
}

export default LoginFormModal;
