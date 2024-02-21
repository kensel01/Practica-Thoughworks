import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import './styles/Login.css';
import { MdOutlineEngineering } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

const Register = ({ setAuth }) => {
  const navigate = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    user_password: "",
    user_name: "",
  });

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const { email, user_password, user_name } = inputs;
      const body = { email, user_password, user_name };
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      console.log(
        "Respuesta OK:",
        response.ok,
        "Respuesta del servidor:",
        parseRes
      );
      if (response.ok && parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={onSubmitForm}>
        <h1> Registro <MdOutlineEngineering /></h1>
        <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="email"
              value={inputs.email}
              onChange={onChange}
            />
            <IoIosMail className="icon" />
          </div>
        <div className="input-box">
            <input
              type="password"
              name="user_password"
              placeholder="password"
              value={inputs.user_password}
              onChange={onChange}
            />
            <FaLock className="icon" />
        </div>
        <div className="input-box">
            <input
                type="text"
                name="user_name"
                placeholder="name"
                value={inputs.user_name}
                onChange={onChange}
              />
              <FaUserEdit className="icon"/>
        </div>

        <button className="btn btn-success btn-block"> Registrate </button>
      </form>
      <div className="register-link">
                <p> Ya tienes cuenta? <a href="#" onClick={() => navigate.push('/login')}
                > Login </a></p>
            </div>
      </div>
  );
};

export default Register;
