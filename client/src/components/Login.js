import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import './styles/Login.css';
import { MdOutlineEngineering } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";

const Login = ({ setAuth }) => {

    const [inputs,setInputs] = useState({
        email:"",
        user_password:""
    })
    const [errorMessage, setErrorMessage] = useState("");

    const {email, user_password} = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            const body = {email, user_password }

            const response = await fetch("http://localhost:5000/login" , {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
        });

        const parseRes = await response.json();

        console.log("Respuesta OK:", response.ok, "Respuesta del servidor:", parseRes);
        if (response.ok && parseRes.token) {
             localStorage.setItem("token", parseRes.token);
            setAuth(true);
        }
        else{
            setErrorMessage(parseRes.error);
        } 
        } catch (err) {
            console.error(err.message);
            setErrorMessage(err.message);
        }
    }
    return (
        <div className="wrapper">
            <form onSubmit={onSubmitForm}>
                <h1> Login <MdOutlineEngineering /></h1>
                <div className="input-box">
                    <input 
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    value={email}
                    onChange={onChange}
                    /> 
                    <IoIosMail className="icon" />
                </div>
                <div className="input-box">
                    <input 
                    type="password" 
                    name="user_password" 
                    placeholder="password" 
                    value={user_password}
                    onChange={onChange}
                    />
                    <FaLock className="icon" />
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="remember-forgot">
                    <label><input type="checkbox"/> Remember me </label>
                    <a href="#" > Forgot password? </a>
                </div>

                <button className="btn btn-success btn-block"> Login </button>

            </form>
            <div className="register-link">
                <p> No recuerdas la cuenta? <a href="#"> Register </a></p>
            </div>
        </div>
    );
}

export default Login;