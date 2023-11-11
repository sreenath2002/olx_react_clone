import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Strore/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebaseApp from '../../Firebase/config';
import { getFirestore, collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';

var auth = getAuth(firebaseApp);

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const db = getFirestore(firebase);
  const postRef = collection(db, 'users');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !phone || !password) {
      setMessage('All fields are required');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setMessage('Invalid phone number');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
        photoURL: null
      });

      await addDoc(postRef, {
        id: user.uid,
        username: username,
        phone: phone
      });

      setMessage('Registered Successfully');
      setTimeout(() => {
        setMessage('');
        navigate("/login");
      }, 3000); 

    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label><br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            name="username"
            placeholder="Enter your username"
          /><br />

          <label htmlFor="email">Email</label><br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="Enter your email"
          /><br />

          <label htmlFor="phone">Phone</label><br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          /><br />

          <label htmlFor="password">Password</label><br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="Enter your password"
          /><br />

          <br />
          <button type="submit">Signup</button>
        </form>
        <a href='/login'>Login</a>
      </div>
    </div>
  );
}

