import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {

    const [inputs,setInputs] = useState({
        email:"",
        user_password:""
    })

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
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <h1 className="text-center my-5"> Login </h1>
            <form onSubmit={onSubmitForm}>
                <input 
                type="email" 
                name="email" 
                placeholder="email" 
                className="form-control my-3"
                value={email}
                onChange={onChange}
                />
                <input 
                type="password" 
                name="user_password" 
                placeholder="password" 
                className="form-control my-3"
                value={user_password}
                onChange={onChange}
                />
                <button className="btn btn-success btn-block"> Submit </button>
            </form>
        <Link to="/register"> Register</Link>
        </Fragment>
    );
}

export default Login;