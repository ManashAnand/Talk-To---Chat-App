import React from 'react';
import Navbar from './Navbar';
import styles from './Sidebar.module.css';
import Search from './Search';
import Chats from '../ChatFolder/Chats';

const Sidebar = () => {
  return (
    <>
     <div className={styles.sidebar}>
        <Navbar/>
        <Search/>
        <Chats/>
     </div> 
    </>
  )
}

export default Sidebar
