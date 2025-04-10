import { useEffect, useState } from "react";

function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [formSubmit, setFormSubmit] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        
        if (username.trim() === '') {
            setUsernameError('Username is required.');
            hasError = true;
        } else if (username.trim().length < 8) {
            setUsernameError('Username must be at least 8 characters.');
            hasError = true;
        } else {
            setUsernameError('');
        }


        const anyInvalidPasswordRules = passwordErrors.some(err => !err.isValid);
        if (anyInvalidPasswordRules || password.trim() === '') {
            hasError = true;
        }

        if (hasError) return;


        try{
            const res = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    })
                })
            const result = await res.json();
                console.log(result)

            setToken(result.token);
            setFormSubmit(true);
            setTimeout(() => setFormSubmit(false), 3000);
            setUsername('');
            setPassword('');
            setPasswordTouched(false);
            setPasswordErrors([]);
            } catch (error) {
                setError(error.message)
            }
    }

    useEffect(() => {
        if (!passwordTouched) return;

        const checks = [];
            // Check for empty password first
        if (password.trim() === '') {
            setPasswordErrors([{ message: 'Password is required.', isValid: false }]);
            return; // Skip all other checks until they type something
        }

        // Only run these if password isn't empty
        checks.push({
            message: 'Password must be at least 8 characters.',
            isValid: password.length >= 8,
        });
        checks.push({
            message: 'Must include an uppercase letter.',
            isValid: /[A-Z]/.test(password),
        });
        checks.push({
            message: 'Must include a lowercase letter.',
            isValid: /[a-z]/.test(password),
        });
        checks.push({
            message: 'Must include a number.',
            isValid: /[0-9]/.test(password),
        });
        checks.push({
            message: 'Must include a special character.',
            isValid: /[^A-Za-z0-9]/.test(password),
        });
        
        setPasswordErrors(checks);
    }, [password, passwordTouched]);

    return (
        <>
        <div className='signup-container'>
            <h2>
                Sign Up For Cat Facts!
                {error && <p>{error}</p>}
            </h2>
                <br />
                <form className='form-container' onSubmit={handleSubmit} noValidate>
                    <label>
                        <h3>
                            Username
                            <br />
                        </h3>
                        <div id='username'>
                                <ul>
                                    <li>Username must be between 8 and 16 characters long</li>
                                </ul>
                        </div>
                            <input 
                                placeholder='Username'
                                value={username}
                                required minLength='8'
                                maxLength='16' 
                                onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <br />
                    {usernameError && (
                        <ul style={{ listStyle: 'none', color: 'darkred', marginTop: '4px', paddingLeft: '20px' }}>
                            <li>{usernameError}</li>
                        </ul>
                    )}

                    <label>
                        <h3>
                            Password
                        </h3>
                        <div id='password'>
                                <ul>
                                    <li>Password must be between 8 and 16 characters long</li>
                                    <li>Password must have a special character</li>
                                    <li>Password must have one capital letter</li>
                                    <li>Password must have one number</li>
                                </ul>
                        </div>
                            <input 
                                placeholder='Password'
                                value={password}
                                type='password'
                                required pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordTouched(true);
                                }} />
                    </label>
                    <br />
                    {passwordErrors.length > 0 && (
                        <ul style={{ listStyle: 'none', marginTop: '4px', paddingLeft: '20px' }}>
                        {passwordErrors.map((err, idx) => (
                            <li 
                            key={idx}
                            style={{
                                color: err.isValid ? 'green' : 'darkred',
                            }}
                            >
                                {err.message}
                            </li>
                        ))}
                        </ul>
                    )}
                    <br />
                    <button type='submit'>
                        Submit
                    </button>
                </form>
                {formSubmit && (
                    <ul style={{ color: 'green', listStyle: 'none', marginTop: '4px' }}>
                        <li>Signup Complete!</li>
                    </ul>
                )}
        </div>
        </>
    );
}

export default SignUpForm