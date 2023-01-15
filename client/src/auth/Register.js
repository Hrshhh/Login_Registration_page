import {useState} from "react";
import RegisterForm from "../components/RegisterForm";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { register } from "../actions/auth";
import './Register.css';

const Register = () => {
    let history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const res = await register({
                name,
                email,
                password
            }).then((response)=>{
                console.log('Register User>>> ', response);
            })
            
            
            toast("Register success. Please login");
            history.push("/login");
        }
        catch(err){
            console.log(err);
            if(err.response.status === 400) toast(err.response.data);
        }

        
    }


    return (
        <>
            <div className="card mx-auto mb-3 bg-success p-5 text-center">
                <h2>Register Page</h2>
            </div>

            
            
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3">
                    <RegisterForm 
                        name={name} 
                        email={email} 
                        password={password} 
                        setName={setName} 
                        setEmail={setEmail} 
                        setPassword={setPassword} handleSubmit={handleSubmit} 
                    />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;