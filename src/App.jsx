import { useState } from 'react';
import './App.css';
import SignUpForm from './components/SignUpForm';
import Authenticate from './components/Authenticate';
import './signupForm.css';
import './authenticate.css';

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
        <SignUpForm token={token} setToken={setToken} />
        <Authenticate token={token} setToken={setToken} />
    </>
  )
}

export default App
