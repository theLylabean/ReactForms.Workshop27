import { useState } from "react";

function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            } catch (error) {
                setError(error.message)
            }
    }

    return (
        <>
        <div>
            <h2>
                Sign Up
                {error && <p>{error}</p>}
            </h2>
                <br />
                <form onSubmit={handleSubmit}>
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
                            value={username}
                            required minLength='8'
                            maxLength='16' 
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>

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
                            value={password}
                            type='password'
                            required pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$'
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <br />
                    <button>
                        Submit
                    </button>
                </form>
        </div>
        </>
    );
}

export default SignUpForm