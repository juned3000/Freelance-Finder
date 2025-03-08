import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setAuthType }) => {
  const { setUsername, setEmail, setPassword, setUsertype, register } = useContext(GeneralContext);
  const [errorMessage, setErrorMessage] = useState(null); // For displaying error messages

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Clear any previous error messages

    // Input validation (basic check)
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const usertype = e.target.usertype.value;

    if (!username || !email || !password || !usertype) {
      setErrorMessage('All fields are required!');
      return;
    }

    try {
      await register(username, email, password, usertype); // Pass the values to the register function

      // Registration successful
      setErrorMessage('Registration successful! You can now log in.');
    } catch (error) {
      console.error('Registration error:', error);

      // Detailed error handling based on error type
      if (error.response) {
        // Axios error response from the backend
        setErrorMessage(`Registration failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage('No response from the server. Please try again later.');
      } else {
        // Something went wrong in setting up the request
        setErrorMessage(`Registration failed: ${error.message}`);
      }
    }
  };

  return (
    <form className="authForm" onSubmit={handleRegister}>
      <h2>Register</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
      <div className="form-floating mb-3 authFormInputs">
        <input 
          type="text" 
          className="form-control" 
          id="floatingInput" 
          placeholder="username" 
          name="username" // Add name attribute for form data
          onChange={(e) => setUsername(e.target.value)} 
        />
        <label htmlFor="floatingInput">Username</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input 
          type="email" 
          className="form-control" 
          id="floatingEmail" 
          placeholder="name@example.com" 
          name="email" // Add name attribute for form data
          onChange={(e) => setEmail(e.target.value)} 
        />
        <label htmlFor="floatingEmail">Email address</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input 
          type="password" 
          className="form-control" 
          id="floatingPassword" 
          placeholder="Password" 
          name="password" // Add name attribute for form data
          onChange={(e) => setPassword(e.target.value)} 
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <select 
        className="form-select form-select-lg mb-3" 
        aria-label=".form-select-lg example" 
        name="usertype" // Add name attribute for form data
        onChange={(e) => setUsertype(e.target.value)} 
      >
        <option value="">Select User Type</option>
        <option value="freelancer">Freelancer</option>
        <option value="client">Client</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
      <p>
        Already registered? <span onClick={() => setAuthType('login')}>Login</span>
      </p>
    </form>
  );
};

export default Register;
