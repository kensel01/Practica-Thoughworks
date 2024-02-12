import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
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
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={inputs.email}
          onChange={onChange}
        />
        <input
          type="password"
          name="user_password"
          placeholder="password"
          className="form-control my-3"
          value={inputs.user_password}
          onChange={onChange}
        />
        <input
          type="text"
          name="user_name"
          placeholder="name"
          className="form-control my-3"
          value={inputs.user_name}
          onChange={onChange}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login"> Login </Link>
    </Fragment>
  );
};

export default Register;
