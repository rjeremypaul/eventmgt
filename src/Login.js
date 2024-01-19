// src/components/Login.js
import axios from "axios";
import React, { useState } from "react";

function Login() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  async function submit(e){
    e.preventDefault();

    try{


      await axios.post("url to yung local host", {
          email , password
      })
    
    }
    catch{

    }
  }
  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          name=""
          id=""
        />
        <input
          type="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          name=""
          id=""
        />

        <input type="submit" onClick={submit}/>
      </form>

      <br />
      <p>or</p>
      <br />

      <Link to="/signUp">Sign Up Page</Link>
    </div>
  );
}

export default Login;
