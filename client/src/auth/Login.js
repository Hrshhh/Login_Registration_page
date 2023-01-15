import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import LoginForm from '../components/LoginForm';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';


const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log("Send login data", {email, password});
        // console.log(email);
        try{
            await login({ email,password }).then((response)=>{
                console.log("Save user res in redux and local storage then redirect ");

                // console.log(response.data);
                window.localStorage.setItem("auth", JSON.stringify(response.data));

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: response.data,
                })

                history.push("/");
            })
            // console.log(res.json)
            
            

        }
        catch(err){
            console.log(err);
            if(err.response.status === 400) toast(err.response.data);
        }
    }

    return (
        <>
            <div className="card mx-auto mb-3 bg-success p-5 text-center">
                <h2>Login Page</h2>
            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col-6 offset-3'>
                        <LoginForm 
                            email={email} 
                            password={password} 
                            setEmail={setEmail} 
                            setPassword={setPassword} handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    ) 
}

export default Login;