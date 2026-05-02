function AuthModal({
  isOpen,
  onClose,
  authMode,
  setAuthMode,
  loginData,
  registerData,
  handleLoginChange,
  handleRegisterChange,
  handleLogin,
  handleRegister,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="auth-card">
        <div className="form-header">
          <div>
            <p className="form-label">
              {authMode === "login" ? "Welcome back" : "Create account"}
            </p>
            <h2>{authMode === "login" ? "Login" : "Register"}</h2>
          </div>

          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="auth-tabs">
          <button
            className={authMode === "login" ? "active-tab" : ""}
            onClick={() => setAuthMode("login")}
          >
            Login
          </button>

          <button
            className={authMode === "register" ? "active-tab" : ""}
            onClick={() => setAuthMode("register")}
          >
            Register
          </button>
        </div>

        {authMode === "login" ? (
          <form className="product-form inner-form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <button className="submit-button">Login</button>
          </form>
        ) : (
          <form className="product-form inner-form" onSubmit={handleRegister}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />

            <button className="submit-button">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthModal;