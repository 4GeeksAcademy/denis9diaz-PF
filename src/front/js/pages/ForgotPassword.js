import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + "/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            if (!resp.ok) {
                throw new Error("Error al restablecer contraseña.");
            }

            setMessage("Hemos enviado un link a tu correo. Entra para restablecer tu contraseña.");
        } catch (error) {
            console.error(error);
            setError("Error al restablecer contraseña.");
        }
    };

    return (
        <div className="auth-container mt-5">
            <div className="container form-body">
                <h1 className="title">Forgot Password</h1>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        className="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                <button type="button" className="btn btn-primary btn-block" onClick={handleSubmit}>
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
