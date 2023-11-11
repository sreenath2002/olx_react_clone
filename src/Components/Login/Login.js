import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseContext } from '../../Strore/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import firebaseApp from '../../Firebase/config';

const auth = getAuth(firebaseApp);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      setError('Fields cannot be blank or contain only spaces');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          setError('Invalid Username Or password');
        });

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label><br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter your email"
          /><br />

          <label htmlFor="lname">Password</label><br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter your password"
          /><br />

          {error && <div className="error">{error}</div>}

          <br />
          <button type="submit">Login</button>
        </form>
        <a href='/signup'> Signup</a>
      </div>
    </div>
  );
}

export default Login;
