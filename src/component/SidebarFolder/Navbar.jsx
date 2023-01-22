import React from 'react';
import styles from './Navbar.module.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <>
     <div className={styles.navbar}>
        <span className={styles.logo}> Talk To </span>
        <div className={styles.user}>
            <img src={currentUser.photoURL} alt="manash" />
            <span>{currentUser.displayName}</span>
            <button onClick={() => signOut(auth)}>Logout</button>
        </div>
     </div>
    </>
  )
}

export default Navbar
