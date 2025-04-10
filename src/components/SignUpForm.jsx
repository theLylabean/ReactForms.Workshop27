import { useState } from "react";

function SignUpForm() {
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

            handleSubmit();
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
                            Username:&nbsp;
                        </h3>
                            <input 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>

                    <label>
                        <h3>
                            Password:&nbsp;
                        </h3>
                            <input 
                            value={password}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
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