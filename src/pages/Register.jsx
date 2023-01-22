
import React from 'react'
import styles from "./Register.module.css"
import add from "../img/addAvatar.png";
import { auth,db,storage } from '../firebase';
import {
  createUserWithEmailAndPassword, updateProfile
} from 'firebase/auth'
import { useState } from 'react';
import {
   ref,
    uploadBytesResumable,
     getDownloadURL 
    } from "firebase/storage";
import {doc,setDoc} from 'firebase/firestore';
import {Link, useNavigate} from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [err,setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth,email,password);
      console.log(res);


// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

const storageRef = ref(storage, displayName);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

uploadTask.on(
  (error) => {
    setErr(true);
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref)
    .then( async (downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL: downloadURL
      });

      await setDoc(doc(db,"users",res.user.uid),{
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL
      });

      await setDoc(doc(db,"userChats",res.user.uid),{});
      navigate("/");

    });
  }
);


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
            <span className={styles.title}>Register</span>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder='Display name' />
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                <input style={{display:"none"}} type="file" id='file' />
                <label htmlFor="file">
                    <img src={add} alt="More" />
                    <span>Add an avatar</span>
                </label>
                <button>SignUp</button>
                {err && <span>Something went wrong!!!</span>}
            </form>
            <p>You don't have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </>
  )
}

export default Register
