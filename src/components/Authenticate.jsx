import { useState } from "react";

function Authenticate({ token }) {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleClick = async(e) => {
        e.preventDefault();
        try{
            const res = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate',
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                })
            const result = await res.json();
            console.log(result);

            setSuccessMessage(result);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h2>
                Authenticate &nbsp;
            </h2>
                {successMessage && <p>{successMessage.message}</p>}
                {error && <p>{error}</p>}
                <button onClick={handleClick}>
                    Authenticate Token
                </button>
                {successMessage?.data ? 
                    <h2> 
                        Your Username is: {`${successMessage.data.username}`}
                    </h2> 
                : 
                <h2>
                    You are not signed in! Please sign up first.
                </h2>
                }
        </>
    );
}

export default Authenticate