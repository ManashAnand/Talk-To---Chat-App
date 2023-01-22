import React from 'react'
import Chat from '../component/ChatFolder/Chat'
import Sidebar from '../component/SidebarFolder/Sidebar';
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
   <div className={styles.home}>
    <div className={styles.container}>
        <Sidebar/>
        <Chat/>
    </div>
   </div>
    </>
  )
}

export default Home
