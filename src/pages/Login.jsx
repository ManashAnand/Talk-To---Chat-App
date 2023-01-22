import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import styles from "./Login.module.css";


const Login = () => {

  const navigate = useNavigate();
  const [err,setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
     await signInWithEmailAndPassword(auth,email,password);
      navigate("/");

    } catch (error) {
      console.log(error);
      setErr(true);
    }

  }



  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
            <span className={styles.logo}>TalkTo</span>
            <span className={styles.title}>Login</span>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                
                <button>Login</button>
                {err && <span>Something went wrong!!!</span>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </>
  )
}

export default Login
