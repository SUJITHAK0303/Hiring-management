
import { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // LOGIN FUNCTION
  const handleLogin = (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters');
      return;
    }

    setSuccess('Login form submitted successfully!');
  };

  // REGISTER FUNCTION
  const handleRegister = (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill all the fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSuccess('Registration form submitted successfully!');
  };

  // SWITCH BETWEEN LOGIN AND REGISTER
  const switchPage = (register) => {
    setIsRegister(register);

    setError('');
    setSuccess('');

    setEmail('');
    setPassword('');
    setFullName('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="login-page">

      {/* BACKGROUND CIRCLES */}
      <div className="bg-circle circle-one"></div>
      <div className="bg-circle circle-two"></div>
      <div className="bg-circle circle-three"></div>
      <div className="bg-circle circle-four"></div>

      {/* LOGIN CARD */}
      <div className={`login-card ${isRegister ? 'register-card' : ''}`}>

        {/* PROHIRE LOGO */}
        <div className="brand-logo">
          <span className="brand-pro">Pro</span>
          <span className="brand-hire">Hire</span>
        </div>

        {/* HEADER */}
        <div className="login-header">
          <h2>
            {isRegister ? 'Create Account' : 'Welcome'}
          </h2>

          <p>
            {isRegister
              ? 'Start your journey with us'
              : 'Login to continue your journey'}
          </p>
        </div>

        {/* REGISTER FORM */}
        {isRegister ? (

          <form onSubmit={handleRegister}>

            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">{error}</div>
            )}

            {success && (
              <div className="success-message">{success}</div>
            )}

            <button type="submit" className="login-button">
              CREATE ACCOUNT
            </button>

          </form>

        ) : (

          /* LOGIN FORM */
          <form onSubmit={handleLogin}>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="error-message">{error}</div>
            )}

            {success && (
              <div className="success-message">{success}</div>
            )}

            <button type="submit" className="login-button">
              Login
            </button>

          </form>

        )}

        {/* SWITCH LOGIN / REGISTER */}
        <div className="register-link">
          {isRegister ? (
            <>
              <span>Already have an account?</span>

              <button
                type="button"
                onClick={() => switchPage(false)}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <span>Don't have an account?</span>

              <button
                type="button"
                onClick={() => switchPage(true)}
              >
                + Create Account
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Login;
